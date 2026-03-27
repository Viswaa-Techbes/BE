# Technician Service Backend API

A clean, modular Node.js backend for managing technician service jobs using Express and MongoDB.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or Atlas connection string)
- npm or yarn

## Installation

1. **Navigate to the project directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start MongoDB** (if running locally):
   ```bash
   mongod
   ```

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on **http://localhost:5000**

## API Endpoints

### 1. Get All Jobs
```bash
GET /api/jobs
```
**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "service": "Plumbing",
      "customerName": "John Doe",
      "address": "123 Main St",
      "time": "2:00 PM",
      "status": "assigned",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

### 2. Create a New Job
```bash
POST /api/jobs
Content-Type: application/json

{
  "service": "Plumbing",
  "customerName": "John Doe",
  "address": "123 Main St",
  "time": "2:00 PM"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Job created successfully",
  "data": {
    "_id": "...",
    "service": "Plumbing",
    "customerName": "John Doe",
    "address": "123 Main St",
    "time": "2:00 PM",
    "status": "assigned",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

### 3. Update Job Status
```bash
PUT /api/jobs/:id
Content-Type: application/json

{
  "status": "in_progress"
}
```

**Valid Status Values:**
- `assigned` (initial state)
- `in_progress`
- `completed`

**Response:**
```json
{
  "success": true,
  "message": "Job status updated successfully",
  "data": {
    "_id": "...",
    "service": "Plumbing",
    "customerName": "John Doe",
    "address": "123 Main St",
    "time": "2:00 PM",
    "status": "in_progress",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

## Project Structure

```
/backend
  ├── server.js                 # Main server setup
  ├── package.json             # Dependencies
  ├── /models
  │   └── job.model.js        # MongoDB Job schema
  ├── /controllers
  │   └── job.controller.js    # Business logic
  └── /routes
      └── job.routes.js        # API routes
```

## Features Implemented

✅ Express server with CORS support  
✅ MongoDB connection with Mongoose  
✅ Modular MVC architecture (Models → Controllers → Routes)  
✅ Async/await for clean async code  
✅ Comprehensive error handling  
✅ Data validation  
✅ RESTful API design  
✅ Status enum validation  

## Architecture Benefits

- **Modular Design**: Easy to add new features (technicians, authentication, expenses)
- **Separation of Concerns**: Routes → Controllers → Models
- **Scalable**: Ready for middleware, authentication, and advanced features
- **Clean Code**: Proper error handling and validation
- **Extensible**: Framework ready for technician assignment, expenses, tracking, etc.

## Environment Variables

You can customize the MongoDB connection and port:

```bash
# .env file (create if needed)
MONGODB_URL=mongodb://127.0.0.1:27017/technician_app
PORT=5000
```

## Testing with cURL

### Create a job
```bash
curl -X POST http://localhost:5000/api/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "service": "Plumbing",
    "customerName": "John Doe",
    "address": "123 Main St",
    "time": "2:00 PM"
  }'
```

### Get all jobs
```bash
curl http://localhost:5000/api/jobs
```

### Update job status
```bash
curl -X PUT http://localhost:5000/api/jobs/:id \
  -H "Content-Type: application/json" \
  -d '{"status": "in_progress"}'
```

## Future Extensions (Placeholder Ready)

The codebase is structured to easily support:
- Technician assignment and management
- User authentication & authorization
- Expense tracking per job
- Real-time job tracking
- Admin dashboard
- Mobile app integration

## License

MIT
