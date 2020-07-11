import * as videoService from '../../services/videoService';
import tryCatch from '../../shared/tryCatch';

const returnStatus = (res, data, statusCode, error) => {
  const status = String(statusCode).startsWith('2') ? 'success' : 'error';
  res.status(statusCode).json({
    data,
    status,
    error,
  });
};

export const home = tryCatch(async (req, res) => {
  const videos = await videoService.getVideos();
  returnStatus(res, videos, 200, '');
});
export const search = tryCatch(async (req, res) => {
  const { term: searchingBy } = req.query;
  const videos = await videoService.getVideos();
  res.render('search', { pageTitle: 'Search', searchingBy, videos });
});
export const getUpload = (req, res) => res.render('upload', { pageTitle: 'Upload' });

export const postUpload = tryCatch(async (req, res) => {
  const video = await videoService.saveVideo(req.body);
  returnStatus(res, video, 200, '');
});
export const videoDetail = (req, res) => res.render('videoDetail', { pageTitle: 'Video Detail' });
export const editVideo = (req, res) => res.render('editVideo', { pageTitle: 'Edit Video' });
export const deleteVideo = (req, res) => res.render('deleteVideo', { pageTitle: 'Delete Video' });
