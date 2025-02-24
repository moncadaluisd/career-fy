import mongoose from 'mongoose';

const curriculumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: false,
  },
  score: {
    type: Number,
    required: false,
  },
  feedback: {
    type: String,
    required: false,
  },
  suggestions: {
    type: String,
    required: false,
  },
  fileIdAi: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Curriculum = mongoose.model('Curriculum', curriculumSchema);

export default Curriculum;
