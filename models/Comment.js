let mongoose = require("mongoose");

// Schema constructor
let Schema = mongoose.Schema;

// Create a Schema object
let commentSchema = new Schema({
    // title
    title : String,
    // Name
    name : String,
    // link
    body : String,
    // article id
    article : {
        type: Schema.Types.ObjectId,
        ref: "Article"
    }
});

// Comment model
let Comment = mongoose.model("Comment", commentSchema);

// Export the Article model
module.exports = Comment;