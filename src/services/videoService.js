/* eslint-disable import/prefer-default-export */
import { videos } from '../models/db';
import AppError from '../shared/AppError';

export const getVideos = () => {
  return new Promise((resolve, reject) => {
    try {
      resolve(videos);
    } catch (err) {
      reject(new AppError(403, 'Not found!'));
    }
  });
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
