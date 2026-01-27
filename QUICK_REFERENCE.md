# 🚀 Quick Reference Guide

## Instant Commands

### Development
```bash
# Install all dependencies
npm install --workspaces

# Start development servers
cd server && npm run dev      # Terminal 1
cd client && npm run dev      # Terminal 2

# Build for production
npm run build --workspaces

# Run tests
npm test --workspaces
```

### Docker
```bash
# Build and start all services
docker-compose -f docker/docker-compose.yml up --build

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Scale service
docker-compose up --build -d
docker-compose scale server=3
```

### Kubernetes
```bash
# Deploy
kubectl apply -f infra/k8s/

# Check status
kubectl get pods
kubectl get svc
kubectl logs -f deployment/server

# Rollout status
kubectl rollout status deployment/server

# Port forward
kubectl port-forward svc/server 5000:5000
```

## GitHub Actions

### Trigger Workflows
```bash
# Push to develop (triggers CI)
git push origin develop

# Create PR to main (triggers tests)
git push origin feature-branch

# Manual deployment
# 1. Go to Actions tab
# 2. Select "Deploy Pipeline"
# 3. Click "Run workflow"
```

### View Results
1. Go to **Actions** tab
2. Select workflow
3. Click latest run
4. View logs

## API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/health` | GET | Server health |
| `/api/health` | GET | Full system health |
| `/api/cars` | GET | List all cars |
| `/api/cars` | POST | Create car |
| `/auth/register` | POST | User registration |
| `/auth/login` | POST | User login |

## Troubleshooting

### Nothing is running?
```bash
docker-compose down -v
docker-compose up --build
```

### Build fails?
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Port in use?
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000 && kill -9 <PID>
```

### MongoDB won't connect?
```bash
# Check service
docker-compose ps | grep mongo

# Check connection string
cat server/.env | grep MONGODB_URI
```

## File Locations

| Item | Path |
|------|------|
| **Server Source** | `server/src/` |
| **Client Source** | `client/src/` |
| **Workflows** | `.github/workflows/` |
| **Docker Configs** | `docker/` |
| **Kubernetes** | `infra/k8s/` |
| **Documentation** | Root `*.md` files |
| **Environment** | `.env` files |

## Critical Files

```
.env                          # Server environment
client/.env                   # Client environment
docker/docker-compose.yml     # Docker Compose config
.github/workflows/ci.yml      # CI pipeline
.github/workflows/deploy.yml  # Deployment
```

## Key Concepts

**CI Pipeline** (ci.yml)
→ Lint and build on every push/PR

**Testing** (test.yml)
→ Run tests automatically

**Security** (security.yml)
→ Scan vulnerabilities daily

**CD Pipeline** (cd.yml)
→ Build Docker images on main push

**Deployment** (deploy.yml)
→ Manual deployment to Docker/K8s/Azure

## Environment Variables

**Server (.env)**
```
MONGODB_URI=mongodb://mongo:27017/mernapp
PORT=5000
JWT_SECRET=your-secret-key
```

**Client (.env)**
```
VITE_API_BASE_URL=http://localhost:5000
```

## Health Checks

```bash
# Server alive?
curl http://localhost:5000/health

# API working?
curl http://localhost:5000/api/health

# Database connected?
# Check server logs or browser console

# Client loaded?
curl http://localhost:3000
```

## GitHub Setup (One-time)

1. **Secrets** (Settings → Secrets)
   - Add `KUBECONFIG` for Kubernetes
   - Add `AZURE_CREDENTIALS` for Azure

2. **Branch Protection** (Settings → Branches)
   - Require status checks
   - Require approvals

3. **Teams** (Settings → Collaborators)
   - Add team members
   - Configure permissions

## Deployment Workflow

```
Code → Commit → Push
         ↓
   CI/Test/Security
         ↓
    All Passing?
    ├─ Yes → Merge
    │        ↓
    │    CD Pipeline
    │    (Build images)
    │        ↓
    │    Deploy (Manual)
    │    (To target)
    │
    └─ No → Fix Code
             Retry
```

## Common Tasks

### Add a new page
1. Create component in `client/src/pages/`
2. Add route in `client/src/App.tsx`
3. Update navigation in `Navbar.tsx`

### Add a new API endpoint
1. Create route in `server/src/routes/`
2. Create controller in `server/src/controllers/`
3. Register route in `app.ts`
4. Add to client API service

### Deploy new version
1. Merge PR to main
2. Wait for CD pipeline
3. Go to Actions → Deploy Pipeline
4. Select environment & target
5. Click Run workflow

### Fix security issue
```bash
npm audit fix
npm install
# Or specific: npm install <package>@latest
```

## Useful Links

- **GitHub Repo**: [URL]
- **API Docs**: `http://localhost:5000/swagger` (if enabled)
- **Container Registry**: `ghcr.io/owner/repo`
- **Kubernetes Dashboard**: `http://localhost:8001/api/v1/namespaces/kubernetes-dashboard`

## Metrics

- **Build Time**: ~2-3 minutes
- **Test Time**: ~3-5 minutes
- **Deploy Time**: ~5-10 minutes
- **Container Size**: ~200MB (server), ~50MB (client)

---

**Print this page or bookmark for quick reference!**

*Last Updated: January 27, 2026*
