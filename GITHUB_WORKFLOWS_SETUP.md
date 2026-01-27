# GitHub Actions Folder Structure Guide

## Complete Directory Layout

```
.github/
├── workflows/                          # GitHub Actions workflows
│   ├── ci.yml                         # Continuous Integration
│   ├── test.yml                       # Testing Pipeline
│   ├── security.yml                   # Security Scanning
│   ├── quality.yml                    # Code Quality
│   ├── cd.yml                         # Continuous Deployment (Image Building)
│   └── deploy.yml                     # Deployment Pipeline (Manual)
│
├── CODEOWNERS                         # Code ownership rules (optional)
├── pull_request_template.md           # PR template (optional)
└── dependabot.yml                     # Dependabot configuration (optional)
```

## Creating .github Folder Structure in Git/GitHub

### Option 1: Using Command Line (Git Bash / Terminal)

```bash
# Navigate to repository root
cd your-project

# Create .github/workflows directory
mkdir -p .github/workflows

# Create workflow files (YAML)
touch .github/workflows/ci.yml
touch .github/workflows/test.yml
touch .github/workflows/security.yml
touch .github/workflows/quality.yml
touch .github/workflows/cd.yml
touch .github/workflows/deploy.yml

# Create additional GitHub configs (optional)
touch .github/CODEOWNERS
touch .github/pull_request_template.md
touch .github/dependabot.yml

# Add to git
git add .github/
git commit -m "chore: add GitHub Actions CI/CD workflows"
git push origin main
```

### Option 2: Using VS Code

1. **Open VS Code Explorer**
2. **Right-click on project root** → "New Folder" → `.github`
3. **Right-click on `.github`** → "New Folder" → `workflows`
4. **Right-click on `workflows`** → "New File" for each YAML file
5. **Paste the workflow content** from the files

### Option 3: Using GitHub Web Interface

1. Go to **GitHub.com** → Your Repository
2. Click **Add File** → **Create New File**
3. Enter path: `.github/workflows/ci.yml`
4. Paste the workflow YAML content
5. Click **Commit New File**
6. Repeat for other workflow files

## Current Project Structure

Your project now has:

```
✅ .github/
   ├── workflows/
   │   ├── ci.yml           (Lint, build)
   │   ├── test.yml         (Unit, integration, E2E tests)
   │   ├── security.yml     (Vulnerability scanning)
   │   ├── quality.yml      (Code quality checks)
   │   ├── cd.yml           (Build & push Docker images)
   │   └── deploy.yml       (Deployment to Docker/K8s/Azure)
   └── .gitkeep             (Placeholder for empty directory)
```

## Workflow Execution Flow

```
Event: Push/PR/Schedule
    ↓
GitHub Detects Workflow Trigger
    ↓
Selects Matching Workflow File (*.yml)
    ↓
Parses YAML Configuration
    ↓
Creates Runner (Ubuntu, Windows, macOS)
    ↓
Executes Jobs (Sequential or Parallel)
    ↓
Each Job: Steps Execution
    ↓
Outputs Logs & Results
    ↓
Reports Status in PR/Commit
```

## Manual Workflow Triggers

### View Workflow Runs
1. Go to GitHub repository
2. Click **Actions** tab
3. Select workflow from left sidebar
4. View recent runs

### Manually Trigger Workflow
1. Click **Actions** → Workflow Name
2. Click **Run workflow** button
3. Select branch and inputs (if any)
4. Click **Run workflow**

```bash
# Via GitHub CLI
gh workflow run ci.yml
gh workflow run deploy.yml -f environment=production
```

## Workflow File Template

```yaml
name: Workflow Name               # Display name

on:                              # Triggers
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 2 * * *'         # Daily at 2 AM UTC

env:
  NODE_VERSION: "20"            # Global environment variables

jobs:
  job-name:                      # Job ID
    name: Job Display Name       # Job display name
    runs-on: ubuntu-latest       # Runner OS
    
    strategy:                    # Matrix for multiple configs
      matrix:
        node-version: [18, 20]
    
    steps:
      - name: Step Name
        uses: actions/checkout@v4
        
      - name: Run command
        run: npm install
```

## Best Practices

### ✅ DO:
- Use descriptive workflow names
- Add helpful step names
- Include conditional checks (`if: always()`)
- Set appropriate timeouts
- Use caching for dependencies
- Document secrets required

### ❌ DON'T:
- Commit sensitive data
- Use hardcoded credentials
- Make workflows too long
- Run unnecessary jobs in parallel
- Skip security checks
- Forget error handling

## Required GitHub Secrets

For full functionality, configure these in:
**Settings → Secrets and variables → Actions**

```
KUBECONFIG              # Base64-encoded kubectl config
AZURE_CREDENTIALS       # Azure Service Principal JSON
AZURE_SUBSCRIPTION_ID   # Azure subscription ID
AZURE_RESOURCE_GROUP    # Azure resource group name
SONAR_TOKEN            # SonarQube token
GITHUB_TOKEN           # Auto-provided by GitHub
```

## Monitoring & Debugging

### View Logs
```bash
# CLI
gh run view <run-id> --log

# Web: Actions tab → Run → Job → Step
```

### Common Issues

**Workflow not triggering:**
- Check event syntax in `on:` section
- Verify branch names match
- Ensure workflow file is valid YAML

**Jobs failing:**
- Check runner logs in Actions tab
- Verify environment variables set
- Check file paths and dependencies

**Secrets not accessible:**
- Verify secret name matches exactly
- Check secret value is not empty
- Re-save secret if recently changed

## File Size & Performance

| Workflow | Lines | Status |
|----------|-------|--------|
| ci.yml | 114 | ✅ Optimal |
| test.yml | 165 | ✅ Good |
| security.yml | 96 | ✅ Fast |
| quality.yml | 125 | ✅ Good |
| cd.yml | 126 | ✅ Good |
| deploy.yml | 144 | ✅ Good |

## References

- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Workflow Syntax](https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions)
- [GitHub Actions Best Practices](https://docs.github.com/actions/guides)
- [Actions Marketplace](https://github.com/marketplace?type=actions)

---

**Your CI/CD pipeline is now configured and ready to use!** 🚀
