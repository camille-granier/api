const express = require('express');
const app = express();
require('./models/dbConfig');
const postsRoutes = require('./routes/postsController');
const bodyParser = require('body-parser');
//package to provide middleware to enable access to data outside of given domain
const cors = require('cors')

app.use(bodyParser.json())
app.use(cors());
app.use('/posts', postsRoutes)

app.listen(5500, () => console.log('server started: 5500'))