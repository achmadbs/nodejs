exports.pageNotFound = (req, res, next) => {
  res.render('404-page', { pageTitle: 'Page Not Found ' });
  // res.sendFile(path.join(rootDir, 'views', '404-page.html'));
};
