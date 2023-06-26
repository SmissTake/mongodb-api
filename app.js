require('dotenv').config();
const express = require('express');
const db = require('./models/index');
const app = express()
const port = process.env.PORT;
const mongo_url = process.env.MONGO_URL;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Urbex API',
      version: '1.0.0',
      description: 'Urbex API with express',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Serveur de production'
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerDocument(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/uploads', express.static('uploads'));
db.mongoose.connect(mongo_url);

require('./routes/place.route')(app);
require('./routes/user.route')(app);

app.listen(port, () => {
  console.log(`API listening on port ${port}`)
})
