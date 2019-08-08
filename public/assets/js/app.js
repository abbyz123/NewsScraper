let articleIdGlobal;
let articleTitleGlobal;

$(function () {
    $("#scrapeButton").on("click", function (event) {
        $.ajax("/scrape", {
            type: "GET"
        }).then(function () {
            console.log("scrape complete");
            location.reload();
        })
    })

    $(".showCommentsButton").on("click", function (event) {
        let articleId = $(this).parent().prev().attr("id");
        console.log(articleId);

        $.ajax("/comments/" + articleId, {
            type: "GET",
        }).then(function () {
            console.log("comments loaded");
            location.reload();
        })
    })

    $(".leaveCommentsButton").on("click", function (event) {
        $("#commentBox").css("display", "block");
        articleIdGlobal = $(this).parent().prev().attr("id");
        articleTitleGlobal = $(this).parent().prev().text();
        console.log(articleIdGlobal);

        $("#commentHeader").text("leaving comment for <" + articleTitleGlobal + ">");
    })

    $("#commentForm").on("submit", function (event) {
        event.preventDefault();

        let title = $("#commentForm [name=commentTitle]").val().trim();
        let name = $("#commentForm [name=commentAuthor]").val().trim();
        let body = $("#commentForm [name=commentBody]").val().trim();

        if (!title || !name || !body) {
            alert("fill all the blanks before submit your comments!");
        } else {
            $.ajax("/api/comment", {
                type: "POST",
                data: {
                    name,
                    title,
                    body,
                    article: articleIdGlobal
                }
            }).then(function () {
                location.reload();
            })
        }
    })
})