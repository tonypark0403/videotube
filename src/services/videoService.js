/* eslint-disable import/prefer-default-export */
import AppError from '../shared/AppError';
import Video from '../models/video';
import Comment from '../models/comment';

export const getVideos = async () => {
  try {
    return await Video.find({}).sort({ _id: -1 });
  } catch (err) {
    console.log(err);
    throw new AppError(403, 'Not found!');
  }
};

export const getVideoById = async id => {
  try {
    return await Video.findById(id);
  } catch (err) {
    console.log(err);
    throw new AppError(403, 'Not found!');
  }
};

export const getVideoByTerm = async searchingBy => {
  try {
    return await Video.find({ title: { $regex: searchingBy, $options: 'i' } });
  } catch (err) {
    console.log(err);
    throw new AppError(403, 'Not found!');
  }
};

export const saveVideo = video => {
  try {
    return Video.create(video);
  } catch (err) {
    throw new AppError(404, 'Not found');
  }
};

export const updateVideo = async videoModel => {
  // eslint-disable-next-line no-param-reassign
  videoModel.views += 1;
  await videoModel.save();
};

export const updateVideoWithComment = async (user, videoModel, comment) => {
  const newComment = await Comment.create({
    text: comment,
    creator: user.id,
  });
  videoModel.comments.push(newComment.id);
  await videoModel.save();
};

export const findVideoById = _id => {
  return Video.findById(_id);
};

export const findVideoByIdWithPopulate = (_id, ...key) => {
  return Video.findById(_id).populate(key[0]).populate(key[1]);
};

export const editVideoById = (_id, { title, description }) => {
  return Video.findOneAndUpdate({ _id }, { title, description });
};

export const removeVideoById = async _id => {
  await Video.findOneAndRemove({ _id });
};
