# zero-touch-k8s-deploy

# MERN Stack Application with DevOps

Full-stack MERN (MongoDB, Express, React, Node.js) application with complete CI/CD pipeline and Kubernetes deployment configuration.

## 📁 Project Structure

```
root/
├── client/                    # React frontend (Vite)
├── server/                    # Node.js/Express backend
├── docker/
│   ├── Dockerfile.client      # Multi-stage build for frontend
│   ├── Dockerfile.server      # Multi-stage build for backend
│   └── docker-compose.yml     # Local full-stack development
├── infra/
│   ├── k8s/
│   │   ├── client-deploy.yaml # Kubernetes deployment for client
│   │   ├── server-deploy.yaml # Kubernetes deployment for server
│   │   └── ingress.yaml       # Ingress configuration
│   └── terraform/             # Infrastructure as Code (optional)
├── nginx/
│   └── nginx.conf             # Nginx config for frontend + API proxy
├── scripts/
│   ├── build.sh               # Build automation script
│   └── deploy.sh              # Deployment automation script
├── .github/workflows/
│   ├── ci.yml                 # Continuous Integration pipeline
│   └── cd.yml                 # Continuous Deployment pipeline
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Docker & Docker Compose
- Git

### Local Development with Docker Compose

```bash
# Clone the repository
git clone <your-repo-url>
cd <repo-name>

# Start all services (MongoDB, Server, Client)
docker compose -f docker/docker-compose.yml up --build

# Access the application
# Frontend: http://localhost:3000
# Backend:  http://localhost:5000
# MongoDB:  localhost:27017
```

### Local Development without Docker

```bash
# Terminal 1 - Start MongoDB (requires local installation)
mongod

# Terminal 2 - Start backend
cd server
npm install
npm run dev

# Terminal 3 - Start frontend
cd client
npm install
npm run dev
```

## 🐳 Docker

### Build Images Locally

```bash
# Build client image
docker build -f docker/Dockerfile.client -t mern-client:latest .

# Build server image
docker build -f docker/Dockerfile.server -t mern-server:latest .
```

### Docker Compose Commands

```bash
# Start all services
docker compose -f docker/docker-compose.yml up --build

# Start in detached mode
docker compose -f docker/docker-compose.yml up -d --build

# View logs
docker compose -f docker/docker-compose.yml logs -f

# View specific service logs
docker compose -f docker/docker-compose.yml logs -f server
docker compose -f docker/docker-compose.yml logs -f client
docker compose -f docker/docker-compose.yml logs -f mongo

# Check service status
docker compose -f docker/docker-compose.yml ps

# Stop all services
docker compose -f docker/docker-compose.yml down

# Stop and remove volumes (⚠️ deletes data)
docker compose -f docker/docker-compose.yml down -v
```

## 🔄 CI/CD Pipeline

### Continuous Integration (CI)

The CI pipeline runs on every push and pull request to `main` and `develop` branches.

**Jobs:**
1. **Client CI** - Lint, type-check, test, and build the React app
2. **Server CI** - Lint, type-check, test, and build the Node.js app
3. **Docker Build Test** - Verify Docker images build correctly

### Continuous Deployment (CD)

The CD pipeline runs on pushes to the `main` branch.

**Jobs:**
1. **Build & Push Images** - Build and push Docker images to GitHub Container Registry (GHCR)
2. **Deploy to Staging** - (Optional) Automated deployment to staging environment

### Pull Docker Images

```bash
# Login to GitHub Container Registry
docker login ghcr.io -u YOUR_GITHUB_USERNAME

# Pull images
docker pull ghcr.io/YOUR_USERNAME/YOUR_REPO/client:latest
docker pull ghcr.io/YOUR_USERNAME/YOUR_REPO/server:latest
```

## ☸️ Kubernetes Deployment

### Prerequisites
- kubectl configured with cluster access
- Nginx Ingress Controller installed

### Deploy to Kubernetes

```bash
# Create namespace
kubectl create namespace mern-staging

# Create secrets (edit values first!)
kubectl apply -f infra/k8s/server-deploy.yaml -n mern-staging
kubectl apply -f infra/k8s/client-deploy.yaml -n mern-staging
kubectl apply -f infra/k8s/ingress.yaml -n mern-staging

# Check deployment status
kubectl get pods -n mern-staging
kubectl get services -n mern-staging
kubectl get ingress -n mern-staging
```

### Create GHCR Pull Secret

```bash
kubectl create secret docker-registry ghcr-secret \
  --docker-server=ghcr.io \
  --docker-username=YOUR_GITHUB_USERNAME \
  --docker-password=YOUR_GITHUB_PAT \
  --docker-email=your-email@example.com \
  -n mern-staging
```

## 📜 Scripts

### Build Script
```bash
# Make executable
chmod +x scripts/build.sh

# Build everything
./scripts/build.sh

# Build only client
./scripts/build.sh --client-only

# Build only server
./scripts/build.sh --server-only

# Build Docker images
./scripts/build.sh --docker
```

### Deploy Script
```bash
# Make executable
chmod +x scripts/deploy.sh

# Deploy with Docker Compose (local)
./scripts/deploy.sh --compose

# Deploy to Kubernetes
./scripts/deploy.sh --k8s --staging

# Deploy to production
./scripts/deploy.sh --k8s --production
```

## 🔍 Monitoring & Debugging

### View Container Logs
```bash
# All services
docker compose -f docker/docker-compose.yml logs -f

# Specific service
docker compose -f docker/docker-compose.yml logs -f server
docker compose -f docker/docker-compose.yml logs -f client
docker compose -f docker/docker-compose.yml logs -f mongo
```

### Health Checks
```bash
# Client health
curl http://localhost:3000/health

# Server health
curl http://localhost:5000/api/health

# Server via proxy
curl http://localhost:3000/api/health
```

### Kubernetes Debugging
```bash
# Get pod logs
kubectl logs -f deployment/server -n mern-staging
kubectl logs -f deployment/client -n mern-staging

# Describe pod for events
kubectl describe pod <pod-name> -n mern-staging

# Shell into container
kubectl exec -it <pod-name> -n mern-staging -- /bin/sh
```

## 📝 Environment Variables

### Client (.env)
```env
VITE_API_BASE_URL=http://localhost:5000
```

### Server (.env)
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/mernapp
JWT_SECRET=your-jwt-secret-here
```

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                        Client                           │
│                    (React + Nginx)                      │
│                     Port: 3000                          │
└─────────────────────┬───────────────────────────────────┘
                      │
                      │ /api/* proxy
                      ▼
┌─────────────────────────────────────────────────────────┐
│                        Server                           │
│                  (Node.js + Express)                    │
│                     Port: 5000                          │
└─────────────────────┬───────────────────────────────────┘
                      │
                      │ MongoDB Driver
                      ▼
┌─────────────────────────────────────────────────────────┐
│                       MongoDB                           │
│                     Port: 27017                         │
└─────────────────────────────────────────────────────────┘
```

## 👥 Team Responsibilities

### Person A (Backend + Infra Integration)
- Backend production readiness
- MongoDB connection (local + cloud)
- API health checks + logging + error handling
- Environment config design
- Backend Docker + runtime config

### Person B (DevOps/Frontend + CI/CD)
- Frontend production build setup
- Frontend Docker image + Nginx serving
- Docker Compose for local full-stack
- CI workflow (tests, lint, build)
- CD workflow (deploy to staging/prod)
- Basic monitoring/logging setup

## 📄 License

MIT