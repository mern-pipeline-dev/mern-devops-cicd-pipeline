#!/bin/bash

# ============================================
# Build Script for MERN Application
# Person B - DevOps/Frontend
# ============================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_ROOT"

echo ""
echo "============================================"
echo "  MERN Application Build Script"
echo "============================================"
echo ""

# Parse arguments
BUILD_CLIENT=true
BUILD_SERVER=true
BUILD_DOCKER=false

while [[ "$#" -gt 0 ]]; do
    case $1 in
        --client-only) BUILD_SERVER=false ;;
        --server-only) BUILD_CLIENT=false ;;
        --docker) BUILD_DOCKER=true ;;
        --help)
            echo "Usage: ./build.sh [options]"
            echo ""
            echo "Options:"
            echo "  --client-only    Build only the client"
            echo "  --server-only    Build only the server"
            echo "  --docker         Build Docker images"
            echo "  --help           Show this help message"
            exit 0
            ;;
        *) log_error "Unknown option: $1"; exit 1 ;;
    esac
    shift
done

# Build Client
if [ "$BUILD_CLIENT" = true ]; then
    log_info "Building client..."
    
    if [ -d "client" ]; then
        cd client
        
        # Check if node_modules exists
        if [ ! -d "node_modules" ]; then
            log_info "Installing client dependencies..."
            npm ci
        fi
        
        # Run build
        npm run build
        
        if [ -d "dist" ]; then
            log_success "Client build complete! Output: client/dist/"
        else
            log_error "Client build failed - dist folder not found"
            exit 1
        fi
        
        cd "$PROJECT_ROOT"
    else
        log_warning "Client directory not found, skipping..."
    fi
fi

# Build Server
if [ "$BUILD_SERVER" = true ]; then
    log_info "Building server..."
    
    if [ -d "server" ]; then
        cd server
        
        # Check if node_modules exists
        if [ ! -d "node_modules" ]; then
            log_info "Installing server dependencies..."
            npm ci
        fi
        
        # Run build (TypeScript compilation)
        npm run build --if-present
        
        if [ -d "dist" ]; then
            log_success "Server build complete! Output: server/dist/"
        else
            log_warning "Server dist folder not found - may not use TypeScript"
        fi
        
        cd "$PROJECT_ROOT"
    else
        log_warning "Server directory not found, skipping..."
    fi
fi

# Build Docker images
if [ "$BUILD_DOCKER" = true ]; then
    log_info "Building Docker images..."
    
    # Build client image
    log_info "Building client Docker image..."
    docker build -f docker/Dockerfile.client -t mern-client:latest .
    log_success "Client Docker image built: mern-client:latest"
    
    # Build server image
    log_info "Building server Docker image..."
    docker build -f docker/Dockerfile.server -t mern-server:latest .
    log_success "Server Docker image built: mern-server:latest"
fi

echo ""
echo "============================================"
log_success "Build completed successfully!"
echo "============================================"
echo ""

# Show next steps
echo "Next steps:"
echo "  - Run locally:     docker compose -f docker/docker-compose.yml up --build"
echo "  - Run tests:       npm test (in client or server folder)"
echo "  - Deploy:          ./scripts/deploy.sh"
echo ""