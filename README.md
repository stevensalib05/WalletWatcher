# WalletWatcher

A full-stack financial tracking web application that allows users to manage accounts, track income, and monitor budgets.
Built to explore modern full-stack architecture including OAuth authentication, REST APIs, and relational persistence.

---

## Tech Stack

### Frontend

* React + TypeScript
* Vite
* React Router
* Google OAuth Login
* CSS Modules

### Backend

* Spring Boot 4
* Spring Data JPA
* Spring Security
* REST Controllers

### Database

* PostgreSQL
* Hibernate ORM (schema auto-generation)

---

## Project Structure

```
WalletWatcher/
├── client/      # React frontend
└── server/      # Spring Boot backend
```

---

## Local Setup

### Prerequisites

Install:

* Node.js (18+)
* Java 17+
* Maven
* PostgreSQL

---

## Database Setup for Linux
These instructions are all written for Linux users. Instructions for Windows is below.
Create database:

```bash
sudo -u postgres psql
```

```sql
CREATE DATABASE wallet;
\q
```

Configure backend connection in:

```
server/src/main/resources/application.properties
```

Mind you, this is not in the .gitignore as this isnt widespread, so you can configure these to your liking.
If this becomes widespread, this README will be updated to compensate! Anyways, here is the backend configuration.

Example:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/wallet
spring.datasource.username=postgres
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

Hibernate will automatically create tables on startup.

#### Database Setup for Windows

If PostgreSQL was installed using the official installer:

1. Open **SQL Shell (psql)** from the Start Menu

Follow the prompts (press Enter to accept defaults unless you changed them):

```
Server [localhost]:
Database [postgres]:
Port [5432]:
Username [postgres]:
Password: ****
```

2. Create the project database:

```sql
CREATE DATABASE wallet;
\q
```


---

## Google OAuth Setup

Create OAuth credentials:

[https://console.cloud.google.com/](https://console.cloud.google.com/)

Add:

```
Authorized JavaScript origin:
http://localhost:5173
```

Add to backend:

```properties
google.client-id=YOUR_CLIENT_ID
```

---

## Running the Application

### Start Backend

```bash
cd server
mvn spring-boot:run
```

Or if you are using IntelliJ IDEA (or some IDE that has an integrated starting button), just click the startup button instead.

Server runs on:

```
http://localhost:8082
```

---

### Start Frontend

```bash
cd client
npm install
npm run dev
```

App runs on:

```
http://localhost:5173
```

---

## 👤 Author

Steven Salib
