# Elysia + Better Auth + Drizzle Starter

A lightweight starter project demonstrating how to integrate **Elysia** (Bun), **Better-Auth**, and **Drizzle ORM** into a clean and scalable authentication API.

This project is ideal for learning, experimentation, or using as a base for production‑ready authentication systems.

---

## ✨ Features

* ⚡ **Elysia** — Fast and expressive Bun framework
* 🔐 **Better-Auth** — Simple, powerful authentication toolkit
* 🗄️ **Drizzle ORM** — Type-safe SQL migrations and queries
* 🗃️ **SQLite / PostgreSQL** support (depending on your config)
* 📁 Clean project structure
* 🚀 Ready for extension

---

## 📦 Tech Stack

* **Runtime:** Bun
* **Framework:** Elysia
* **Auth:** Better-Auth
* **Database:** Drizzle ORM
* **Migration Tool:** Drizzle Kit

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
bun create elysia-better-auth-drizzle
cd elysia-better-auth-drizzle
```

### 2. Install dependencies

```bash
bun install
```

### 3. Configure environment variables

Create a `.env` file:

```bash
DATABASE_URL="file:./data.db" # or postgres URL
SESSION_SECRET="your-secret"
```

### 4. Run migrations

```bash
bunx drizzle-kit push
```

### 5. Start the development server

```bash
bun run dev
```

---

## 📁 Project Structure Backend

```
src/
  ├─ src/
    ├─ index.ts // Entrypoint of the application
    ├─ modules/ // Modules of the application
    ├─ utils/ // Utility functions and helpers
      ├─ auth.ts // Authentication utilities with Better-Auth
    |- database/ // Database models
    |- types/ // Types and interfaces
```

---

## 🔐 Authentication Flow
The app includes:

* User registration
* Email/password login
* Session handling

---

## 🤝 Contributing

Thanks for considering contributing! ❤️

### How to Contribute

1. **Fork** the repository
2. **Create** a new branch

   ```bash
   git checkout -b feature/my-feature
   ```
3. **Commit** your changes

   ```bash
   git commit -m "Add new feature"
   ```
4. **Push** the branch

   ```bash
   git push origin feature/my-feature
   ```
5. **Open a Pull Request**

### Guidelines

* Follow the existing code style
* Keep PRs small and focused
* Add/update documentation if needed
* Include tests when applicable

---

## 📜 License

MIT License — feel free to use this project in your own applications.

---

## ⭐ Support

If you find this project useful, consider giving it a **star** on GitHub to help others discover it!
