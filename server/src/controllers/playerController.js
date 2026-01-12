const Player = require('../models/player');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// 1. Create (or Update) Current User's Profile
exports.createProfile = catchAsync(async (req, res, next) => {
  // Get the user ID from the logged-in user (added by auth middleware)
  const userId = req.user.id;

  // Check if profile already exists for this user
  let player = await Player.findOne({ user: userId });

  if (player) {
    // UPDATE existing profile
    player = await Player.findOneAndUpdate({ user: userId }, req.body, {
      new: true,
      runValidators: true
    });
  } else {
    // CREATE new profile
    // Combine the user ID with the form data (sport, bio, etc.)
    const profileData = { ...req.body, user: userId };
    player = await Player.create(profileData);
  }

  res.status(200).json({
    status: 'success',
    data: { player }
  });
});

// 2. Get the Current User's Profile
exports.getMyProfile = catchAsync(async (req, res, next) => {
  const player = await Player.findOne({ user: req.user.id });

  if (!player) {
    return next(new AppError('You have not created a profile yet.', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { player }
  });
});

// 3. Get All Players (For the "Search Players" page)
exports.getAllPlayers = catchAsync(async (req, res, next) => {
  const players = await Player.find();

  res.status(200).json({
    status: 'success',
    results: players.length,
    data: { players }
  });
});