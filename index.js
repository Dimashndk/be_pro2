require("dotenv").config({ path: `${__dirname}/.env` });

const express = require("express");
const db = require("./models");
const routes = require ("./routes")

const PORT = 8000;
const app = express()

app.use(express.json());

// serving static files
// app.use("/static", express.static("Public"));

app.use("/api/auth", routes.auth);
// app.use("/api/profile", routes.profile);
// app.use("/api/tweet", routes.blog);

db.sequelize
  .authenticate()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`app start on localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("failed to connect DB");
    console.error(error);
  });