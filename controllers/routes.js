// db models
let db = require("../models");

// Scrapping tools
let axios = require("axios");
let cheerio = require("cheerio");

let comments = [];

// routes (HTML + API)
module.exports = function (app) {
    // Route for getting all the articles in database
    app.get("/", function(req, res) {
        // find all articles in database
        db.Article.find({})
        .then(function(dbArticle) {
            let hbsObj = {
                articles: dbArticle,
                comments: comments
            };
            console.log(dbArticle);
            // render the handlebar index with the object hbsObj
            res.render("index", hbsObj);
        })
    });

    // Route for scraping the target webpage
    app.get("/scrape", function(req, res) {
        // grab the html body with axios
        axios.get("https://news.ycombinator.com/").then(function(response) {
            // load the html body into cheerio
            let $ = cheerio.load(response.data);

            // grap article title and the link
            $(".storylink").each(function () {
                let result = {};

                // add title and the link to the result
                result.title = $(this).text();
                result.link = $(this).attr("href");

                // create a new article if this article is not in db
                db.Article.findOne(result)
                .then(function(dbArticle) {
                    if (dbArticle) {
                        console.log("The item '" + result.title + "' is already in database");
                    } else {
                        let artile = new db.Article(result);
                        artile.save().then(function(savedArticle) {
                            console.log("saved: ")
                            console.log(savedArticle);
                        }).catch(function(err) {
                            console.log("ERROR: " + err);
                        });
                    }
                })
            })

            res.redirect("/");
        })
    });

    // get all comments
    app.get("/comments/:id", function(req, res) {
        console.log(req.params.id);
        db.Comment.find({article: req.params.id})
        .then(function(dbComments) {
            console.log(dbComments);
            comments = dbComments;

            res.redirect("/");
        })
    })

    // post comment
    app.post("/api/comment", function(req, res) {
        console.log(req.body);
        db.Comment.create(req.body)
        .then(function(dbComment) {
            console.log(dbComment)

            res.redirect("/");
        })
        .catch(function(err) {
            console.log(err);
        });
    })
}