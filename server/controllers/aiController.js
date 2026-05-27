const AISuggestion = require('../models/AISuggestion');
const Project = require('../models/Project');

// AI suggestion generation logic
const generateAISuggestions = (projectData) => {
  const suggestions = [];
  const basePriority = 1;

  // Test Case Generation
  if (!projectData.testingTools || projectData.testingTools.length === 0) {
    suggestions.push({
      category: 'test-case-generation',
      title: 'Automate Test Case Generation from User Stories',
      description: 'Use AI to automatically generate comprehensive test cases from your user stories and requirements. This reduces manual test case writing time by 60-70%.',
      timeSavedHours: 8,
      adoptionDifficulty: 'easy',
      actionItems: [
        'Integrate with your requirement management tool',
        'Configure test case templates',
        'Set up automated workflows',
      ],
      relatedResources: [
        'https://docs.example.com/test-generation',
        'https://docs.example.com/ai-workflows',
      ],
      priority: basePriority + 4,
    });
  }

  // Bug Report Drafting
  suggestions.push({
    category: 'bug-report-drafting',
    title: 'AI-Powered Bug Report Generation',
    description: 'Automatically draft detailed bug reports with descriptions, steps to reproduce, and expected vs actual results. Saves 3-4 hours per week on documentation.',
    timeSavedHours: 4,
    adoptionDifficulty: 'easy',
    actionItems: [
      'Configure bug report templates',
      'Set up AI analysis triggers',
      'Train team on report review process',
    ],
    relatedResources: ['https://docs.example.com/bug-reports'],
    priority: basePriority + 3,
  });

  // Regression Prioritization
  if (projectData.regressionRunFrequency === 'weekly' || projectData.regressionRunFrequency === 'daily') {
    suggestions.push({
      category: 'regression-prioritization',
      title: 'Intelligent Regression Test Prioritization',
      description: 'AI analyzes code changes and prioritizes regression tests based on impact. Execute critical tests first, reducing regression time by 40-50%.',
      timeSavedHours: 6,
      adoptionDifficulty: 'medium',
      actionItems: [
        'Connect to your version control system',
        'Configure test impact analysis',
        'Set up prioritization rules',
      ],
      relatedResources: ['https://docs.example.com/regression-testing'],
      priority: basePriority + 2,
    });
  }

  // Requirement Analysis
  suggestions.push({
    category: 'requirement-analysis',
    title: 'Automated Requirement Gap Detection',
    description: 'AI reviews requirements and identifies gaps, ambiguities, and potential edge cases before development starts. Prevents costly bugs downstream.',
    timeSavedHours: 5,
    adoptionDifficulty: 'medium',
    actionItems: [
      'Set up requirement scanning',
      'Configure gap detection rules',
      'Establish review workflows',
    ],
    relatedResources: ['https://docs.example.com/requirements'],
    priority: basePriority + 1,
  });

  // Test Automation
  if (!projectData.automationTools || projectData.automationTools.length < 2) {
    suggestions.push({
      category: 'test-automation',
      title: 'Accelerated Test Automation Framework',
      description: 'AI assists in writing and maintaining test automation scripts, reducing automation script development by 50%. Perfect for complex UI testing.',
      timeSavedHours: 10,
      adoptionDifficulty: 'hard',
      actionItems: [
        'Select automation framework',
        'Configure AI code generation',
        'Set up maintenance pipelines',
      ],
      relatedResources: ['https://docs.example.com/automation'],
      priority: basePriority,
    });
  }

  // Performance Testing
  suggestions.push({
    category: 'performance-testing',
    title: 'AI-Driven Performance Testing Analysis',
    description: 'Automatically identify performance bottlenecks, suggest optimization areas, and detect performance regressions.',
    timeSavedHours: 7,
    adoptionDifficulty: 'hard',
    actionItems: [
      'Set up performance monitoring',
      'Configure baseline metrics',
      'Create alert thresholds',
    ],
    relatedResources: ['https://docs.example.com/performance'],
    priority: basePriority - 1,
  });

  return suggestions;
};

exports.generateSuggestions = async (req, res) => {
  try {
    const { projectId } = req.params;

    // Get project data
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    if (project.userId.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    // Generate AI suggestions
    const suggestionsData = generateAISuggestions(project);

    // Save suggestions to database
    const savedSuggestions = await AISuggestion.insertMany(
      suggestionsData.map((suggestion) => ({
        ...suggestion,
        projectId,
        userId: req.userId,
      }))
    );

    res.status(201).json({
      success: true,
      message: 'AI suggestions generated successfully',
      suggestions: savedSuggestions.sort((a, b) => b.priority - a.priority),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getSuggestions = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    if (project.userId.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const suggestions = await AISuggestion.find({ projectId }).sort({ priority: -1 });

    res.status(200).json({
      success: true,
      suggestions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateSuggestionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const suggestion = await AISuggestion.findById(id);
    if (!suggestion) {
      return res.status(404).json({
        success: false,
        message: 'Suggestion not found',
      });
    }

    if (suggestion.userId.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    suggestion.status = status;
    await suggestion.save();

    res.status(200).json({
      success: true,
      message: 'Suggestion status updated',
      suggestion,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
