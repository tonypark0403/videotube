/* eslint-disable import/prefer-default-export */
import AppError from '../shared/AppError';
import Video from '../models/video';

export const getVideos = async () => {
  try {
    return await Video.find({}).sort({ _id: -1 });
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

export const findVideoById = _id => {
  return Video.findById(_id);
};

export const findVideoByIdWithPopulate = (_id, key) => {
  return Video.findById(_id).populate(key);
};

export const editVideoById = (_id, { title, description }) => {
  return Video.findOneAndUpdate({ _id }, { title, description });
};

export const removeVideoById = async _id => {
  await Video.findOneAndRemove({ _id });
};
