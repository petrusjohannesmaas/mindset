# 🧠 Mindset

**Mindset** is a simple, but meaningful way for people to express themselves.

---

## 🚀 Features

- Submit mood and mindset entries via a clean frontend form.
- Store entries in a PocketBase collection (`mindsets`).
- Backend API built with Express and Node.js.
- PocketBase-admin-authenticated record creation for security.
- Frontend served statically via Express.

---

## 📦 Tech Stack

- **Backend:** Node.js, Express, PocketBase SDK
- **Database:** PocketBase (self-hosted or local)
- **Frontend:** Vanilla HTML, JS
- **Auth:** Admin login via PocketBase

---

## 🛠️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/petrusjohannesmaas/mindset.git
cd mindset
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file:

```env
POCKETBASE_URL=http://127.0.0.1:8090
POCKETBASE_ADMIN=test@admin.com
POCKETBASE_ADMIN_PASS=adminpassword
PORT=3000
```

Make sure your PocketBase instance is running locally on port 8090, and that the admin account exists with the credentials above.

### 4. Run the App

```bash
node index.js
```

Visit `http://localhost:3000` to use the app.

---

## 📁 Project Structure

```
mindset/
├── public/
│   └── index.html         # Frontend form
├── .env                   # Environment variables
├── index.js               # Express backend
├── package.json
```

---

## 🔒 Security Notes

* Admin credentials are stored in `.env` and used server-side only.
* Clients do **not** get direct access to PocketBase.
* All mindset entries are created via the backend API for control and security.

---

## 💡 Future Improvements

* Add user login or admin dashboard
* Add a feature to allow users to add images to their mindsets
* Add a feature for sobriety tracking
* Add integration for a buddy system
* Add JWT or session authentication
* Validate client tokens
* Rate-limit or verify with reCAPTCHA

---

## 📜 License

GNU General Public License v3.0 see [LICENSE](./LICENSE)

---

## 🤝 Contributing

Pull requests are welcome! If you have ideas to make Mindset better, feel free to contribute.

```

Let me know if you'd like me to generate a `LICENSE` file or push this to a new GitHub repo (I can guide you).
```
