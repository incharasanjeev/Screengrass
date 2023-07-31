const express = require('express');
const app = express();
const port = 8000;
const mongoDB = require('./db');
mongoDB();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


app.use(express.json());
app.use('/api', require("./Routes/creaeUser"));
app.use('/addTask', require("./Routes/AddTask"));
app.use('/getTask', require("./Routes/GetTask"));
app.use('/findTask', require("./Routes/findtask"));
app.use('/deleteTask', require('./Routes/deleteTask'));
app.use('/updateTask', require('./Routes/Update'));

app.get('/', (req, res) => {
  res.send('Hello World!');
})


app.listen(port, () => {
  console.log(`Your server is started and running on prot no ${port}`);
})