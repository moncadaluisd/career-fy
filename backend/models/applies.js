import mongoose from 'mongoose';

const applySchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  location: {
    type: String,
  },
  typeWork: {
    type: String,
  },
  salary: {
    type: String,
  },
  company: {
    type: String,
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

  const Apply = mongoose.model('Apply', applySchema);

export default Apply;
