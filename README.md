# 🔗 URLclip

A modern and secure URL Shortener built with **Node.js**, **Express.js**, **MongoDB Atlas**, and **JavaScript**. URLclip allows users to shorten long URLs, create custom aliases, generate QR codes, and protect links with passwords.

---

## ✨ Features

- 🔗 Shorten long URLs instantly
- ✏️ Custom aliases for short links
- 🔒 Password-protected URLs
- 🔐 Secure password hashing using bcrypt
- 📱 QR Code generation for every shortened URL
- 🌐 Automatic URL validation
- ⚡ Auto-adds `https://` if missing
- 🎨 Responsive and modern UI
- ☁️ MongoDB Atlas cloud database
- 🚀 Ready for deployment on Render

---

## 🛠️ Tech Stack

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Libraries
- bcrypt
- qrcode
- dotenv
- cors

---

## 📂 Project Structure

```
URLclip/
│
├── public/
│   ├── index.html
│   ├── password.html
│   ├── style.css
│   ├── script.js
│   └── password.js
│
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
├── .env
└── README.md
```

---

## 🚀 Installation

### Clone the repository

```bash
git clone https://github.com/mohamedfahim18/URLclip.git
```

### Navigate to the project

```bash
cd URLclip
```

### Install dependencies

```bash
npm install
```

### Create a `.env` file

```env
PORT=2000
MONGODB_URI=your_mongodb_connection_string
BASE_URL=http://localhost:2000
```

### Start the server

```bash
node server.js
```

Visit:

```
http://localhost:2000
```

---

## 📸 Features in Action

### URL Shortening
Convert long URLs into short, shareable links.

### Custom Alias
Create memorable URLs such as:

```
https://domain_name.com/alias_name
```

### Password Protection
Protect sensitive links with a password before anyone can access them.

### QR Code Generation
Every shortened link automatically includes a QR code for quick sharing.

---

## 🔐 Security

- Passwords are securely hashed using **bcrypt**
- Plain-text passwords are never stored
- MongoDB stores only encrypted password hashes

---

## 🌍 Deployment

This project is deployed with Render


Remember to configure the environment variables:

- `MONGODB_URI`
- `BASE_URL`
- `PORT` (optional on Render)

---

## 📌 Future Improvements

- User authentication
- Link analytics
- Click counter
- Link expiration
- Dashboard for managing URLs
- REST API
- Rate limiting

---

## 👨‍💻 Author

**Mohamed Fahim U**

- GitHub: https://github.com/mohamedfahim18
- LinkedIn: https://linkedin.com/in/mohamed-fahim-82529736b/

---

## ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub!

---

🌐 Live Demo

https://urlclip-v9ll.onrender.com/

