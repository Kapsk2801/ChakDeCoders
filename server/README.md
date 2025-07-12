# SkillKarma Server

A Node.js + Express.js server with MongoDB connection using Mongoose.

## Features

- Express.js server with ES6 modules
- MongoDB connection using Mongoose
- CORS middleware for cross-origin requests
- Morgan middleware for HTTP request logging
- Environment variables support with dotenv

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the server directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/skillkarma
   NODE_ENV=development
   ```

3. Start the server:
   ```bash
   # Development mode with nodemon
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

- `GET /` - Welcome message
- `GET /health` - Health check with database status

## MongoDB Connection

The server will log "MongoDB connected" when successfully connected to the database.

Make sure MongoDB is running locally or update the MONGODB_URI in your .env file to point to your MongoDB instance. 