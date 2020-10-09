const express = require('express');

const app = express();

app.use(express.static('./dist/angular-crud-example'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/angular-crud-example/'}),
);

app.listen(process.env.PORT || 4200);