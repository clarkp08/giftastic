

var shows = ["Ray Donovan", "Breaking Bad", "Game of Thrones", "Ozark"];

function displayGif() {
  $(".gif-view").empty();
  var show = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=f241e457e606453891a30c097ff16e6c&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    for (i = 0; i < response.data.length; i++) {
      var gifObject = response.data[i];
      var animatedGif = gifObject.images.fixed_height.url;
      var pausedGif = gifObject.images.fixed_height_still.url;
      var ratingGif = gifObject.rating;
      $(".gif-view").append("<div class='gif-display'>");
      var gifHeader = $("<h3>").text("Rating: " + ratingGif).addClass("rating-header");
      var gif = $("<img>").attr("src", pausedGif).attr("data-paused", pausedGif).attr("data-animated", animatedGif).addClass("gif-hover");
      $(".gif-display").last().append(gifHeader, gif);
    }
  });
}

function renderButtons() {
  $("#buttons-view").empty();

  for (var i = 0; i < shows.length; i++) {
    var a = $("<button>");
    a.addClass("show");
    a.attr("data-name", shows[i]);
    a.text(shows[i]);
    $("#buttons-view").append(a);
  }
}

$(".add-show").on("click", function(event) {
  event.preventDefault();
  var show = $(".searchForm").val().trim();
  if (shows.indexOf(show.toLowerCase()) === -1) {
    shows.push(show.toLowerCase());
    renderButtons();
  }
});

$(document).on("click", ".show", displayGif);
$(document).on("mouseover", ".gif-hover", function() {
  $(this).attr("src", $(this).data("animated"));
});
$(document).on("mouseleave", ".gif-hover", function() {
  $(this).attr("src", $(this).data("paused"));
});
renderButtons();

