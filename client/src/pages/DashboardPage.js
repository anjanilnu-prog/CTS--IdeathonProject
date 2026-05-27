import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  CircularProgress,
  Grid,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { aiService, projectService } from '../services/api';

const DashboardPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectRes, suggestionsRes] = await Promise.all([
          projectService.getProjectById(projectId),
          aiService.getSuggestions(projectId),
        ]);
        setProject(projectRes.data.project);
        setSuggestions(suggestionsRes.data.suggestions);
      } catch (err) {
        setError('Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectId]);

  const handleStatusUpdate = async (suggestionId, newStatus) => {
    try {
      await aiService.updateSuggestionStatus(suggestionId, { status: newStatus });
      setSuggestions((prev) =>
        prev.map((s) => (s._id === suggestionId ? { ...s, status: newStatus } : s))
      );
    } catch (err) {
      setError('Failed to update status');
    }
  };

  const categoryColors = {
    'test-case-generation': '#3b82f6',
    'bug-report-drafting': '#f59e0b',
    'regression-prioritization': '#10b981',
    'requirement-analysis': '#8b5cf6',
    'test-automation': '#ec4899',
    'performance-testing': '#f97316',
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', background: '#f9fafb', py: 4 }}>
      <Container maxWidth="lg">
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {project && (
          <Card sx={{ mb: 4, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                {project.projectName}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>
                {project.description}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Chip label={`Team: ${project.teamSize}`} sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }} />
                <Chip label={`Phase: ${project.currentPhase}`} sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }} />
              </Box>
              <Button variant="contained" sx={{ mt: 2, backgroundColor: 'white', color: '#667eea' }} onClick={() => navigate('/projects')}>
                Back to Projects
              </Button>
            </CardContent>
          </Card>
        )}

        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
          AI Suggestions Ranked by Impact ({suggestions.length} suggestions)
        </Typography>

        <Grid container spacing={3}>
          {suggestions.map((suggestion) => (
            <Grid item xs={12} md={6} lg={4} key={suggestion._id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 },
                }}
                onClick={() => {
                  setSelectedSuggestion(suggestion);
                  setOpenDialog(true);
                }}
              >
                <CardContent sx={{ pb: 1, flex: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                    <Chip
                      label={suggestion.category.replace(/-/g, ' ')}
                      size="small"
                      sx={{
                        backgroundColor: categoryColors[suggestion.category],
                        color: 'white',
                        fontWeight: 'bold',
                      }}
                    />
                    <Chip
                      label={`${suggestion.timeSavedHours}h saved`}
                      size="small"
                      variant="outlined"
                      color="success"
                    />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {suggestion.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666', mb: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {suggestion.description}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                    <Chip label={`Difficulty: ${suggestion.adoptionDifficulty}`} size="small" variant="outlined" />
                  </Box>
                </CardContent>
                <CardContent sx={{ pt: 1, borderTop: '1px solid #eee' }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {suggestion.status !== 'completed' && (
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusUpdate(suggestion._id, 'in-progress');
                        }}
                      >
                        Start
                      </Button>
                    )}
                    {suggestion.status === 'in-progress' && (
                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusUpdate(suggestion._id, 'completed');
                        }}
                      >
                        Complete
                      </Button>
                    )}
                    <Chip label={suggestion.status} size="small" variant="filled" />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          {selectedSuggestion && (
            <>
              <DialogTitle sx={{ fontWeight: 'bold' }}>{selectedSuggestion.title}</DialogTitle>
              <DialogContent sx={{ pt: 2 }}>
                <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
                  {selectedSuggestion.description}
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Action Items:
                </Typography>
                <Box sx={{ mb: 2, pl: 2 }}>
                  {selectedSuggestion.actionItems.map((item, idx) => (
                    <Typography key={idx} variant="body2" sx={{ mb: 0.5 }}>
                      • {item}
                    </Typography>
                  ))}
                </Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Resources:
                </Typography>
                <Box sx={{ mb: 2, pl: 2 }}>
                  {selectedSuggestion.relatedResources.map((resource, idx) => (
                    <Typography key={idx} variant="body2" sx={{ mb: 0.5, color: '#3b82f6', cursor: 'pointer' }}>
                      • <a href={resource} target="_blank" rel="noopener noreferrer">{resource}</a>
                    </Typography>
                  ))}
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenDialog(false)}>Close</Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Container>
    </Box>
  );
};

export default DashboardPage;
