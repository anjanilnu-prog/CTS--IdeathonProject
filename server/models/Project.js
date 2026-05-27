const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    projectName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    teamSize: {
      type: Number,
      required: true,
    },
    currentPhase: {
      type: String,
      enum: ['planning', 'development', 'testing', 'deployment', 'maintenance'],
      default: 'planning',
    },
    testingTools: [String],
    automationTools: [String],
    currentChallenges: [String],
    weeklyHours: {
      type: Number,
      default: 40,
    },
    regressionRunFrequency: {
      type: String,
      enum: ['daily', 'weekly', 'bi-weekly', 'monthly'],
      default: 'weekly',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
