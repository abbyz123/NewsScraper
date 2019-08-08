let articleId;

$(function() {
    $("#scrapeButton").on("click", function(event) {
        $.ajax("/scrape", {
            type : "GET"
        }).then(function() {
            console.log("scrape complete");
            location.reload();
        })
    })

    $(".commentButton").on("click", async function(event) {
        await $("#commentBox").css({
            "display" : "block"
        });
    })
})