const mongoose = require('mongoose');

const aiSuggestionSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: String,
      enum: [
        'test-case-generation',
        'bug-report-drafting',
        'regression-prioritization',
        'requirement-analysis',
        'test-automation',
        'performance-testing',
      ],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    timeSavedHours: {
      type: Number,
      required: true,
    },
    adoptionDifficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium',
    },
    actionItems: [String],
    relatedResources: [String],
    status: {
      type: String,
      enum: ['suggested', 'in-progress', 'completed', 'dismissed'],
      default: 'suggested',
    },
    priority: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AISuggestion', aiSuggestionSchema);
