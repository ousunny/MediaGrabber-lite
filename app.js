const express = require('express');
const app = express();

const indexRoutes = require('./routes/index');

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));

app.use('/', indexRoutes);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
