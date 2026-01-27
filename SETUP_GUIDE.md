# MERN Stack DevOps Project
## Setup Guide

### 📋 Project Structure

```
.
├── client/                 # React/Vite frontend
├── server/                 # Node.js/Express backend
├── docker/                 # Docker & Docker Compose configs
├── infra/                  # Kubernetes & Terraform configs
├── nginx/                  # Nginx reverse proxy config
├── scripts/                # Deployment scripts
└── .github/workflows/      # GitHub Actions CI/CD pipelines
```

### 🚀 Quick Start

#### 1. Prerequisites
- Node.js 20+
- Docker & Docker Compose
- Git
- npm or yarn

#### 2. Local Development

**Clone and Setup:**
```bash
git clone <repo-url>
cd <repo-name>

# Install dependencies
cd server && npm install && cd ..
cd client && npm install && cd ..
```

**Environment Setup:**
```bash
# Server
cp server/.env.example server/.env

# Client
cp client/.env.example client/.env
```

**Run Locally (No Docker):**
```bash
# Terminal 1 - Start MongoDB
mongosh  # or use Docker: docker run -d -p 27017:27017 mongo

# Terminal 2 - Start Server
cd server
npm run dev

# Terminal 3 - Start Client
cd client
npm run dev
```

**Run with Docker Compose:**
```bash
docker-compose -f docker/docker-compose.yml up --build
```

Access:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- MongoDB: localhost:27017

### 📦 CI/CD Pipelines

#### GitHub Actions Workflows (.github/workflows/)

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| **ci.yml** | Push/PR to main, develop | Lint, test, build client & server |
| **test.yml** | Push/PR to main, develop | Unit, integration, E2E tests |
| **security.yml** | Daily + on push | Vulnerability scanning, SAST analysis |
| **cd.yml** | Push to main | Build & push Docker images to registry |
| **deploy.yml** | Manual trigger | Deploy to Docker/K8s/Azure |

#### Running Workflows Locally
```bash
# Install act (GitHub Actions local runner)
# https://github.com/nektos/act

act push                    # Simulate push event
act pull_request            # Simulate PR event
act -j unit-tests-server    # Run specific job
```

### 🐳 Docker

**Build Images:**
```bash
docker build -t mern-server -f docker/Dockerfile.server .
docker build -t mern-client -f docker/Dockerfile.client .
```

**Run Containers:**
```bash
docker run -p 5000:5000 --env-file server/.env mern-server
docker run -p 3000:80 mern-client
```

**Docker Compose (Recommended):**
```bash
docker-compose -f docker/docker-compose.yml up --build
docker-compose -f docker/docker-compose.yml down
```

### ☸️ Kubernetes

**Deploy:**
```bash
kubectl apply -f infra/k8s/
```

**Check Status:**
```bash
kubectl get pods
kubectl get svc
kubectl logs -f deployment/server
```

**Port Forward (Local Access):**
```bash
kubectl port-forward svc/server 5000:5000
kubectl port-forward svc/client 3000:80
```

### 🔐 Security

- **JWT Authentication** - Secure token-based auth
- **Helmet.js** - HTTP security headers
- **Rate Limiting** - Brute force protection
- **CORS** - Cross-origin resource sharing
- **Environment Variables** - Sensitive data separation
- **Non-root Docker User** - Container security
- **npm audit** - Dependency vulnerability scanning
- **CodeQL** - Static code analysis

### 📊 Database

**MongoDB Connection String:**
```
mongodb://localhost:27017/mernapp          # Local
mongodb+srv://user:pass@cluster.mongodb.net/mernapp  # Atlas
```

**Database Name:** `mernapp`

**Collections:**
- `users` - User accounts
- `cars` - Vehicle inventory
- `bookings` - Rental bookings

### 🛠 Available Scripts

**Server:**
```bash
npm run dev      # Development with nodemon
npm run build    # Compile TypeScript
npm start        # Run production build
npm test         # Run tests
```

**Client:**
```bash
npm run dev      # Vite dev server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

### 🔄 Git Workflow

```bash
# Create feature branch
git checkout -b feature/awesome-feature

# Make changes and commit
git add .
git commit -m "feat: add awesome feature"

# Push and create PR
git push origin feature/awesome-feature
```

### 📝 Environment Variables

**Server (.env):**
```
MONGODB_URI=mongodb://mongo:27017/mernapp
PORT=5000
NODE_ENV=development
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:3000
```

**Client (.env):**
```
VITE_API_BASE_URL=http://localhost:5000
```

### 🧪 Testing

**Run All Tests:**
```bash
# Server tests
cd server && npm test

# Client tests
cd client && npm test
```

**Integration Tests:**
```bash
docker-compose -f docker/docker-compose.yml up
npm run test:integration
```

### 🚨 Troubleshooting

**Port Already in Use:**
```bash
# Find and kill process on port
lsof -i :5000
kill -9 <PID>
```

**MongoDB Connection Failed:**
```bash
# Check MongoDB is running
docker ps | grep mongo

# Check connection string in .env
cat server/.env | grep MONGODB
```

**Build Failures:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Docker cache
docker system prune -a
docker-compose down -v
```

### 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Docker Documentation](https://docs.docker.com/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [GitHub Actions Documentation](https://docs.github.com/actions)

### 📧 Support & Questions

For issues or questions, open a GitHub issue with:
- Detailed description
- Steps to reproduce
- Environment info (OS, Node version, Docker version)
- Error messages/logs

---

**Last Updated:** January 2026
**Status:** Active Development
