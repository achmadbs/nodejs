const express = require('express');
const app = express();

// set enginee bars

// set the templating engines
app.set('view engine', 'ejs');

// set where to find html folder (default name is views)
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const notFoundPage = require('./controllers/errorPage');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// for static files like css/assets
app.use(express.static('public'));

app.use('/admin', adminRoutes);
app.use(userRoutes);
app.use(notFoundPage.pageNotFound);

app.listen(3000);
