const express = require('express');
const db = require('./models/index');
const  { add, findAll } = require('./controllers/place.controller');
const app = express()
const port = 3000


db.mongoose.connect('mongodb://localhost:27017/Test');

require('./routes/place.route')(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
