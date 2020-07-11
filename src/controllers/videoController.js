import * as videoService from '../services/videoService';
import tryCatch from '../shared/tryCatch';

export const home = tryCatch(async (req, res) => {
  const videos = await videoService.getVideos();
  res.render('home', { pageTitle: 'Home', videos });
});
export const search = tryCatch(async (req, res) => {
  const { term: searchingBy } = req.query;
  const videos = await videoService.getVideos();
  res.render('search', { pageTitle: 'Search', searchingBy, videos });
});
export const upload = (req, res) => res.render('upload', { pageTitle: 'Upload' });
export const videoDetail = (req, res) => res.render('videoDetail', { pageTitle: 'Video Detail' });
export const editVideo = (req, res) => res.render('editVideo', { pageTitle: 'Edit Video' });
export const deleteVideo = (req, res) => res.render('deleteVideo', { pageTitle: 'Delete Video' });
