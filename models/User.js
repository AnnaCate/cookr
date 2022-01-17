import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  avatar: String,
  email: {
    type: String,
    required: [true, 'Please provide the email for this user.'],
  },
  favorites: [
    {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Recipe',
    },
  ],
  name: {
    type: String,
    required: [true, 'Please provide the name for this user.'],
  },
  recipes: [
    {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Recipe',
    },
  ],
  sub: {
    type: String,
    required: [true, 'Please provide the auth0 sub for this user.'],
  },
  wantToCook: [
    {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Recipe',
    },
  ],
  wouldNotCookAgain: [
    {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Recipe',
    },
  ],
})

export default mongoose.models.User || mongoose.model('User', UserSchema)
