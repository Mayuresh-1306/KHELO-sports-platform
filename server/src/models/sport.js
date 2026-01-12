const mongoose = require('mongoose');

const sportSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Sport must have a name'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  icon: {
    type: String,
    default: '⚽'
  },
  image: String,
  category: {
    type: String,
    enum: ['team', 'individual', 'water', 'winter', 'combat', 'racket', 'target', 'motor', 'other'],
    default: 'team'
  },
  positions: [String],
  rules: [String],
  equipment: [String],
  popularity: {
    type: Number,
    min: 0,
    max: 100,
    default: 50
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Indexes
sportSchema.index({ name: 1 }, { unique: true });
sportSchema.index({ category: 1 });
sportSchema.index({ popularity: -1 });

// Virtual for player count
sportSchema.virtual('playerCount', {
  ref: 'Player',
  localField: '_id',
  foreignField: 'sports.sport',
  count: true
});

const Sport = mongoose.model('Sport', sportSchema);
module.exports = Sport;