# 📋 DevOps Cheat Sheet for Beginners

## 🚀 Your First 5 Commands

```bash
# 1. Get the code
git clone <repo-url>
cd <project-folder>

# 2. Install dependencies
npm install --workspaces

# 3. Create environment files
cp server/.env.example server/.env
cp client/.env.example client/.env

# 4. Start everything
docker-compose -f docker/docker-compose.yml up --build

# 5. Open in browser
# Frontend: http://localhost:3000
# Backend:  http://localhost:5000
```

---

## 🔄 Git Commands (Most Common)

### Creating & Submitting Code

```bash
# Create a new branch (do this FIRST)
git checkout -b feature/my-feature

# See what you changed
git status

# Add your changes
git add .

# Save your changes
git commit -m "feat: add awesome feature"

# Upload to GitHub
git push origin feature/my-feature

# Create PR on GitHub website
# (GitHub will suggest button)
```

### Fixing Mistakes

```bash
# Undo last commit (keep changes)
git reset HEAD~1

# Undo last commit (delete changes)
git reset --hard HEAD~1

# Go back to main branch
git checkout main

# Delete a branch
git branch -D feature/old-feature

# Update your branch from main
git pull origin main
git rebase main
```

---

## 🐳 Docker Commands

### Start/Stop

```bash
# Start everything
docker-compose -f docker/docker-compose.yml up

# Start in background
docker-compose -f docker/docker-compose.yml up -d

# Stop everything
docker-compose down

# See running containers
docker-compose ps

# View logs
docker-compose logs -f

# Stop specific service
docker-compose stop server
```

### Building

```bash
# Build and start
docker-compose up --build

# Rebuild without starting
docker build -f docker/Dockerfile.server .

# See built images
docker images
```

### Debugging

```bash
# View logs from specific service
docker-compose logs server

# Get inside a container
docker exec -it <container-name> bash

# Check container status
docker ps
docker inspect <container-id>
```

---

## 💻 npm Commands (Both Folders)

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Check code quality
npm run lint

# Fix linting issues
npm run lint --fix
```

### Dependency Management

```bash
# Check outdated packages
npm outdated

# Fix security issues
npm audit fix

# Update specific package
npm install package-name@latest

# Remove package
npm uninstall package-name
```

---

## 🔍 GitHub Actions (Workflows)

### Understand the Flow

```
You push code
    ↓
GitHub detects push
    ↓
Workflow runs automatically
    ↓
See results in "Actions" tab
```

### Check Your Workflows

1. Go to: https://github.com/YOUR-USERNAME/YOUR-REPO
2. Click: **Actions** tab
3. See: Your workflows running
4. Click: Any run to see details
5. Expand: Any job to see logs

### Common Workflow Triggers

| Event | Trigger |
|-------|---------|
| Push to any branch | CI, Tests, Security run |
| Pull Request | CI, Tests, Security run |
| Merge to main | CD runs (builds images) |
| Manual trigger | Deploy workflow |
| Daily schedule | Security scans |

---

## 📁 Folder Map (Where Things Are)

```
project/
│
├── client/                    ← React frontend
│   ├── src/
│   │   ├── pages/            ← Page components
│   │   ├── components/       ← Reusable components
│   │   └── App.tsx           ← Main app
│   └── .env                  ← Config (NEVER COMMIT)
│
├── server/                    ← Node.js backend
│   ├── src/
│   │   ├── routes/           ← API endpoints
│   │   ├── controllers/      ← Business logic
│   │   ├── models/           ← Database schemas
│   │   └── app.ts            ← Express app
│   └── .env                  ← Config (NEVER COMMIT)
│
├── docker/                    ← Docker config
│   ├── Dockerfile.client     ← Frontend image recipe
│   ├── Dockerfile.server     ← Backend image recipe
│   └── docker-compose.yml    ← Run everything together
│
├── .github/
│   └── workflows/            ← Automated pipelines
│       ├── ci.yml            ← Build & test
│       ├── test.yml          ← Run tests
│       ├── security.yml      ← Security scan
│       ├── quality.yml       ← Code quality
│       ├── cd.yml            ← Build images
│       └── deploy.yml        ← Deploy
│
└── docs/                      ← Documentation
    ├── SETUP_GUIDE.md
    ├── QUICK_REFERENCE.md
    └── CI_CD_PIPELINE_GUIDE.md
```

---

## 🔐 Environment Variables (.env)

### What Are They?

Sensitive information that changes per environment:
- Passwords
- API keys
- Database URLs
- Configuration

### Server .env Example

```
MONGODB_URI=mongodb://localhost:27017/mernapp
PORT=5000
NODE_ENV=development
JWT_SECRET=super-secret-key-change-this
CORS_ORIGIN=http://localhost:3000
```

### Client .env Example

```
VITE_API_BASE_URL=http://localhost:5000
```

### Golden Rules

```
✅ DO:
- Create from .env.example
- Keep .env in .gitignore (never commit)
- Use GitHub Secrets for production
- Change secret values in production

❌ DON'T:
- Commit .env files to git
- Put real passwords in .env.example
- Share secrets via email/Slack
- Use same secret everywhere
```

---

## 🏃 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| **Port in use** | `lsof -i :5000` then `kill -9 <PID>` |
| **npm install fails** | `rm -rf node_modules` then `npm install` |
| **Docker won't start** | `docker-compose down -v` then `docker-compose up` |
| **Can't find .env** | `cp .env.example .env` |
| **Workflow keeps failing** | Click workflow → expand job → read error |
| **Code won't build** | `npm run build` locally first |
| **Can't connect to DB** | Check `MONGODB_URI` in .env |
| **API returns 404** | Check route exists in `server/src/routes/` |
| **Frontend blank** | Check console (F12) for errors |
| **Health check fails** | Check all services running: `docker-compose ps` |

---

## 🎯 Daily Tasks

### Task 1: Make a Code Change

```bash
# 1. Create branch
git checkout -b feature/cool-thing

# 2. Edit files in VS Code
nano client/src/App.tsx

# 3. Test locally
npm run dev

# 4. Commit
git add .
git commit -m "feat: add cool thing"

# 5. Push
git push origin feature/cool-thing

# 6. Create PR on GitHub
```

### Task 2: Review Workflow

```bash
# 1. Go to GitHub → Actions tab
# 2. Click your branch's workflow
# 3. Watch it run (takes 10-15 mins)
# 4. See ✅ or ❌ result
# 5. Click failed job to see why (if failed)
```

### Task 3: Deploy to Production

```bash
# 1. All PR checks pass ✅
# 2. Get code review ✅
# 3. Merge to main
# 4. CD pipeline runs (automatic)
# 5. Go to Actions → Deploy workflow
# 6. Click "Run workflow" button
# 7. Pick environment & target
# 8. Watch it deploy
# 9. Test at http://yourapp.com
```

---

## 📊 Understanding Logs

### Where to Find Them

```
GitHub Actions:
  Actions tab → Click run → Click job → See logs

Docker (Local):
  docker-compose logs -f

Server (Development):
  npm run dev  ← See logs in terminal
```

### How to Read Logs

```
GOOD (✅):
"Server started on port 5000"
"Webpack compiled successfully"
"All tests passed"

BAD (❌):
"Cannot find module 'express'"
"MongoDB connection failed"
"Syntax error on line 42"

STEPS TO FIX:
1. Read error message carefully
2. Copy error message
3. Paste in Google
4. Find Stack Overflow answer
5. Apply fix
6. Test again
```

---

## 🚨 Emergency Commands

```bash
# Nuclear option: Reset everything
docker-compose down -v          # Stop and remove data
rm -rf node_modules             # Delete dependencies
rm package-lock.json            # Delete lock file
npm install                     # Reinstall clean
docker-compose up --build       # Rebuild from scratch

# Go back to clean state (lose changes!)
git reset --hard origin/main    # Undo all local changes
git clean -fd                   # Remove untracked files

# See what you're about to commit
git diff                        # See changes
git status                      # See staged changes
```

---

## 🎓 Learning Resources

### Built-in Documentation

1. **QUICK_REFERENCE.md** - Commands & tips
2. **SETUP_GUIDE.md** - Detailed setup
3. **CI_CD_PIPELINE_GUIDE.md** - How pipelines work
4. **HEALTH_MONITORING.md** - Checking if it works
5. **DOCUMENTATION_INDEX.md** - Navigation

### External Resources

- **Git**: https://git-scm.com/doc
- **Docker**: https://docs.docker.com/
- **npm**: https://docs.npmjs.com/
- **GitHub Actions**: https://docs.github.com/actions
- **Troubleshooting**: Stack Overflow

---

## ✅ Success Checklist

- [ ] I can run the project locally with Docker
- [ ] I can make a code change
- [ ] I can push code and see workflows run
- [ ] I understand what CI/CD does
- [ ] I know where to find documentation
- [ ] I can read error messages and Google them
- [ ] I understand Git basic workflow
- [ ] I can troubleshoot common problems

**If you checked all these, you're ready! 🎉**

---

## 🤝 Getting Help

### When You're Stuck

1. **Read the error message**
   - Copy it exactly
   - Google it
   - 80% of the time, answer is in first 3 results

2. **Check documentation**
   - QUICK_REFERENCE.md - Commands
   - SETUP_GUIDE.md - Setup issues
   - CI_CD_PIPELINE_GUIDE.md - Workflow issues
   - HEALTH_MONITORING.md - Health issues

3. **Ask your team**
   - Team Slack
   - Team meeting
   - Pair with someone
   - No such thing as dumb question

4. **Debug locally first**
   - Try to reproduce locally
   - Check logs
   - Add console.log statements
   - Understand the error

---

## 🚀 Next Steps

1. **This Hour**: Read DEVOPS_BEGINNERS_GUIDE.md (you are here!)
2. **Today**: Run project locally with `docker-compose up`
3. **Tomorrow**: Make a small code change and push
4. **This Week**: Read SETUP_GUIDE.md and QUICK_REFERENCE.md
5. **Next Week**: Read CI_CD_PIPELINE_GUIDE.md

**You've got this! Start small, learn by doing.** 💪

---

*Last Updated: January 27, 2026*  
*For beginners who want to get started fast*
