# 🐳 Docker Desktop Installation Guide for Windows

## ⚡ Quick Installation Steps

### Step 1: Download Docker Desktop
1. Visit: **https://www.docker.com/products/docker-desktop**
2. Click **"Download for Windows"** button
3. Wait for the installer to download (about 1 GB)

### Step 2: Run the Installer
1. Locate the downloaded file: `Docker Desktop Installer.exe`
2. **Right-click** → **Run as Administrator**
3. Follow the setup wizard:
   - ✅ Accept the license agreement
   - ✅ Choose installation location (default is fine)
   - ✅ **Enable "Install required Windows components"** (important!)
   - ✅ Click **Install**

### Step 3: Wait for Installation
- Installation takes 5-10 minutes
- Do NOT close the installer window
- Your computer may restart automatically

### Step 4: Launch Docker Desktop
1. After installation, search for **"Docker Desktop"** in Windows Start Menu
2. Click to launch Docker Desktop
3. You may need to log in with your Docker Hub account (create one if needed)
4. Wait for the Docker daemon to start (look for Docker icon in system tray)

### Step 5: Verify Installation
Open PowerShell and run:
```bash
docker --version
```

**Expected output:**
```
Docker version 26.1.0, build 1234567
```

If you see this, ✅ Docker is installed!

---

## ❌ If You Get Errors

### Error: "docker: The term 'docker' is not recognized"

**Solution 1: Restart PowerShell**
- Close all PowerShell windows
- Open a **NEW** PowerShell window
- Try `docker --version` again

**Solution 2: Add Docker to PATH**
```bash
# Check if Docker is installed in default location
Test-Path "C:\Program Files\Docker\Docker\resources\bin\docker.exe"
```

If it returns `True`, Docker is installed but PATH needs updating:
```bash
# Add Docker to PATH
$env:Path += ";C:\Program Files\Docker\Docker\resources\bin"

# Test again
docker --version
```

**Solution 3: Enable Virtualization in BIOS**
Docker requires CPU virtualization. On some systems it's disabled by default.

1. **Restart your computer**
2. **During startup, press:**
   - **DEL** or **F2** (for most systems)
   - Or **F10, F12** (check your computer brand)
3. **Find "Virtualization" or "VT-x" setting**
4. **Enable it**
5. **Save and restart**

---

## ✅ Test Docker Installation

Once Docker is installed, verify everything works:

```bash
# Check Docker version
docker --version

# Check Docker daemon status
docker ps

# Run a test container
docker run hello-world
```

**Expected output for `docker run hello-world`:**
```
Hello from Docker!
This message shows that your installation appears to be working correctly.
```

---

## 🚀 Use Docker with Your Project

After Docker is installed, test with your VoltDrive project:

```bash
# Navigate to your project
cd C:\Users\vidun\OneDrive\Desktop\i_Projects\Devops

# Check docker-compose
docker-compose --version

# Run your application stack
docker-compose -f docker/docker-compose.yml up --build
```

This will start:
- ✅ MongoDB (database)
- ✅ Backend server (port 5000)
- ✅ Frontend app (port 3000)

---

## 📋 System Requirements Check

Before installing, verify your system has:

```bash
# Check Windows version
[System.Environment]::OSVersion

# Check RAM (needs 4GB minimum, 8GB recommended)
Get-CimInstance Win32_ComputerSystem | Select-Object @{Name="RAM_GB"; Expression={[math]::Round($_.TotalPhysicalMemory/1GB)}}

# Check disk space (needs 5GB free)
Get-Volume C | Select-Object SizeRemaining
```

---

## 🔗 Important Links

- **Docker Download:** https://www.docker.com/products/docker-desktop
- **Docker Docs:** https://docs.docker.com/
- **Docker Hub:** https://hub.docker.com/
- **WSL 2 Setup:** https://docs.microsoft.com/en-us/windows/wsl/install

---

## ⏱️ Installation Timeline

| Step | Time |
|------|------|
| Download | 5-10 min |
| Install | 10-15 min |
| Setup | 2-3 min |
| Verify | 1 min |
| **Total** | **~30 min** |

---

## 🎯 Next Steps After Installation

1. ✅ Install Docker Desktop
2. ✅ Verify with `docker --version`
3. ✅ Test with `docker run hello-world`
4. ✅ Run your project: `docker-compose up`

---

## 💬 Questions?

- **Docker not found after restart?** → Restart your computer again
- **Installation stuck?** → Check Docker website for latest version
- **Want to uninstall?** → Windows Settings → Apps → Docker Desktop → Uninstall

