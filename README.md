# Digital Queue Management System for Government Offices

Enterprise full-stack project for managing government office queues digitally instead of relying on long physical lines.

## Stack

- Backend: Java 17, Spring Boot 3, Spring Security JWT, Spring Data JPA, Hibernate, MySQL for local development, PostgreSQL for Render deployment, WebSocket, Swagger, Maven
- Frontend: React with Vite, Tailwind CSS, Material UI, React Router, Axios, React Query, STOMP WebSocket client, Chart.js
- Deployment: Docker and Docker Compose locally, Render Blueprint for cloud deployment

## Project Structure

```text
backend/
  src/main/java/com/queue/
    config/
    controller/
    dto/
    entity/
    exception/
    repository/
    security/
    service/
    util/
  src/main/resources/
frontend/
  src/
    components/
    context/
    hooks/
    layouts/
    pages/
    services/
    utils/
```

## Key Features

- JWT authentication with `Citizen`, `Staff`, and `Admin` roles
- Citizen portal for joining queues, tracking tokens, feedback, and notifications
- Staff counter dashboard for calling, recalling, skipping, and completing tokens
- Admin analytics dashboard and setup pages for offices, departments, services, and counters
- FIFO queue flow with simple priority handling for emergency and special cases
- Realtime updates using Spring WebSocket and STOMP
- Multilingual UI foundation for English, Hindi, and Telugu
- Queue display board page for office screens

## Seed Accounts

- Admin: `admin@govqueue.com` / `Admin@123`
- Staff: `staff@govqueue.com` / `Staff@123`
- Citizen: `citizen@govqueue.com` / `Citizen@123`

## Database Strategy

- Local development uses MySQL from [backend/src/main/resources/application.yml](/c:/Users/p lakshmi swetha/Digital Queue System for Government Offices/backend/src/main/resources/application.yml).
- Render deployment uses PostgreSQL from [backend/src/main/resources/application-render.yml](/c:/Users/p lakshmi swetha/Digital Queue System for Government Offices/backend/src/main/resources/application-render.yml).
- The two do not collide because Render runs with `spring.profiles.active=render`, while local development continues using the default MySQL configuration.

## Run Locally

### Backend

1. Install Java 17, Maven 3.9+, and MySQL 8.
2. Create or allow auto-creation of database `digital_queue_db`.
3. Update credentials in [backend/src/main/resources/application.yml](/c:/Users/p lakshmi swetha/Digital Queue System for Government Offices/backend/src/main/resources/application.yml).
4. Start the API:

```bash
cd backend
mvn spring-boot:run
```

5. Open Swagger: `http://localhost:8080/swagger-ui.html`

### Frontend

1. Install Node.js 20+.
2. Copy [frontend/.env.example](/c:/Users/p lakshmi swetha/Digital Queue System for Government Offices/frontend/.env.example) to `.env` if you want to override the API URL.
3. Start the UI:

```bash
cd frontend
npm install
npm run dev
```

4. Open `http://localhost:5173`

## Run With Docker

```bash
docker compose up --build
```

Services:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8080`
- MySQL: `localhost:3306`

## Deploy To Render

This repository now includes [render.yaml](/c:/Users/p lakshmi swetha/Digital Queue System for Government Offices/render.yaml) for a two-service Render deployment:

- `digital-queue-backend`: Spring Boot API on Render Web Service
- `digital-queue-frontend`: Vite static frontend on Render Static Site
- `digital-queue-postgres`: Render PostgreSQL database

### Render-specific changes

- PostgreSQL driver added in [backend/pom.xml](/c:/Users/p lakshmi swetha/Digital Queue System for Government Offices/backend/pom.xml)
- Render Spring profile in [backend/src/main/resources/application-render.yml](/c:/Users/p lakshmi swetha/Digital Queue System for Government Offices/backend/src/main/resources/application-render.yml)
- API base URL and WebSocket URL are now environment-driven in [frontend/src/services/api.js](/c:/Users/p lakshmi swetha/Digital Queue System for Government Offices/frontend/src/services/api.js) and [frontend/src/hooks/useQueueSocket.js](/c:/Users/p lakshmi swetha/Digital Queue System for Government Offices/frontend/src/hooks/useQueueSocket.js)
- Public health endpoint added at `/api/public/health`

### Render deployment steps

1. Commit and push the current repository, including `render.yaml`.
2. Open this Blueprint link in Render:
   `https://dashboard.render.com/blueprint/new?repo=https://github.com/vineelch17-cmyk/Digital-Queue-System-for-Government-Offices`
3. Review the three resources Render will create.
4. Keep the backend service on the `render` Spring profile.
5. If Render asks you to confirm frontend env values, keep `VITE_API_BASE_URL` pointed at your backend Render URL.

### Notes for Render

- The backend health check path is `/api/public/health`.
- CORS is profile-based: localhost for local development, `https://*.onrender.com` for Render.
- The frontend static build reads `VITE_API_BASE_URL` at build time, so if you rename the backend service in Render, update that variable accordingly.

## Core API Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`
- `GET /api/public/catalog`
- `POST /api/queue/join`
- `GET /api/queue/status/{tokenId}`
- `POST /api/queue/cancel?tokenId={tokenId}`
- `GET /api/queue/my-tokens`
- `POST /api/staff/next-token`
- `POST /api/staff/skip-token?tokenId={tokenId}`
- `POST /api/staff/recall-token?tokenId={tokenId}`
- `POST /api/staff/complete-token?tokenId={tokenId}`
- `GET /api/staff/waiting-users`
- `POST /api/admin/offices`
- `POST /api/admin/departments`
- `POST /api/admin/services`
- `POST /api/admin/counters`
- `GET /api/admin/analytics`

## Notes

- `backend/src/main/resources/schema.sql` contains a reference schema.
- `backend/src/main/java/com/queue/config/DataInitializer.java` seeds demo records.
- Email and SMS methods are scaffolded with integration hooks for production gateways.
- Staff management UI is present, but full CRUD staff administration should be backed by dedicated admin user APIs if you want complete HR-style provisioning.
