$(document).ready(function(){
    const thememusic= new Audio("assets/bobs-burgers-ringtone.mp3");
    var musicplaying= false;
    var results;

    $("#soundbutton").on("click", function(){
        if (musicplaying == false) {
            thememusic.play();
            musicplaying=true;

        }
        else {
            thememusic.pause();
            musicplaying = false;
        }
    });
})


$("button").on("click", function(){
    var person=$(this).attr("data-person");
    var queryURL="https://api.giphy.com/v1/gifs/search?q=" + person +"&apikey=LNU9vZ1fEnoueTGgvpqZzKf0BLy1uK8Z";
    $.ajax({
        url: queryURL,
        method:"GET"
    })
    .then(function(response) {
        var results = response.data;
        for (var i= 0; i < results.length; i++) {
            var gifDiv=$("<div>");
            var rating= results[i].rating;
            var p= $("<p>").text("Rating: " + rating);
            var personImage= $("<img>");
            personImage.attr("src", results[i].images.fixed_height.url);
            personImage.attr("data-state", "still");
            personImage.attr("data-position", i);
            gifDiv.prepend(p);
            gifDiv.prepend(personImage);
            $("#gifs").prepend(gifDiv);
        }
    });
});

$("#gif").on("click", function(){
    var state=$(this).attr("data-state");
    var position=$(this).attr("data-position");
    position= parseInt(position);
  if (state === "still") {
        $(this).attr("src", results[position].images.fixed_height.url);
        $(this).attr("data-state","animate");
      } else {
        $(this).attr("src", results[position].images.fixed_height.url);
        $(this).attr("data-state","still");
      
      }
})