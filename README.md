# Game of Thrones Explorer

A modern web application that allows users to explore characters from the Game of Thrones universe. Built with a Backend-for-Frontend (BFF) architecture that integrates with the ThronesAPI v2.

## 🏗️ Architecture

```
Frontend (React + TypeScript)
        ↓
BFF (Express + TypeScript)
        ↓
ThronesAPI v2 (Public REST API)
```

## ✨ Features

### Frontend

- **Character Discovery**: Browse all Game of Thrones characters
- **Search Functionality**: Search characters by name with real-time filtering
- **Character Details**: View detailed information about each character
- **Responsive Design**: Optimized for desktop and mobile devices
- **Loading States**: Smooth loading indicators and error handling
- **Modern UI**: Clean, intuitive interface with Tailwind CSS

### Backend (BFF)

- **API Integration**: Seamless integration with ThronesAPI v2
- **Data Transformation**: Normalizes and transforms API responses for frontend consumption
- **Error Handling**: Comprehensive error handling and normalization
- **CORS Support**: Proper CORS configuration for frontend communication
- **Health Checks**: Built-in health monitoring endpoints

## 🛠️ Tech Stack

### Frontend

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for navigation
- **React Query** for server state management
- **Zustand** for client state management
- **React Hook Form** with Zod validation
- **Axios** for HTTP requests
- **Lucide React** for icons

### Backend

- **Node.js** with TypeScript
- **Express.js** framework
- **Axios** for external API calls
- **CORS** and **Helmet** for security
- **Compression** for response optimization

### Development Tools

- **pnpm** for package management
- **ESLint** for code linting
- **TypeScript** with path aliases
- **Docker** for containerization

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Docker (optional)

### Option 1: Local Development

1. **Clone and Setup**

   ```bash
   git clone <repository-url>
   cd "ST Engineering"
   ```

2. **Backend Setup**

   ```bash
   cd backend
   pnpm install
   cp env.example .env
   pnpm dev
   ```

   Backend will run on http://localhost:3001

3. **Frontend Setup** (in a new terminal)
   ```bash
   cd frontend
   pnpm install
   cp env.example .env
   pnpm dev
   ```
   Frontend will run on http://localhost:3000

### Option 2: Docker Setup

1. **Build and Run**

   ```bash
   docker-compose up --build
   ```

2. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## 📁 Project Structure

```
ST Engineering/
├── backend/                 # Backend-for-Frontend (BFF)
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Express middleware
│   │   ├── routes/         # API routes
│   │   ├── services/       # External API services
│   │   ├── types/          # TypeScript type definitions
│   │   └── utils/          # Utility functions
│   ├── Dockerfile
│   └── package.json
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service layer
│   │   ├── store/          # Zustand stores
│   │   ├── types/          # TypeScript type definitions
│   │   └── utils/          # Utility functions
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml      # Docker orchestration
└── README.md
```

## 🔌 API Endpoints

### Backend BFF API

| Method | Endpoint                         | Description                                  |
| ------ | -------------------------------- | -------------------------------------------- |
| GET    | `/api/health`                    | Health check endpoint                        |
| GET    | `/api/characters`                | Get all characters (with optional filtering) |
| GET    | `/api/characters/:id`            | Get character by ID                          |
| GET    | `/api/characters/search?q=query` | Search characters by name                    |

### Example API Responses

**Get All Characters:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Jon Snow",
      "title": "Lord Commander of the Night's Watch",
      "family": "House Stark",
      "image": "https://thronesapi.com/assets/images/jon-snow.jpg"
    }
  ],
  "total": 1
}
```

**Get Character by ID:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Jon Snow",
    "title": "Lord Commander of the Night's Watch",
    "family": "House Stark",
    "image": "https://thronesapi.com/assets/images/jon-snow.jpg"
  }
}
```

## 🔧 Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=3001
NODE_ENV=development
THRONES_API_BASE_URL=https://thronesapi.com/api/v2
CORS_ORIGIN=http://localhost:3000
```

**Note**: The backend automatically supports CORS for the following origins:

- `http://localhost:3000` (Frontend dev server)
- `http://localhost:4173` (Frontend preview server)
- `https://st-engineering-fe.minhviet.xyz` (Production frontend)
- Any origin specified in `CORS_ORIGIN` environment variable

### Frontend Environment Variables

Create a `.env` file in the `frontend` directory:

```env
VITE_API_BASE_URL=http://localhost:3001/api
```

## 🧪 Development Scripts

### Backend Scripts

```bash
pnpm dev          # Start development server with hot reload
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix ESLint errors
```

### Frontend Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix ESLint errors
```

## 🐳 Docker Commands

```bash
# Build and start all services
docker-compose up --build

# Start in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild specific service
docker-compose up --build backend
```

## 🧪 Testing

The application includes comprehensive error handling and loading states. To test:

1. **Search Functionality**: Try searching for character names
2. **Character Details**: Click on any character to view details
3. **Error Handling**: Test with invalid character IDs
4. **Loading States**: Observe loading indicators during API calls

## 🚀 Deployment

### Production Build

1. **Build Backend:**

   ```bash
   cd backend
   pnpm build
   ```

2. **Build Frontend:**
   ```bash
   cd frontend
   pnpm build
   ```

### Docker Production

```bash
docker-compose -f docker-compose.yml up --build -d
```

## 🔍 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure the backend CORS_ORIGIN matches your frontend URL
2. **API Connection Issues**: Verify the ThronesAPI is accessible
3. **Build Errors**: Ensure all dependencies are installed with `pnpm install`

### Health Checks

- Backend: http://localhost:3001/api/health
- Frontend: http://localhost:3000/health (when using Docker)

## 📝 Features Implemented

✅ **Backend BFF**

- Express.js with TypeScript
- ThronesAPI v2 integration
- Data transformation and normalization
- Comprehensive error handling
- CORS configuration
- Health check endpoints

✅ **Frontend**

- React 18 with TypeScript
- Character listing and search
- Character detail pages
- Loading and error states
- Responsive design
- Modern UI with Tailwind CSS

✅ **Development Experience**

- pnpm package management
- TypeScript path aliases
- ESLint configuration
- Hot reload for development

✅ **Deployment**

- Docker containerization
- Docker Compose orchestration
- Production-ready builds
- Health checks and monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Game of Thrones Explorer** - Built with ❤️ using modern web technologies
