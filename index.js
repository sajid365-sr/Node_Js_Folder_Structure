/** @format */

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const dbConnect = require("./utils/dbConnect");
const toolsRoute = require("./routes/v1/tools.route");
const viewCount = require("./middleware/viewCount");
const errorHandler = require("./middleware/ErrorHandler");

app.use(cors());
app.use(express.json());
// app.use(express.text());
app.use(express.static("public"));
app.set("View engine", "ejs");

// application level (Global) middleware
// app.use(viewCount);

// Db connection
dbConnect();
app.use("/api/v1/tools", toolsRoute);
app.use("/api/v1/user", );


// Default route
app.get("/", (req, res) => {
  // res.sendFile(__dirname + "/public/test.html")
  res.render("home.ejs", {
    id: 5,
    user: {
      name: 'test user'
    }
  })
});

// If user request unknown route  that doesn't exists
app.all("*", (req, res) => {
  res.send("No route found");
});

// Global error handler (handle by express)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


// Global error handler (if express can't handle/manually handle)
process.on("unHandleRejection", (error) => {
  console.log(error.name, error.message);
  app.close(() => {
    process.exit(1);
  });
});