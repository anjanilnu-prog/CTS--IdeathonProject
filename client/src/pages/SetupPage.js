import React, { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Alert,
  CircularProgress,
  Chip,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { projectService, aiService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const SetupPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    teamSize: 5,
    currentPhase: 'planning',
    testingTools: [],
    automationTools: [],
    currentChallenges: [],
    regressionRunFrequency: 'weekly',
  });
  const [newTool, setNewTool] = useState('');
  const [newChallenge, setNewChallenge] = useState('');

  const testingToolOptions = ['Manual Testing', 'Selenium', 'Cypress', 'Playwright', 'TestRail', 'JIRA'];
  const automationToolOptions = ['Jenkins', 'CircleCI', 'GitLab CI', 'GitHub Actions', 'Azure DevOps'];
  const challengeOptions = ['Manual test case creation', 'Regression testing', 'Performance testing', 'Test data management', 'Requirement gaps', 'Test automation maintenance'];

  const handleToggleTool = (tool, toolType) => {
    setFormData((prev) => ({
      ...prev,
      [toolType]: prev[toolType].includes(tool)
        ? prev[toolType].filter((t) => t !== tool)
        : [...prev[toolType], tool],
    }));
  };

  const handleToggleChallenge = (challenge) => {
    setFormData((prev) => ({
      ...prev,
      currentChallenges: prev.currentChallenges.includes(challenge)
        ? prev.currentChallenges.filter((c) => c !== challenge)
        : [...prev.currentChallenges, challenge],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const projectResponse = await projectService.createProject(formData);
      const projectId = projectResponse.data.project._id;

      // Generate AI suggestions
      await aiService.generateSuggestions(projectId);

      navigate(`/dashboard/${projectId}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Setup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#f5f5f5', py: 4 }}>
      <Container maxWidth="md">
        <Card elevation={4}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
              Let's Get Started!
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: '#666' }}>
              Tell us about your project so we can provide personalized AI suggestions.
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Project Name"
                value={formData.projectName}
                onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                margin="normal"
                required
              />

              <TextField
                fullWidth
                label="Project Description"
                multiline
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                margin="normal"
              />

              <TextField
                fullWidth
                label="Team Size"
                type="number"
                value={formData.teamSize}
                onChange={(e) => setFormData({ ...formData, teamSize: parseInt(e.target.value) })}
                margin="normal"
                inputProps={{ min: 1 }}
              />

              <TextField
                fullWidth
                select
                label="Current Phase"
                value={formData.currentPhase}
                onChange={(e) => setFormData({ ...formData, currentPhase: e.target.value })}
                margin="normal"
                SelectProps={{ native: true }}
              >
                <option value="planning">Planning</option>
                <option value="development">Development</option>
                <option value="testing">Testing</option>
                <option value="deployment">Deployment</option>
                <option value="maintenance">Maintenance</option>
              </TextField>

              <Typography variant="subtitle1" sx={{ mt: 3, mb: 2, fontWeight: 'bold' }}>
                Testing Tools Used
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {testingToolOptions.map((tool) => (
                  <Chip
                    key={tool}
                    label={tool}
                    onClick={() => handleToggleTool(tool, 'testingTools')}
                    color={formData.testingTools.includes(tool) ? 'primary' : 'default'}
                    variant={formData.testingTools.includes(tool) ? 'filled' : 'outlined'}
                  />
                ))}
              </Box>

              <Typography variant="subtitle1" sx={{ mt: 3, mb: 2, fontWeight: 'bold' }}>
                Automation Tools Used
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {automationToolOptions.map((tool) => (
                  <Chip
                    key={tool}
                    label={tool}
                    onClick={() => handleToggleTool(tool, 'automationTools')}
                    color={formData.automationTools.includes(tool) ? 'primary' : 'default'}
                    variant={formData.automationTools.includes(tool) ? 'filled' : 'outlined'}
                  />
                ))}
              </Box>

              <Typography variant="subtitle1" sx={{ mt: 3, mb: 2, fontWeight: 'bold' }}>
                Current Challenges
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {challengeOptions.map((challenge) => (
                  <Chip
                    key={challenge}
                    label={challenge}
                    onClick={() => handleToggleChallenge(challenge)}
                    color={formData.currentChallenges.includes(challenge) ? 'primary' : 'default'}
                    variant={formData.currentChallenges.includes(challenge) ? 'filled' : 'outlined'}
                  />
                ))}
              </Box>

              <TextField
                fullWidth
                select
                label="Regression Run Frequency"
                value={formData.regressionRunFrequency}
                onChange={(e) => setFormData({ ...formData, regressionRunFrequency: e.target.value })}
                margin="normal"
                SelectProps={{ native: true }}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="bi-weekly">Bi-weekly</option>
                <option value="monthly">Monthly</option>
              </TextField>

              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 4 }}
                type="submit"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Generate AI Suggestions'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default SetupPage;
