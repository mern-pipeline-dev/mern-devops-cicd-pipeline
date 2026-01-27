# MERN DevOps CI/CD Pipeline - Architecture & Workflows

## 📊 CI/CD Pipeline Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Developer Workflow                           │
└─────────────┬───────────────────────────────────────────────────┘
              │
              ▼
        ┌──────────────┐
        │  Git Commit  │
        │  / PR Open   │
        └──────┬───────┘
               │
               ├─────────────────────────┬─────────────────────┐
               │                         │                     │
               ▼                         ▼                     ▼
        ┌──────────────┐         ┌──────────────┐      ┌──────────────┐
        │   CI.yml     │         │  TEST.yml    │      │ SECURITY.yml │
        │   Pipeline   │         │   Pipeline   │      │   Pipeline   │
        └──────┬───────┘         └──────┬───────┘      └──────┬───────┘
               │                        │                    │
               │ Lint, Build            │ Unit/Int/E2E       │ Scan
               │                        │ Tests              │ Vuln
               │                        │                    │
               └────────────┬───────────┴────────────────────┘
                            │
                     All Checks Pass?
                            │
                ┌───────────┴───────────┐
                │                       │
              YES                      NO
                │                       │
                ▼                       ▼
          ┌─────────────┐         ┌─────────────┐
          │  Merge PR   │         │   BLOCKED   │
          │  to main    │         │             │
          └──────┬──────┘         └─────────────┘
                 │
                 ▼
          ┌────────────────────────────┐
          │    CD.yml Pipeline         │
          │  Build & Push Docker       │
          │    Images to Registry      │
          └──────────┬─────────────────┘
                     │
                     ▼
          ┌────────────────────────────┐
          │   Deploy.yml Pipeline      │
          │   (Manual Trigger)         │
          │   - Docker                 │
          │   - Kubernetes             │
          │   - Azure                  │
          └────────────────────────────┘
```

## 🔄 Workflow Details

### 1. **CI.yml** - Continuous Integration
**Trigger:** Push to main/develop OR Pull Request
**Purpose:** Code quality & build verification

**Jobs:**
- `client-ci`: Lint → Build client
- `server-ci`: Type check → Build server

**Success Criteria:**
- ✅ No TypeScript errors
- ✅ ESLint passes
- ✅ Build succeeds
- ✅ Artifacts uploaded

### 2. **TEST.yml** - Testing Pipeline
**Trigger:** Push to main/develop OR Pull Request
**Purpose:** Comprehensive test coverage

**Jobs:**
- `unit-tests-client`: React component tests
- `unit-tests-server`: Node.js API tests
- `integration-tests`: Database + API tests (MongoDB service)
- `e2e-tests`: Full stack tests (Docker Compose)
- `test-report`: Summary generation

**Test Coverage:**
```
├── Unit Tests (Jest/Vitest)
├── Integration Tests (API + DB)
├── E2E Tests (Full stack)
└── Coverage Reports
```

### 3. **SECURITY.yml** - Security Scanning
**Trigger:** 
- Daily (Scheduled)
- Push to main/develop
- Pull Requests

**Jobs:**
- `dependency-scan`: npm audit for vulnerabilities
- `sast`: CodeQL static code analysis
- `container-scan`: Trivy Docker image scanning

**Security Checks:**
```
├── 🔍 Dependency Vulnerabilities
├── 🔍 Code Quality Issues (CodeQL)
├── 🔍 Container Vulnerabilities (Trivy)
└── 📄 SBOM (Software Bill of Materials)
```

### 4. **CD.yml** - Continuous Deployment
**Trigger:** Push to main branch
**Purpose:** Build and push Docker images

**Jobs:**
- `build-and-push`: 
  - Build multi-platform images
  - Push to GitHub Container Registry
  - Cache optimization

**Output:**
```
ghcr.io/owner/repo/server:main
ghcr.io/owner/repo/server:sha-abc123
ghcr.io/owner/repo/client:main
ghcr.io/owner/repo/client:sha-abc123
```

### 5. **DEPLOY.yml** - Deployment Pipeline
**Trigger:** Manual workflow dispatch
**Purpose:** Deploy to various environments

**Deployment Options:**
```
A. Docker (Staging)
   ├── Run docker-compose up
   ├── Health checks
   └── Smoke tests

B. Kubernetes (Production)
   ├── Apply manifests
   ├── Rollout status
   └── Verify deployments

C. Azure (Cloud)
   ├── ARM template deployment
   ├── Resource provisioning
   └── Output info
```

**Input Parameters:**
- Environment: staging / production
- Target: docker / kubernetes / azure

## 🔐 Security Best Practices

### Pipeline Security
```yaml
# 1. Minimal Permissions
permissions:
  contents: read
  packages: write

# 2. Secrets Management
secrets:
  KUBECONFIG: base64-encoded
  AZURE_CREDENTIALS: JSON
  DOCKER_TOKEN: Personal Access Token

# 3. Checkout & Verify
- uses: actions/checkout@v4
  with:
    fetch-depth: 0
```

### Container Security
```dockerfile
# Non-root user
RUN addgroup -g 1001 -S nodejs
USER nodejs

# Multi-stage builds
FROM node:20-alpine AS build
FROM node:20-alpine AS production

# Health checks
HEALTHCHECK --interval=30s \
    CMD wget --quiet --tries=1 --spider http://localhost:5000/health
```

### Code Security
```bash
npm audit --audit-level=high
npx snyk test
docker scan ghcr.io/owner/repo:latest
```

## 📦 Artifacts & Outputs

### Build Artifacts
```
client-build/
├── index.html
├── assets/
│   ├── index-*.css
│   ├── index-*.js
│   └── images/

server-build/
└── dist/
    ├── index.js
    ├── app.js
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    └── utils/
```

### Container Images
```
ghcr.io/owner/repo/server:
├── main (latest)
├── develop
└── sha-<commit-hash>

ghcr.io/owner/repo/client:
├── main (latest)
├── develop
└── sha-<commit-hash>
```

### Security Reports
```
SBOM:
├── sbom-server.json (CycloneDX format)
└── sbom-client.json

CodeQL:
├── JavaScript analysis
└── Uploaded to GitHub Security tab

Trivy:
├── trivy-server.sarif
└── trivy-client.sarif
```

## 🔧 Configuration Files

### Required Secrets (GitHub Settings → Secrets)
```yaml
KUBECONFIG:           # base64-encoded kubectl config
AZURE_CREDENTIALS:    # Azure SP credentials JSON
AZURE_SUBSCRIPTION_ID: # Azure subscription ID
AZURE_RESOURCE_GROUP: # Target resource group
DOCKER_REGISTRY_TOKEN: # For private registry
```

### Required Branch Protection Rules
```
main branch:
├── Require status checks to pass
│   ├── ci.yml / client-ci
│   ├── ci.yml / server-ci
│   ├── test.yml / unit-tests-server
│   └── security.yml / dependency-scan
├── Require code reviews: 1
├── Require branch to be up to date
└── Include admins
```

## 📈 Monitoring & Insights

### GitHub Actions Dashboard
```
Workflow Runs → Select Workflow → View Logs
```

### Health Checks
```bash
# Frontend health
curl http://localhost:3000/health

# Backend health
curl http://localhost:5000/health

# Database health (via server)
curl http://localhost:5000/api/health
```

### Troubleshooting
```bash
# View workflow run details
gh run view <run-id> --log

# Download artifacts
gh run download <run-id>

# Cancel stuck workflow
gh run cancel <run-id>
```

## 🚀 Deployment Checklist

### Before Production Deployment
- [ ] All tests passing
- [ ] Security scan passed
- [ ] Code review approved
- [ ] CHANGELOG updated
- [ ] Version bumped
- [ ] Documentation updated

### During Deployment
- [ ] Monitor GitHub Actions logs
- [ ] Check pod/container status
- [ ] Verify health check endpoints
- [ ] Monitor error rates/logs

### After Deployment
- [ ] Run smoke tests
- [ ] Check application logs
- [ ] Monitor metrics
- [ ] Verify all services healthy

## 📞 Support & Maintenance

### Regular Maintenance
```bash
# Weekly
- Review failed workflows
- Check dependency updates
- Verify all services healthy

# Monthly  
- Update Docker base images
- Audit dependencies
- Review security logs

# Quarterly
- Load testing
- Disaster recovery drill
- Capacity planning
```

### Emergency Procedures
```bash
# Rollback deployment
git revert <commit>
git push

# Scale up resources
kubectl scale deployment server --replicas=3

# Emergency patch
git hotfix
```

---

**Last Updated:** January 2026
**Pipeline Version:** 1.0.0
