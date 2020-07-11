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

export const saveVideo = video => {
  const { file, title, description } = video;
  console.log(file, title, description);
  return new Promise((resolve, reject) => {
    try {
      resolve(324393);
    } catch (err) {
      reject(new AppError(404, 'Not found'));
    }
  });
};
