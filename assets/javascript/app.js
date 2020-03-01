$(document).ready(function(){
    var topics =["Bob Belcher","Linda Belcher", "Tina Belcher", "Gene Belcher", "Louise Belcher"];
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

    function arraybuttons(){
        $("#bobsbuttons").empty();
        for (var i=0; i<topics.length;i++) {
            var but= $('<button>');
            but.addClass("characterbtn");
            but.attr('data-person', topics[i]);
            but.text(topics[i]);
            $("#bobsbuttons").append(but);

        };
    };
    //code for making new button when more characters are added
    $("#addbutton").on("click", function(event){
        event.preventDefault();
        var newcharacter=$("#bobsinput").val().trim();
        topics.push(newcharacter);
        $("#bobsinput").val("");
        arraybuttons();
        console.log(topics);
    });
    arraybuttons();
});

//using some of the practice from class for this part of the code 
$(document).on("click",".characterbtn", function(){
    var person=$(this).attr("data-person");
    //adding limit of 10 gifs
    var queryURL="https://api.giphy.com/v1/gifs/search?q=" + person +"&apikey=LNU9vZ1fEnoueTGgvpqZzKf0BLy1uK8Z&limit=10";
    $.ajax({
        url: queryURL,
        method:"GET"
    })
    .then(function(response) {
        var results = response.data;
        for (var i= 0; i < results.length; i++) {
            var gifDiv=$("<div>");
            var gifView = results[i].images.fixed_height.url;
            var still =results[i].images.fixed_height_still.url;
            console.log(gifView);
            var rating= results[i].rating;
            var p= $("<p>").text("Rating: " + rating);
            var personImage= $("<img>");
            personImage.attr("src", still);
            personImage.attr("data-animate", gifView);
            personImage.attr("data-still", still);
            personImage.attr("data-state", 'still');
            gifDiv.prepend(p);
            gifDiv.prepend(personImage);
            $("#gifs").prepend(gifDiv);
    personImage.on('click', GifPlay);
        }
    });

function GifPlay() {
    var state=$(this).attr("data-state");
    console.log(state);
    // var position=$(this).attr("data-position");
    // position= parseInt(position);
  if (state === "still") {
        $(this).attr("src", $(this).data('animate'));
        $(this).attr("data-state","animate");
      } 
      else {
        $(this).attr("src", $(this).data('still'));
        $(this).attr("data-state","still");
      };
      };
// $("#addbutton").on("click", function(event){
//     event.preventDefault();
//     var newcharacter=$("#bobsinput").val().trim();
//     topics.push(newcharacter);
//     $("#bobsinput").val("");
//     arraybuttons();
//     console.log(topics);
// });
// arraybuttons();

});