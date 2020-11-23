const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const indexRoutes = require('./routes/index');

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));

app.use('/', indexRoutes);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
