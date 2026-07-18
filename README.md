# Enactus Hub

Virtual headquarters for Enactus Beni Suef Technological University. A collaborative platform supporting ~200 team members with real-time presence, voice communication, a virtual office map, task management, and announcements.

## Architecture Overview

```
Flutter Mobile App
    |
    v
NestJS Backend API (TypeScript)
    |
    +--> PostgreSQL (primary data)
    +--> Redis (presence, cache, pub/sub)
    +--> Socket.IO (real-time events)
    +--> LiveKit (self-hosted WebRTC voice)
    +--> MinIO (object storage, optional)
```

See [docs/architecture.md](docs/architecture.md) for the full architecture document.

## Local Development Requirements

- **Node.js** 22+ and npm
- **Flutter** 3.44+ and Dart 3.12+
- **Docker Desktop** with WSL2 backend
- **WSL2** Ubuntu 22.04+

## Windows + WSL2 Setup

1. Install WSL2 with Ubuntu: `wsl --install -d Ubuntu`
2. Install Docker Desktop and enable WSL2 backend
3. Clone the repository inside WSL2 or use the Windows filesystem

See [docs/infrastructure-windows.md](docs/infrastructure-windows.md) for detailed instructions.

## Docker Compose Commands

```bash
# From the infrastructure/docker directory:
cd infrastructure/docker

# Start all services (PostgreSQL, Redis, Server)
docker compose up -d

# View logs
docker compose logs -f server

# Stop all services
docker compose down

# Stop and remove volumes
docker compose down -v
```

## Flutter Run Commands

```bash
cd apps/mobile

# Get dependencies
flutter pub get

# Run on connected device
flutter run

# Run on Chrome (web)
flutter run -d chrome

# Build for release
flutter build apk
flutter build web
```

## Environment Variable Setup

1. Copy `.env.example` to `.env` in `apps/server/`:

```bash
cp apps/server/.env.example apps/server/.env
```

2. Copy `.env.example` to `.env` in `infrastructure/docker/`:

```bash
cp infrastructure/docker/.env.example infrastructure/docker/.env
```

3. Edit the `.env` files with your local configuration. Never commit `.env` files.

## Project Structure

```
/
  apps/
    mobile/          # Flutter mobile/web application
    server/          # NestJS backend API
  packages/
    shared_models/   # Shared data models (future)
  infrastructure/
    docker/          # Docker Compose configuration
    livekit/         # LiveKit WebRTC config (documented)
    caddy/           # Caddy reverse proxy config
  docs/              # Project documentation
```

## Current Limitations

- Authentication (JWT) is not yet implemented
- LiveKit voice integration is not yet configured
- No database migrations exist yet
- No API documentation (Swagger) yet
- The virtual office map (Flame) has not been started
- WebSocket gateway exists but has no business logic
- Docker Compose requires WSL2 on Windows for LiveKit (WebRTC)

## License

Private - Enactus BTU
