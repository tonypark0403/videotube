/* eslint-disable no-underscore-dangle */
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import * as videoService from '../services/videoService';
import tryCatch from '../shared/tryCatch';
import routes from '../routes';
import AppError from '../shared/AppError';

export const home = async (req, res) => {
  try {
    const videos = await videoService.getVideos();
    // console.log('home-videos:', videos);
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
  const video = {
    title: req.body.title,
    description: req.body.description,
    fileUrl: req.file.path,
    creator: req.user.id,
  };
  await cloudinary.uploader.upload_large(video.fileUrl, async (error, result) => {
    // console.log('cloudinary:', result);
    const { fileUrl } = video;
    video.fileUrl = result.url;
    const newVideo = await videoService.saveVideo(video);
    req.user.videos.push(newVideo.id);
    req.user.save();
    res.redirect(routes.videoDetail(newVideo._id));
    try {
      fs.unlinkSync(fileUrl);
    } catch (err) {
      AppError(err);
    }
  });
});

export const videoDetail = async (req, res) => {
  try {
    const video = await videoService.findVideoByIdWithPopulate(
      req.params.id,
      'creator',
      'comments',
    );
    // console.log('videoDetail-video:', video);
    res.render('videoDetail', { pageTitle: video.title, video });
  } catch (error) {
    // console.log(error);
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  try {
    const video = await videoService.findVideoById(req.params.id);
    if (String(video.creator) !== req.user.id) {
      throw Error();
    } else {
      res.render('editVideo', { pageTitle: `Edit ${video.title}`, video });
    }
  } catch (error) {
    // console.log("The id doesn't exit");
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
  const {
    params: { id },
  } = req;
  try {
    const video = await videoService.findVideoById(id);
    if (String(video.creator) !== req.user.id) {
      throw Error();
    } else {
      const fileData = video.fileUrl.split('/');
      const fileId = fileData[fileData.length - 1];
      // console.log('fileId:', fileId);
      await cloudinary.uploader.destroy(
        `${fileId}`,
        { resource_type: 'raw' },
        async (error, result) => {
          console.log('cloudiary', result, error);
          await videoService.removeVideoById(id);
        },
      ); // due to no extension, not use video but raw
    }
  } catch (error) {
    console.log(`The video of ${req.params.id} does't exist.`);
  }
  res.redirect(routes.home);
};

// Register Video View
export const postRegisterView = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await videoService.getVideoById(id);
    await videoService.updateVideo(video);
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

// Add Comment
export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user,
  } = req;
  try {
    const video = await videoService.getVideoById(id);
    await videoService.updateVideoWithComment(user, video, comment);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
