const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Profile must belong to a user'],
    unique: true // One profile per user
  },
  sport: {
    type: String,
    required: [true, 'Please select your sport']
  },
  position: {
    type: String,
    default: 'N/A'
  },
  experienceLevel: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Professional'],
    default: 'Beginner'
  },
  location: {
    type: String,
    default: 'Unknown'
  },
  bio: {
    type: String,
    maxlength: [300, 'Bio cannot exceed 300 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Populate user details (like name) whenever we query for a player
playerSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'name email'
  });
  next();
});

module.exports = mongoose.model('Player', playerSchema);