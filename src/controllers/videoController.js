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
  const videos = await videoService.getVideoByTerm(searchingBy);
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
    res.render('videoDetail', { pageTitle: video.title, video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  try {
    const video = await videoService.findVideoById(req.params.id);
    res.render('editVideo', { pageTitle: `Edit ${video.title}`, video });
  } catch (error) {
    console.log("The id doesn't exit");
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  try {
    const video = await videoService.editVideoById(req.params.id, req.body);
    res.redirect(routes.videoDetail(video._id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  try {
    await videoService.removeVideoById(req.params.id);
  } catch (error) {
    console.log(`The video of ${req.params.id} does't exist.`);
  }
  res.redirect(routes.home); // 실패하던 성공하던 redirect to home
};
