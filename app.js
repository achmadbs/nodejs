const express = require('express');
const mongoose = require('mongoose');
const app = express();

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const notFoundPage = require('./controllers/errorPage');
const User = require('./models/user');

// set the templating engines
app.set('view engine', 'ejs');

// set where to find html folder (default name is views)
app.set('views', 'views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// for static files like css/assets
app.use(express.static('public'));

app.use((req, res, next) => {
  User.findById('6239bf9243f0621ee894ce36')
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

mongoose
  .connect(
    'mongodb+srv://achmad:reactjs123@cluster0.dkl5x.mongodb.net/shop-udemy?retryWrites=true&w=majority',
    { useNewUrlParser: true }
  )
  .then(() => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: 'Achmad',
          email: 'achmadbdrdn@gmail.com',
          cart: { items: [] },
        });
        user.save();
      }
    });
    app.listen(3001);
    console.log('running');
  })
  .catch((err) => console.log(err));
