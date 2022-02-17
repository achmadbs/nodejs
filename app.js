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
const sequelize = require('./utils/database');

const Product = require('./models/product');
const User = require('./models/user');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// for static files like css/assets
app.use(express.static('public'));

app.use('/admin', adminRoutes);
app.use(userRoutes);
app.use(notFoundPage.pageNotFound);
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

// use
// authenticate instead
// if we need to wipe and recreate table
// sequelize.sync({ force: true }).then((response) => console.log('success'));

sequelize
  .sync()
  .then((response) => {
    console.log('success');
    app.listen(3001);
    return User.findByPk(1).then((user) => {
      if (!user) {
        return User.create({ name: 'Achmad', email: 'test@test.com' });
      }
      return user;
    });
  })
  .catch((err) => console.log(err));
