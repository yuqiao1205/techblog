import mongoose from 'mongoose'

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  count: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
})

export default mongoose.models.Tag || mongoose.model('Tag', TagSchema)