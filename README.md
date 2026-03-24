# Digital Queue Management System for Government Offices

Enterprise full-stack project for managing government office queues digitally instead of relying on long physical lines.

## Stack

- Backend: Java 17, Spring Boot 3, Spring Security JWT, Spring Data JPA, Hibernate, MySQL, WebSocket, Swagger, Maven
- Frontend: React with Vite, Tailwind CSS, Material UI, React Router, Axios, React Query, STOMP WebSocket client, Chart.js
- Deployment: Docker and Docker Compose

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
2. Start the UI:

```bash
cd frontend
npm install
npm run dev
```

3. Open `http://localhost:5173`

## Run With Docker

```bash
docker compose up --build
```

Services:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8080`
- MySQL: `localhost:3306`

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
"# Digital-Queue-System-for-Government-Offices" 
