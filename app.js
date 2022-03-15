const express = require('express');
const app = express();

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const notFoundPage = require('./controllers/errorPage');
const User = require('./models/user');
const { mongoConnect } = require('./utils/database');

// set the templating engines
app.set('view engine', 'ejs');

// set where to find html folder (default name is views)
app.set('views', 'views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// for static files like css/assets
app.use(express.static('public'));

app.use((req, res, next) => {
  User.findById('623067368ed1f8a20cf5dbe0')
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((error) => console.log(error));
});

app.use('/admin', adminRoutes);
app.use(userRoutes);
app.use(notFoundPage.pageNotFound);

// use
// authenticate instead
// if we need to wipe and recreate table
// sequelize.sync({ force: true }).then((response) => console.log('success'));

mongoConnect(() => {
  app.listen(3001);
});
