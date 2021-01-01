const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors')
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config = require("./config/key");

// const mongoose = require("mongoose");
// mongoose
//   .connect(config.mongoURI, { useNewUrlParser: true })
//   .then(() => console.log("DB connected"))
//   .catch(err => console.error(err))

const mongoose = require("mongoose")
const connect = mongoose.connect(config.mongoURI,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  }) 
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use(cors())

//to not get any deprecation warning or error
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
//to get json data
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));
app.use('/api/favorite', require('./routes/favorite'));
app.use('/api/comment', require('./routes/comments'));
app.use('/api/like', require('./routes/like'));
app.use('/api/book', require('./routes/books'));
app.use('/api/checkout', require('./routes/checkout'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/like', require('./routes/likes'));
app.use('/api/review', require('./routes/reviews'));
app.use('/api/personality', require('./routes/home/personality'));
app.use('/api/upcoming', require('./routes/home/upcoming_events'));
app.use('/api/quote', require('./routes/home/quotes'));
app.use('/api/pastor', require('./routes/home/our-pastors'));
app.use('/api/sermon', require('./routes/sermon/sermon'));
app.use('/api/media', require('./routes/media/videos'));
app.use('/api/executives', require('./routes/executives/executives'));
app.use('/api/prayer', require('./routes/department/prayer'));
app.use('/api/publicity', require('./routes/department/publicity'));
app.use('/api/bibleStudies', require('./routes/department/bibleStudies'));
app.use('/api/music', require('./routes/department/music'));
app.use('/api/technical', require('./routes/department/technical'));
app.use('/api/about', require('./routes/aboutUs/aboutUs')); 
app.use('/api/leaders-vision', require('./routes/Challenge/leaders_vision'));
app.use('/api/critique', require('./routes/Challenge/thinkers_critique'));
app.use('/api/responses', require('./routes/Challenge/enterpreneurs_response'));
app.use('/api/article', require('./routes/Articles/articles')); 
app.use('/api/debate-article', require('./routes/DebateArticle/debate_article'));


//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder   
  // All the javascript and css files will be read and served from this folder
  app.use(express.static("client/build"));

  // index.html for all page routes    html or routing and naviagtion
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

app.get('/api/hello', (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello Worlds n welcome homespage\n');
});




// var transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',
//   auth: {
//     user: 'agyemanjoseph12@gmail.com',
//     pass: '111'
//   }
// });

// var mailOptions = {
//   from: 'test@gmail.com',
//   to: 'agyemanjoseph12@gmail.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// })

const port = process.env.PORT || 9000

app.listen(port, () => {
  console.log(`Server Listening on ${port}`)
});