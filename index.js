require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const urlRoute = require('./routes/url.route')
const bodyParser = require('body-parser')

const connectDB = (url) => {
  return mongoose.connect(url,
      {
          useNewUrlParser: true,
          useUnifiedTopology: true
      })
}

// Basic Configuration
//middleware
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//view
app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});
//route
app.use('/', urlRoute)


const start = async (req, res) => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, function() {
      console.log(`Listening on port ${port}`);
    });
  } catch (error) {
    console.log(error)
  }
}

start() 


