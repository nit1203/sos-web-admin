const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
// app.get('/payment-card', function (req, res) {
//     res.sendFile(path.join(__dirname, 'dist', 'paymet-card'));
// });
// app.get('/payment-upi', function (req, res) {
//     res.sendFile(path.join(__dirname, 'dist', 'payment-upi'));
// });

app.listen(5400, () => {
    console.log("App running on " + 5400)
});