const express = require("express");
const connectDB = require("./config/db");
const fileupload = require('express-fileupload');
var cors = require('cors')
var path = require('path');
//criando servidor
const app = express();
app.use(cors())
//conecar a db

connectDB();

app.use(fileupload({
  useTempFiles: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: false }));



app.use("/api/users", require("./routes/users"));
app.use("/api/login", require("./routes/auth"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/comments", require("./routes/comments"));

//subir server

app.listen(process.env.APP_PORT, () => {
  console.log(`Servidor correndo na porta ${process.env.APP_PORT}`);
});
