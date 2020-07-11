/* eslint-disable import/prefer-default-export */
import { videos } from '../models/db';
import AppError from '../shared/AppError';

export const getVideos = () => {
  return new Promise((resolve, reject) => {
    try {
      resolve(videos);
    } catch (err) {
      reject(new AppError(500, 'No data!'));
    }
  });
};
