# KHELO Application

Sports player profile management platform with modern UI.

## Deployment

- **Frontend**: Deployed on Vercel
- **Backend**: Deployed on Render
- **Database**: MongoDB Atlas

See [deployment_guide.md](./deployment_guide.md) for detailed deployment instructions.

## Local Development

### Prerequisites
- Node.js >= 18.0.0
- MongoDB
- npm or yarn

### Setup

1. Clone the repository
```bash
git clone <your-repo-url>
cd KHELO
```

2. Install dependencies
```bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

3. Configure environment variables
```bash
# Frontend (.env in client folder)
cp client/.env.example client/.env
# Edit client/.env with your values

# Backend (.env in server folder)
cp server/.env.example server/.env
# Edit server/.env with your values
```

4. Run development servers
```bash
# Terminal 1 - Frontend
cd client
npm run dev

# Terminal 2 - Backend
cd server
npm run dev
```

5. Open http://localhost:5173

## Tech Stack

### Frontend
- React 19
- Vite
- React Router
- Axios
- React Icons
- Framer Motion
- React Toastify

### Backend
- Node.js
- Express
- MongoDB/Mongoose
- JWT Authentication
- Cloudinary (image upload)
- Bcrypt
- Express Validator

## Features

- ✅ Player profile management
- ✅ Achievement tracking with certificate upload
- ✅ Modern UI with glassmorphism
- ✅ Image upload with drag-and-drop
- ✅ Responsive design
- ✅ Authentication & authorization
- ✅ Search and filter players

## Project Structure

```
KHELO/
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── styles/        # CSS files
│   │   ├── context/       # React context
│   │   └── App.jsx        # Main app component
│   ├── public/            # Static assets
│   └── package.json
│
├── server/                # Backend (Node.js + Express)
│   ├── src/
│   │   ├── config/       # Configuration files
│   │   ├── controllers/  # Route controllers
│   │   ├── models/       # Mongoose models
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Custom middleware
│   │   ├── utils/        # Utility functions
│   │   ├── app.js        # Express app
│   │   └── server.js     # Server entry point
│   └── package.json
│
└── render.yaml           # Render deployment config
```

## License

MIT
