const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const collaboratorRoutes = require("./routes/collaboratorRoutes");
const moduleRoutes = require("./routes/moduleRoutes");
const photoRoutes = require("./routes/photoRoutes");
const path = require("path");
require("dotenv").config();

const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json());
app.use(cors());
app.use("/api/", authRoutes);
app.use("/api/collaborator", collaboratorRoutes)
app.use("/api/module", moduleRoutes);
app.use("/api/photo", photoRoutes);

app.get("/", (req, res) => {
    res.send("Brangwetan island API");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
