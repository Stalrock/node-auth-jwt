const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const mongoConnect = require("./config.mongoose");
const PORT = process.env.PORT || 3000;

dotenv.config();

//Import routes
const authRoute = require("./src/routes/auth");
const postRoute = require("./src/routes/post");

//Middlewares
app.use(cors());
app.use(express.json());
//Routes Middlewares
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);

//Connexion à MongoDB
mongoConnect();

//Listen port :PORT
app.listen(PORT, () => console.info("Server has started on " + PORT));