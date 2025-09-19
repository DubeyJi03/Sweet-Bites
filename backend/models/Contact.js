const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxLength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Please provide a valid email address'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [
      /^[\+]?[1-9][\d]{0,15}$/,
      'Please provide a valid phone number'
    ]
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    enum: [
      'general',
      'order', 
      'complaint',
      'feedback',
      'wholesale',
      'catering',
      'custom'
    ]
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxLength: [2000, 'Message cannot exceed 2000 characters']
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'resolved'],
    default: 'pending'
  },
  adminResponse: {
    type: String,
    trim: true,
    maxLength: [1000, 'Admin response cannot exceed 1000 characters']
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  ipAddress: {
    type: String,
    trim: true
  },
  userAgent: {
    type: String,
    trim: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for efficient querying
contactSchema.index({ status: 1, submittedAt: -1 });
contactSchema.index({ email: 1 });
contactSchema.index({ submittedAt: -1 });

// Virtual for formatted submission date
contactSchema.virtual('formattedSubmissionDate').get(function() {
  return this.submittedAt.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

// Virtual for subject display name
contactSchema.virtual('subjectDisplayName').get(function() {
  const subjectNames = {
    'general': 'General Inquiry',
    'order': 'Order Related',
    'complaint': 'Complaint',
    'feedback': 'Feedback',
    'wholesale': 'Wholesale Inquiry',
    'catering': 'Catering Services',
    'custom': 'Custom Orders'
  };
  return subjectNames[this.subject] || this.subject;
});

// Pre-save middleware
contactSchema.pre('save', function(next) {
  if (this.isModified() && !this.isNew) {
    this.updatedAt = new Date();
  }
  next();
});

// Static method to get contact statistics
contactSchema.statics.getStats = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);

  const totalContacts = await this.countDocuments();
  const todayContacts = await this.countDocuments({
    submittedAt: {
      $gte: new Date(new Date().setHours(0, 0, 0, 0))
    }
  });

  const subjectStats = await this.aggregate([
    {
      $group: {
        _id: '$subject',
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } }
  ]);

  return {
    total: totalContacts,
    today: todayContacts,
    statusBreakdown: stats.reduce((acc, stat) => {
      acc[stat._id] = stat.count;
      return acc;
    }, {}),
    subjectBreakdown: subjectStats.reduce((acc, stat) => {
      acc[stat._id] = stat.count;
      return acc;
    }, {})
  };
};

// Instance method to mark as resolved
contactSchema.methods.markAsResolved = function(adminResponse) {
  this.status = 'resolved';
  this.adminResponse = adminResponse;
  this.updatedAt = new Date();
  return this.save();
};

// Instance method to mark as in progress
contactSchema.methods.markAsInProgress = function() {
  this.status = 'in-progress';
  this.updatedAt = new Date();
  return this.save();
};

module.exports = mongoose.model('Contact', contactSchema);
