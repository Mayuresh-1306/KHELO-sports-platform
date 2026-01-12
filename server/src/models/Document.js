const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Document must have a title'],
    trim: true
  },
  description: String,
  player: {
    type: mongoose.Schema.ObjectId,
    ref: 'Player',
    required: [true, 'Document must belong to a player']
  },
  documentType: {
    type: String,
    enum: ['id_proof', 'medical', 'certificate', 'contract', 'performance', 'other'],
    required: true
  },
  file: {
    url: {
      type: String,
      required: true
    },
    filename: String,
    originalName: String,
    size: Number,
    mimeType: String
  },
  tags: [String],
  isVerified: {
    type: Boolean,
    default: false
  },
  expiresAt: Date,
  uploadedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  metadata: mongoose.Schema.Types.Mixed
}, {
  timestamps: true
});

// Indexes
documentSchema.index({ player: 1, documentType: 1 });
documentSchema.index({ tags: 1 });
documentSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Middleware to check expiry
documentSchema.pre('save', function(next) {
  if (this.expiresAt && this.expiresAt < new Date()) {
    this.isVerified = false;
  }
  next();
});

const Document = mongoose.model('Document', documentSchema);
module.exports = Document;