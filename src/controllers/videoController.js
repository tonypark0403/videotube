/* eslint-disable no-underscore-dangle */
import * as videoService from '../services/videoService';
import tryCatch from '../shared/tryCatch';
import routes from '../routes';

export const home = async (req, res) => {
  try {
    const videos = await videoService.getVideos();
    res.render('home', { pageTitle: 'Home', videos });
  } catch {
    res.render('home', { pageTitle: 'Home', videos: [] });
  }
};
export const search = tryCatch(async (req, res) => {
  const { term: searchingBy } = req.query;
  const videos = await videoService.getVideos();
  res.render('search', { pageTitle: 'Search', searchingBy, videos });
});
export const getUpload = (req, res) => res.render('upload', { pageTitle: 'Upload' });

export const postUpload = tryCatch(async (req, res) => {
  const video = await videoService.saveVideo(req.body, req.file);
  // To Do: Upload and save video
  res.redirect(routes.videoDetail(video._id));
});
export const videoDetail = async (req, res) => {
  try {
    const video = await videoService.findVideoById(req.params.id);
    res.render('videoDetail', { pageTitle: 'Video Detail', video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};
export const editVideo = (req, res) => res.render('editVideo', { pageTitle: 'Edit Video' });
export const deleteVideo = (req, res) => res.render('deleteVideo', { pageTitle: 'Delete Video' });
