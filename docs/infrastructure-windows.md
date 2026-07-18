# Infrastructure - Windows + WSL2 Setup

## 1. WSL2 Installation

Open PowerShell as Administrator:

```powershell
wsl --install -d Ubuntu
```

Restart your computer when prompted. After restart, Ubuntu will launch and ask you to create a username and password.

Verify WSL2 is the default version:

```powershell
wsl --set-default-version 2
```

## 2. Ubuntu Setup

After WSL2 is installed, open Ubuntu and run:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git build-essential
```

Install Node.js (v22 LTS):

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
```

Verify:

```bash
node --version  # Should show v22.x+
npm --version
```

## 3. Flutter Setup (inside WSL2 or Windows)

Flutter can run from either Windows or WSL2. If developing with VS Code on Windows, install Flutter on Windows and use the Windows terminal. WSL2 is only required for Docker.

If you want Flutter inside WSL2:

```bash
sudo snap install flutter --classic
flutter doctor
```

## 4. Docker Desktop Setup

1. Download and install [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/)
2. Open Docker Desktop Settings
3. Go to **Resources > WSL Integration**
4. Enable your Ubuntu distribution
5. Apply and restart

Verify from Ubuntu (inside WSL2):

```bash
docker --version
docker compose version
```

## 5. Running the Project

### From Windows (PowerShell):

```powershell
# Start backend infrastructure
cd infrastructure\docker
docker compose up -d

# Run Flutter
cd apps\mobile
flutter pub get
flutter run -d chrome
```

### From WSL2 (Ubuntu):

```bash
cd /path/to/Enacts-BTU
cd infrastructure/docker
docker compose up -d

cd ../../apps/mobile
flutter pub get
flutter run -d chrome
```

## 6. Required Future Network Considerations

### WebRTC and LiveKit

WebRTC requires specific network conditions for production voice/video:

- **Public IP or Port Forwarding**: LiveKit needs to be reachable from the internet for users outside the local network
- **TURN Server**: A TURN relay server (coturn) is required for users behind symmetric NATs or restrictive firewalls
- **STUN Server**: Used for NAT traversal discovery (LiveKit includes built-in STUN)
- **Firewall Rules**: The following ports must be open:
  - TCP 443 (HTTPS/WSS)
  - UDP 3478-3480 (TURN/STUN)
  - UDP 50000-60000 (WebRTC media relay)

### Warning

**WebRTC will NOT work reliably in production without proper TURN server configuration and public network access.** For local development on the same machine or local network, LiveKit works without TURN. For any deployment where clients are on different networks, you must:

1. Deploy a TURN server (coturn)
2. Configure LiveKit to use the TURN server
3. Ensure UDP ports are open on your firewall
4. Consider using a cloud VM with a public IP for the TURN server

### Recommended Production Setup

For production, consider:

- Deploying on a cloud VM (AWS, Azure, DigitalOcean) with a public IP
- Using a managed PostgreSQL or Redis if scaling beyond a single server
- Setting up SSL/TLS via Caddy (automatic HTTPS)
- Configuring coturn for TURN relay

## 7. Troubleshooting

### Docker containers not starting

```bash
# Check Docker Desktop is running
docker ps

# Check WSL2 integration in Docker Desktop settings
# Resources > WSL Integration > Enable your distro
```

### Port conflicts

```bash
# Check if port 5432 or 6379 are in use
netstat -tlnp | grep 5432
netstat -tlnp | grep 6379
```

### Flutter device not found

```bash
flutter devices
flutter doctor
```
