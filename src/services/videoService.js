/* eslint-disable import/prefer-default-export */
import AppError from '../shared/AppError';
import Video from '../models/video';

export const getVideos = async () => {
  try {
    return await Video.find({});
  } catch (err) {
    console.log(err);
    throw new AppError(403, 'Not found!');
  }
};

export const saveVideo = async (video, file) => {
  const { title, description } = video;
  const { path } = file;
  try {
    return await Video.create({
      fileUrl: path,
      title,
      description,
    });
  } catch (err) {
    throw new AppError(404, 'Not found');
  }
};

export const findVideoById = _id => {
  return Video.findById(_id);
};

export const editVideoById = (_id, { title, description }) => {
  return Video.findOneAndUpdate({ _id }, { title, description });
};
