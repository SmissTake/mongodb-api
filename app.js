const express = require('express');
const db = require('./models/index');
const app = express()
const port = 3000
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    info: {
      title: 'Urbex API',
      version: '1.0.0',
      description: 'Urbex API with express',
    },
    host: 'localhost:3000',
    basePath: '/',
  },
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
  apis: ['./routes/*.js'],
};

const specs = swaggerDocument(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

db.mongoose.connect('mongodb://localhost:27017/urbex');

require('./routes/place.route')(app);
require('./routes/user.route')(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
