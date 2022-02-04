const express = require('express');
const app = express();

// set enginee bars

// set the templating engines
app.set('view engine', 'ejs');

// set where to find html folder (default name is views)
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// for static files like css/assets
app.use(express.static('public'));

app.use(adminRoutes);
app.use(userRoutes);
app.use((req, res, next) => {
  res.render('404-page', { pageTitle: 'Page Not Found ' });
  // res.sendFile(path.join(rootDir, 'views', '404-page.html'));
});

app.listen(3000);
