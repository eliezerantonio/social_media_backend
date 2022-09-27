const express = require("express");
const connectDB = require("./config/db");
const fileupload = require('express-fileupload');

//criando servidor
const app = express();

//conecar a db

connectDB();

app.use(fileupload({
  useTempFiles: true
}));

app.use('/uploads', express.static('uploads'));
app.use(express.json({ extended: true }));



app.use("/api/users/", require("./routes/users"));
app.use("/api/auth/", require("./routes/auth"));
app.use("/api/posts/", require("./routes/posts"));
app.use("/api/comments/", require("./routes/comments"));

//subir server

app.listen(process.env.APP_PORT, () => {
  console.log(`Servidor correndo na porta ${process.env.APP_PORT}`);
});
