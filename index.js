const express = require("express");
const cors = require("cors");
const app = express();
const connectionDB = require("./database/db");
const girlsCute = require("./routes/girlsCute");
const girlsSexy = require("./routes/girlsSexy");
const path = require("path");
connectionDB();

app.set("view engine", "ejs");
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/v1/girls", girlsCute);
app.use("/api/v1/girls", girlsSexy);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server on listening port ${PORT}...`);
});
