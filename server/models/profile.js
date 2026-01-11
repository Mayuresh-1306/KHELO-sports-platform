const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    location: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    position: {
      type: String, 
    },
    height: {
      type: String, 
    },
    weight: {
      type: String, 
    },
    bio: {
      type: String,
    },
    stats: {
      type: Object, 
      default: {},
    },
    achievements: [
      {
        title: { type: String, required: true },
        date: { type: Date },
        description: { type: String },
      },
    ],
    socialLinks: {
      instagram: { type: String },
      twitter: { type: String },
      linkedin: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Profile', profileSchema);