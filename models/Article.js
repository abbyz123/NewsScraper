let mongoose = require("mongoose");

// Schema constructor
let Schema = mongoose.Schema;

// Create a Schema object
let articleSchema = new Schema({
    // title
    title : {
        type: String,
        required: true
    },
    // link
    link : {
        type : String,
        required : true
    },
});

// Article model
let Article = mongoose.model("Article", articleSchema);

// Export the Article model
module.exports = Article;