let express = require("express");
let logger = require("morgan");
let mongoose = require("mongoose");
let path = require("path");

let PORT = 3000;

// Initialize Express
let app = express();

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/hackernews", { useNewUrlParser: true });

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static content for the app from the "public" directory in the application directory.
app.use("/public", express.static(path.join(__dirname, "/public")));

// set handleboars
let exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

require("./controllers/routes")(app);

app.listen(PORT, function() {
    console.log("app listening on PORT " + PORT);
})