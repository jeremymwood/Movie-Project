"use strict";

// const reviewObj = {
//     restaurant_id: 1,
//     name: 'Jeremy',
//     rating: 5,
//     comments: "first review"
// };
const url = 'https://round-puffy-blizzard.glitch.me/movies';
// const options = {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(reviewObj),
// };
// fetch(url)
//     .then( response => console.log(response) ) /* review was created successfully */
//     .catch( error => console.error(error) ); /* handle errors */


// loading message function to disappear and show movie lists after 5 seconds
function startDelay(){
    setTimeout(function() {
        $('#loading').addClass('hide');
        getMovies();
    }, 2000);
}
startDelay();

//ajax request to get a listing of all movies
function getMovies () {
    $.get(url).done(function (data) {
        //do something with the data
        let movies= "";
        $.each(data, function(data,value){
            movies += `
           <div class="col">
                <div class="movieItem card bg-transparent border border-2 d-flex flex-row p-3 w-100 h-100" id="moveieItem${value.id}">
                    <div class="flex-grow-1 pe-3">
                        <div class="cardTitle fs-5 fw-bolder">${value.title}</div>
                        <div>Rating: ${value.rating}/10</div>
                        <div>Genre: ${value.genre}</div>
                        <div>Director: ${value.director}</div>
                        <div>Staring:${value.staring}</div>
                        <div class="fst-italic">"${value.tagline}"</div>
                    </div>
                    <div class="controls d-flex flex-column">
                        <button type="button" class="btn" >
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                        <button type="button" class="btn mb-2" data-bs-toggle="modal" data-bs-target="#editMovieModal">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                    </div>
                </div>
            </div>
            `;
        })
        $("#movieContent").html(movies);
    });
}

//add movie button functionality
// $("#addMovieBtn").click(function(){
//
// });

//submit button functionality for new movies
$("#addMoviesSubmitBtn").click(function(event){
    event.preventDefault();
    console.log("working");
    const  movie = {
        title: $("#mtitle").val(),
        rating: $("#mrating").val()
    };
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie),
    };
    fetch(url,options)
        .then(function(response){
            // let movieTitle = document.getElementById('mtitle').value;
            // let movieRating = document.getElementById('mrating').value;
            // addMovie(movieTitle,movieRating);
        });

});

//submit button functionality for editing movies
$("#editMoviesSubmitBtn").click(function(event){
    event.preventDefault();
    console.log("working");

});

//delete button functionality for deleting movie cards
$("#deleteBtn").click(function(){
    // event.preventDefault();
    console.log("working");
    // $(this).parents("#movieContent").hide();
});

//search bar functionality
$("#searchBtn").click(function(event){
    console.log("working");
    let input = document.getElementById("searchInput").value;
    input.toLowerCase();
    let movieTitles = document.getElementsByClassName("movieTitles");
    for (let i = 0; i < movieTitles.length; i++) {
        if(!movieTitles[i].innerHTML.toLowerCase().includes(input)){
            movieTitles[i].style.display = "none";
        }else {
            movieTitles[i].style.display = "block";
        }
    }
});

//filter functionality
$("#titleFilter").click(function(){
    console.log("working");
    let sortedCards = $(".movieCards").sort(function(a,b){
        return $(a).find(".movieTitles").text().localeCompare()($(b).find(".movieTitles").text());
    })
    $("#movieContent").remove(".movieCards").append(sortedCards);
});
$("#ratingFilter").click(function(){
    console.log("working");
});
$("#genreFilter").click(function(){
    console.log("working");
});

// function to add a movie; possibly useful later
// function addMovie(inputTitle, inputRating){
//     let movie = {};
//     let lastID = movies.length;
//     movie.id = lastID+1;
//     movie.title = inputTitle;
//     movie.rating = inputRating;
//     console.log(movie);
//     $("#movieContent").prepend($("movie"));
// }

//edit modal functionality
let editModal = document.querySelector("#editMovieModal");
let editModalBtn = document.querySelector("#editMoviesSubmitBtn");

// $('.card').hover(.css('color', random_color));
var hexArray = ['#hexVal','#hexVal','#hexval', '#hexval']
var randomColor = hexArray[Math.floor(Math.random() * hexArray.length)];

$("#divId").css("color",randomColor); //A class selector would work too
$("#divId").css("color",randomColor); //A class selector would work too
