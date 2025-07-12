# Platina Backend 🛠️

Backend oficial de **Platina**, una plataforma social para gamers que centraliza logros, trofeos y juegos completados desde múltiples plataformas como Steam, PlayStation, Xbox y más.

Este servidor proporciona las APIs necesarias para autenticación, perfiles, logros y emparejamiento entre jugadores.

---

## 🧱 Tech Stack

- Node.js + Express
- TypeScript
- PostgreSQL + Prisma ORM
- JWT para autenticación
- Zod para validación de datos
- CORS configurado para frontend externo
- Deployment temporal en Render (o Railway)

---

## 🔐 Características principales

- API RESTful estructurada en módulos
- Registro y login de usuarios con tokens JWT
- Gestión de perfiles de jugador
- Integración para recibir logros desde diferentes plataformas (en progreso)
- Búsqueda de jugadores con intereses comunes
- Seguridad con validaciones, hashing, y control de acceso

---

## 📦 Instalación local

```bash
git clone https://github.com/tu-usuario/platina-backend.git
cd platina-backend
npm install
npm run dev
