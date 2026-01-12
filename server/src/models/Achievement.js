const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Achievement must have a title'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  player: {
    type: mongoose.Schema.ObjectId,
    ref: 'Player',
    required: [true, 'Achievement must belong to a player']
  },
  sport: {
    type: mongoose.Schema.ObjectId,
    ref: 'Sport',
    required: [true, 'Achievement must be in a sport']
  },
  category: {
    type: String,
    enum: ['tournament', 'award', 'record', 'milestone', 'certification', 'other'],
    required: true
  },
  level: {
    type: String,
    enum: ['international', 'national', 'state', 'district', 'school', 'club'],
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  position: String,
  evidence: [{
    url: String,
    type: {
      type: String,
      enum: ['image', 'video', 'document']
    },
    description: String
  }],
  isVerified: {
    type: Boolean,
    default: false
  },
  verifiedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  verificationDate: Date
}, {
  timestamps: true
});

// Indexes
achievementSchema.index({ player: 1, date: -1 });
achievementSchema.index({ sport: 1 });
achievementSchema.index({ category: 1 });
achievementSchema.index({ level: 1 });

// Query middleware to populate
achievementSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'sport',
    select: 'name icon'
  }).populate({
    path: 'verifiedBy',
    select: 'name role'
  });
  
  next();
});

const Achievement = mongoose.model('Achievement', achievementSchema);
module.exports = Achievement;