# QA AI Copilot

QA AI Copilot is an intelligent web application that learns how your QA team works by asking about your current project and daily tasks, then maps out exactly where AI can save time, reduce manual effort, or automate repetitive work.

## Features

- **Personalized AI Suggestions**: Get tailored recommendations based on your team's specific workflow and challenges
- **Guided Onboarding**: Simple project setup process that captures your team's context and tools
- **Actionable Insights**: AI suggestions ranked by time saved and ease of adoption
- **Category Coverage**:
  - Test Case Generation
  - Bug Report Drafting
  - Regression Test Prioritization
  - Requirement Gap Detection
  - Test Automation
  - Performance Testing Analysis

## Tech Stack

### Backend
- **Node.js & Express.js** - RESTful API server
- **MongoDB** - NoSQL database
- **JWT** - Authentication
- **Bcrypt** - Password hashing

### Frontend
- **React 18** - UI framework
- **Material-UI (MUI)** - Component library
- **React Router** - Navigation
- **Axios** - HTTP client

## Project Structure

```
CTS-IdeathonProject/
├── server/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   └── AISuggestion.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── projectController.js
│   │   └── aiController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── projectRoutes.js
│   │   └── aiRoutes.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   └── PrivateRoute.js
│   │   ├── pages/
│   │   │   ├── AuthPage.js
│   │   │   ├── SetupPage.js
│   │   │   ├── ProjectsPage.js
│   │   │   └── DashboardPage.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   └── .env.example
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
MONGO_URI=mongodb://localhost:27017/qa-ai-copilot
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here
OPENAI_API_KEY=your_openai_api_key_here
FRONTEND_URL=http://localhost:3000
```

4. Start the server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Projects
- `POST /api/projects` - Create project
- `GET /api/projects` - Get all user projects
- `GET /api/projects/:id` - Get project details
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### AI Suggestions
- `POST /api/ai/:projectId/generate` - Generate AI suggestions for project
- `GET /api/ai/:projectId` - Get project suggestions
- `PATCH /api/ai/suggestion/:id` - Update suggestion status

## User Flow

1. **Authentication** - Users register or login
2. **Project Setup** - Users answer guided questions about their project
3. **AI Generation** - System analyzes project data and generates personalized suggestions
4. **Dashboard** - Users view ranked suggestions with actionable items
5. **Tracking** - Users can mark suggestions as in-progress or completed

## Features in Detail

### Personalization Engine
The AI suggestion engine analyzes:
- Team size and composition
- Current testing tools and frameworks
- Automation setup
- Current phase (planning, development, testing, etc.)
- Identified challenges and pain points
- Regression testing frequency

Based on this analysis, it suggests specific time-saving opportunities ranked by:
- **Time Saved** - Estimated hours saved per week
- **Adoption Difficulty** - Easy, Medium, or Hard
- **Priority** - Based on impact and effort

### Dashboard
The dashboard displays:
- Project overview
- Ranked AI suggestions with visual indicators
- Action items for each suggestion
- Related resources and documentation
- Status tracking (suggested, in-progress, completed)

## Future Enhancements

- Integration with popular QA tools (JIRA, TestRail, etc.)
- Real-time collaboration features
- Advanced analytics and reporting
- Machine learning for better recommendations
- Slack/Teams integration for notifications
- Support for multiple programming languages
- API for third-party integrations

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.

## Support

For support, please reach out to the development team or open an issue in the repository.

---

**Built with ❤️ for QA Teams**
