# Quick Reference Guide

## 🚀 Quick Start

```bash
# Clone the project
git clone https://github.com/anjanilnu-prog/CTS--IdeathonProject.git
cd CTS--IdeathonProject

# Install dependencies for both frontend and backend
npm run install-all

# Copy environment files
cp server/.env.example server/.env
cp client/.env.example client/.env

# Edit server/.env with your MongoDB URI and JWT secret
# Edit client/.env with API URL (default is fine for local dev)

# Start MongoDB (in a separate terminal)
mongod

# Run development server (in another terminal)
npm run dev
```

The app will be available at `http://localhost:3000`

---

## 🧪 Testing the App

### Create Test Account
1. Go to http://localhost:3000
2. Click Register
3. Fill in details:
   - Name: John Doe
   - Email: john@test.com
   - Password: Test123!
   - Role: QA Engineer

### Create Sample Project
1. On Setup page, enter:
   - Project Name: My Test Project
   - Team Size: 5
   - Select some tools and challenges
   - Choose a phase

2. View personalized AI suggestions on dashboard

### Try Features
- Click on suggestion cards to see details
- Click "Start" to mark as in-progress
- Click "Complete" when done
- Go back to Projects to manage multiple projects

---

## 📂 Key Files to Know

| File | Purpose |
|------|---------|
| `server/server.js` | Backend entry point |
| `client/src/App.js` | Frontend main app |
| `server/controllers/aiController.js` | Suggestion generation logic |
| `client/src/pages/DashboardPage.js` | Main UI dashboard |
| `server/models/AISuggestion.js` | Suggestion data structure |

---

## 🔌 API Testing

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@test.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@test.com",
    "password": "password123"
  }'
```

---

## 🐛 Troubleshooting

### MongoDB Connection Failed
- Ensure MongoDB is running: `mongod`
- Check `MONGO_URI` in `server/.env`
- Try local: `mongodb://localhost:27017/qa-ai-copilot`

### Port Already in Use
```bash
# For port 5000 (backend):
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# For port 3000 (frontend):
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### CORS Errors
- Check `FRONTEND_URL` in `server/.env`
- Should be `http://localhost:3000` for local development

### Clear Node Modules
```bash
rm -r node_modules server/node_modules client/node_modules
npm run install-all
```

---

## 🎨 Customization

### Change Port (Backend)
Edit `server/.env`:
```env
PORT=5001
```

### Change Port (Frontend)
Edit `client/.env`:
```env
PORT=3001
```

### Modify Suggestions
Edit `server/controllers/aiController.js` function `generateAISuggestions()`

### Change Theme Colors
Edit `client/src/index.js` - modify `createTheme()` palette

---

## 📚 Documentation Files

- **README.md** - Full project documentation
- **SETUP.md** - Detailed setup instructions
- **PROJECT_SUMMARY.md** - Complete project overview
- **QUICK_REFERENCE.md** - This file!

---

## 🚢 Deployment

### Frontend (Vercel)
```bash
npm run build
# Deploy the 'build' folder to Vercel
```

### Backend (Heroku)
```bash
# Add Heroku remote
heroku create qa-ai-copilot-api
git push heroku main
```

---

## 🔑 Environment Variables Reference

### Backend (`server/.env`)
```env
MONGO_URI=mongodb://localhost:27017/qa-ai-copilot
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_key_change_this
OPENAI_API_KEY=your_api_key_here
FRONTEND_URL=http://localhost:3000
```

### Frontend (`client/.env`)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 📞 Common Tasks

### Add New Route
1. Create controller in `server/controllers/`
2. Create route in `server/routes/`
3. Import and use in `server/server.js`

### Add New Page
1. Create page in `client/src/pages/`
2. Import in `client/src/App.js`
3. Add route in Router

### Add New Model
1. Create schema in `server/models/`
2. Create controller logic
3. Create routes and export

---

## 💾 Git Commands

```bash
# Stage changes
git add .

# Commit
git commit -m "Your message"

# Push
git push origin main

# Pull latest
git pull origin main

# Check status
git status

# View logs
git log --oneline
```

---

## 🎯 Next Features to Add

- [ ] Integration with JIRA/TestRail
- [ ] Real-time collaboration
- [ ] Advanced analytics dashboard
- [ ] Slack notifications
- [ ] Email alerts
- [ ] OpenAI API integration for smarter suggestions
- [ ] User profile customization
- [ ] Team management
- [ ] Bulk suggestion management

---

## 📖 Learning Resources

- [Express.js Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [React Docs](https://react.dev/)
- [Material-UI Docs](https://mui.com/)
- [JWT Guide](https://jwt.io/)

---

## 🤔 FAQ

**Q: Can I use MongoDB Atlas instead of local?**
A: Yes! Just update `MONGO_URI` in `server/.env` with your Atlas connection string.

**Q: How do I add more AI suggestions?**
A: Edit `generateAISuggestions()` in `server/controllers/aiController.js`

**Q: Can I deploy this to AWS/Azure?**
A: Yes! Frontend to S3/Blob Storage, Backend to EC2/App Service with MongoDB Atlas.

**Q: Is this production-ready?**
A: It's a solid foundation. Add input validation, rate limiting, and logging for production.

---

*Last Updated: May 27, 2026*
