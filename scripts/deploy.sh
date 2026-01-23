#!/bin/bash

# ============================================
# Deployment Script for MERN Application
# Person B - DevOps/Frontend
# ============================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_step() {
    echo -e "${CYAN}[STEP]${NC} $1"
}

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_ROOT"

# Configuration
REGISTRY="ghcr.io"
GITHUB_USERNAME="${GITHUB_USERNAME:-your-username}"
REPO_NAME="${REPO_NAME:-your-repo}"
TAG="${TAG:-latest}"

CLIENT_IMAGE="${REGISTRY}/${GITHUB_USERNAME}/${REPO_NAME}/client:${TAG}"
SERVER_IMAGE="${REGISTRY}/${GITHUB_USERNAME}/${REPO_NAME}/server:${TAG}"

echo ""
echo "============================================"
echo "  MERN Application Deployment Script"
echo "============================================"
echo ""

# Parse arguments
DEPLOY_MODE="docker"  # docker, k8s, or compose
ENVIRONMENT="staging"

while [[ "$#" -gt 0 ]]; do
    case $1 in
        --docker) DEPLOY_MODE="docker" ;;
        --k8s|--kubernetes) DEPLOY_MODE="k8s" ;;
        --compose) DEPLOY_MODE="compose" ;;
        --prod|--production) ENVIRONMENT="production" ;;
        --staging) ENVIRONMENT="staging" ;;
        --tag) TAG="$2"; shift ;;
        --help)
            echo "Usage: ./deploy.sh [options]"
            echo ""
            echo "Options:"
            echo "  --docker       Deploy using Docker (default)"
            echo "  --k8s          Deploy to Kubernetes"
            echo "  --compose      Deploy using Docker Compose"
            echo "  --staging      Deploy to staging (default)"
            echo "  --production   Deploy to production"
            echo "  --tag <tag>    Specify image tag (default: latest)"
            echo "  --help         Show this help message"
            echo ""
            echo "Environment variables:"
            echo "  GITHUB_USERNAME   Your GitHub username"
            echo "  REPO_NAME         Repository name"
            echo "  KUBECONFIG        Path to kubeconfig (for K8s)"
            exit 0
            ;;
        *) log_error "Unknown option: $1"; exit 1 ;;
    esac
    shift
done

log_info "Deployment Mode: $DEPLOY_MODE"
log_info "Environment: $ENVIRONMENT"
log_info "Image Tag: $TAG"
echo ""

# ============================================
# Docker Compose Deployment
# ============================================
deploy_compose() {
    log_step "Deploying with Docker Compose..."
    
    # Pull latest images
    log_info "Pulling latest images..."
    docker compose -f docker/docker-compose.yml pull || true
    
    # Stop existing containers
    log_info "Stopping existing containers..."
    docker compose -f docker/docker-compose.yml down
    
    # Start new containers
    log_info "Starting containers..."
    docker compose -f docker/docker-compose.yml up -d --build
    
    # Wait for health checks
    log_info "Waiting for services to be healthy..."
    sleep 10
    
    # Check status
    docker compose -f docker/docker-compose.yml ps
    
    log_success "Docker Compose deployment complete!"
    echo ""
    echo "Services running at:"
    echo "  - Frontend: http://localhost:3000"
    echo "  - Backend:  http://localhost:5000"
    echo "  - MongoDB:  localhost:27017"
}

# ============================================
# Kubernetes Deployment
# ============================================
deploy_k8s() {
    log_step "Deploying to Kubernetes..."
    
    # Check kubectl
    if ! command -v kubectl &> /dev/null; then
        log_error "kubectl not found. Please install kubectl."
        exit 1
    fi
    
    # Check cluster connection
    log_info "Checking Kubernetes cluster connection..."
    kubectl cluster-info || {
        log_error "Cannot connect to Kubernetes cluster"
        exit 1
    }
    
    # Create namespace if not exists
    NAMESPACE="mern-${ENVIRONMENT}"
    kubectl create namespace "$NAMESPACE" --dry-run=client -o yaml | kubectl apply -f -
    
    # Update image tags in deployment files
    log_info "Updating deployment configurations..."
    
    # Apply configurations
    log_info "Applying Kubernetes configurations..."
    kubectl apply -f infra/k8s/server-deploy.yaml -n "$NAMESPACE"
    kubectl apply -f infra/k8s/client-deploy.yaml -n "$NAMESPACE"
    kubectl apply -f infra/k8s/ingress.yaml -n "$NAMESPACE"
    
    # Wait for rollout
    log_info "Waiting for deployments to be ready..."
    kubectl rollout status deployment/server -n "$NAMESPACE" --timeout=120s
    kubectl rollout status deployment/client -n "$NAMESPACE" --timeout=120s
    
    # Show status
    echo ""
    log_info "Deployment status:"
    kubectl get pods -n "$NAMESPACE"
    kubectl get services -n "$NAMESPACE"
    kubectl get ingress -n "$NAMESPACE"
    
    log_success "Kubernetes deployment complete!"
}

# ============================================
# Docker Direct Deployment (for VPS/VM)
# ============================================
deploy_docker() {
    log_step "Deploying with Docker..."
    
    # Build images
    log_info "Building Docker images..."
    docker build -f docker/Dockerfile.client -t "${CLIENT_IMAGE}" .
    docker build -f docker/Dockerfile.server -t "${SERVER_IMAGE}" .
    
    # Push to registry (if authenticated)
    if docker info 2>/dev/null | grep -q "Username"; then
        log_info "Pushing images to registry..."
        docker push "${CLIENT_IMAGE}"
        docker push "${SERVER_IMAGE}"
        log_success "Images pushed to ${REGISTRY}"
    else
        log_warning "Not logged in to registry, skipping push"
        log_info "To push images, run: docker login ${REGISTRY}"
    fi
    
    log_success "Docker images built!"
    echo ""
    echo "Images:"
    echo "  - ${CLIENT_IMAGE}"
    echo "  - ${SERVER_IMAGE}"
}

# ============================================
# Execute Deployment
# ============================================
case $DEPLOY_MODE in
    compose)
        deploy_compose
        ;;
    k8s)
        deploy_k8s
        ;;
    docker)
        deploy_docker
        ;;
    *)
        log_error "Unknown deployment mode: $DEPLOY_MODE"
        exit 1
        ;;
esac

echo ""
echo "============================================"
log_success "Deployment script completed!"
echo "============================================"
echo ""

# Logging commands reminder
echo "Useful commands:"
echo "  - View logs:     docker compose -f docker/docker-compose.yml logs -f"
echo "  - Check status:  docker compose -f docker/docker-compose.yml ps"
echo "  - Stop all:      docker compose -f docker/docker-compose.yml down"
echo ""