export const home = (req, res) => res.render('home', { pageTitle: 'Home', potato: 1245 });
export const search = (req, res) => {
  const { term: searchingBy } = req.query;
  res.render('search', { pageTitle: 'Search', searchingBy });
};
export const upload = (req, res) => res.render('upload', { pageTitle: 'Upload' });
export const videoDetail = (req, res) => res.render('videoDetail', { pageTitle: 'Video Detail' });
export const editVideo = (req, res) => res.render('editVideo', { pageTitle: 'Edit Video' });
export const deleteVideo = (req, res) => res.render('deleteVideo', { pageTitle: 'Delete Video' });
