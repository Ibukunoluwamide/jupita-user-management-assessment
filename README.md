
# User Management Application

A simple full-stack app for managing users. You can create, view, update, and delete users.

## Tech Stack

* **Backend:** Laravel 12, MySQL, Sanctum (Auth)
* **Frontend:** React 19, Tailwind CSS
* **Database:** MySQL

---

## Project Structure

* `Backend(Laravel)/`: Contains the Laravel backend API.
* `Frontend(React)/`: Contains the React frontend application.

---

## Setup Instructions

---

## Backend Setup

1. Navigate to the backend directory:

```bash
cd Backend(Laravel)
```

2. Install dependencies:

```bash
composer install
```

3. Configure environment:

* Copy `.env.example` to `.env`.
* Set your database credentials in `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=user_management_db
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

4. Generate application key:

```bash
php artisan key:generate
```

5. Run migrations:

```bash
php artisan migrate
```

6. Seed the database (create default user):

```bash
php artisan db:seed
```

7. Start the server:

```bash
php artisan serve
```

The API will be available at:

```
http://127.0.0.1:8000
```

---

## Default Login Credentials

After running the seeder, you can log in with:

```
Email: user@example.com
Password: password123
```

---

## Frontend Setup

1. Navigate to the frontend directory:

```bash
cd ../Frontend(React)
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment:

* Create a `.env` file in the `Frontend(React)` root:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

4. Start the development server:

```bash
npm run dev
```

The application will run at:

```
http://localhost:5173
```

---

## Database Schema

### Users Table (`users`)

| Column     | Type      | Modifiers   |
| ---------- | --------- | ----------- |
| id         | BigInt    | Primary Key |
| full_name  | String    |             |
| email      | String    | Unique      |
| password   | String    | Hashed      |
| created_at | Timestamp |             |
| updated_at | Timestamp |             |

---

## API Endpoints

* `POST /api/login` - Authenticate user
* `POST /api/logout` - Logout
* `GET /api/user/me` - Get current user
* `GET /api/users` - List all users
* `POST /api/users` - Create new user
* `GET /api/users/{id}` - Get user details
* `PUT /api/users/{id}` - Update user
* `DELETE /api/users/{id}` - Delete user


