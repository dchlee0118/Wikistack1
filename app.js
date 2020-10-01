const express = require('express');
const morgan = require('morgan');
const app = express();
const { db, Page, User } = require('./models');
const PORT = 3000;
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');
const path = require('path');

app.use(express.static(path.join(__dirname, './public')));
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// app.use('/', router);
app.get('/', (req, res, next) => {
    res.redirect('/wiki');
})
app.use('/wiki', wikiRouter);
app.use('/user', userRouter);

// app.listen(3000, () => {console.log('app listening on 3000')})
db.authenticate()
  .then(() => {
    console.log('connected to the database');
  })

const init = async () => {
    await Page.sync();
    await User.sync();
    // make sure that you have a PORT constant
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}!`);
    });
}

init();