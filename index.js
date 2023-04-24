const connectToMongo = require("./db");
const express = require('express')
var cors = require('cors')
const path=require('path')


connectToMongo();
const app = express()
const port =process.env.port ||5000

//Middleware
app.use(express.json())
app.use(cors())
app.use('/public',express.static(path.join(__dirname,'public')))

app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

//Available Routes
app.use("/api/user", require('./routes/User'))
app.use("/api/auth",require('./routes/auth'))
app.use("/api/v1/media",require('./routes/media'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
