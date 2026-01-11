const Profile = require('../models/profile');

 
const getProfile = async (req, res) => {
  try {
     
    const profile = await Profile.findOne({ user: req.user._id }).populate(
      'user',
      ['name', 'email', 'sport']
    );

    if (!profile) {
      return res.status(404).json({ message: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 
const updateProfile = async (req, res) => {
  const {
    location,
    dateOfBirth,
    position,
    height,
    weight,
    bio,
    stats,
    socialLinks,
  } = req.body;

   
  const profileFields = {};
  profileFields.user = req.user._id;
  if (location) profileFields.location = location;
  if (dateOfBirth) profileFields.dateOfBirth = dateOfBirth;
  if (position) profileFields.position = position;
  if (height) profileFields.height = height;
  if (weight) profileFields.weight = weight;
  if (bio) profileFields.bio = bio;
  if (stats) profileFields.stats = stats;
  if (socialLinks) profileFields.socialLinks = socialLinks;

  try {
    let profile = await Profile.findOne({ user: req.user._id });

    if (profile) {
       
      profile = await Profile.findOneAndUpdate(
        { user: req.user._id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

     
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports = { getProfile, updateProfile };