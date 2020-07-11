import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema(
  {
    fileUrl: {
      type: String,
      required: 'File URL is required',
    },
    title: {
      type: String,
      required: 'Title is required',
    },
    description: String,
    views: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    timestamps: true,
  },
);

const model = mongoose.model('Video', VideoSchema);
export default model;
