# Setup Instructions

## Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/anjanilnu-prog/CTS--IdeathonProject.git
cd CTS--IdeathonProject
```

### 2. Install all dependencies
```bash
npm run install-all
```

This will install dependencies for both the server and client.

### 3. Configure Environment Variables

#### Backend (.env)
Create `server/.env`:
```
MONGO_URI=mongodb://localhost:27017/qa-ai-copilot
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
OPENAI_API_KEY=your_openai_api_key_here
FRONTEND_URL=http://localhost:3000
```

#### Frontend (.env)
Create `client/.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Setup MongoDB
- **Local MongoDB**: Make sure MongoDB is running on `mongodb://localhost:27017`
- **MongoDB Atlas**: Use your connection string in `MONGO_URI`

### 5. Run the Application

#### Option A: Run both server and client together
```bash
npm run dev
```

#### Option B: Run separately
Terminal 1 - Backend:
```bash
npm run server
```

Terminal 2 - Frontend:
```bash
npm run client
```

### 6. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- Health Check: http://localhost:5000/api/health

## Testing the Application

### Create a Test Account
1. Go to http://localhost:3000/auth
2. Click "Register" tab
3. Fill in the form:
   - Name: John Doe
   - Email: john@example.com
   - Password: password123
   - Role: QA Engineer

### Create a Test Project
1. You'll be redirected to the setup page
2. Fill in project details:
   - Project Name: E-commerce Platform
   - Description: New e-commerce website redesign
   - Team Size: 8
   - Select some testing and automation tools
   - Select current challenges
3. Click "Generate AI Suggestions"

### View AI Suggestions
- You'll see personalized AI suggestions ranked by impact
- Click on any suggestion card to see details
- Click "Start" to mark as in-progress
- Click "Complete" when done

## Project Structure

- `server/` - Express.js backend
- `client/` - React frontend
- `README.md` - Project documentation
- `SETUP.md` - This file

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGO_URI` in `.env` is correct
- Verify MongoDB connection: `mongosh` or `mongo`

### Port Already in Use
- Backend: Change `PORT` in `server/.env`
- Frontend: Create `client/.env` with `PORT=3001`

### Dependencies Issues
```bash
# Clear cache and reinstall
rm -r node_modules
rm package-lock.json
npm install
```

### CORS Errors
- Check `FRONTEND_URL` in `server/.env` matches your frontend URL
- Ensure both are running on the correct ports

## API Documentation

See `README.md` for complete API endpoint documentation.

## Contributing

1. Create a feature branch
2. Make your changes
3. Commit and push
4. Submit a pull request

## Support

For issues and questions, please open an issue on GitHub.
