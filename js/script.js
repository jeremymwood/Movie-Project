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
    }, 1000);
}
startDelay();

//ajax request to get a listing of all movies
function getMovies () {
    $.get(url).done(function (data) {
        //do something with the data
        let movies= "";
        $.each(data, function(data,value){
            movies += `
            <div class="movieItem card border-dark d-flex flex-row m-2 p-2" id="moveieItem${value.id}">
                <div class="flex-grow-1">
                    <div class="card-header fs-5 fw-bolder">${value.title}</div>
                    <div>Rating: ${value.rating}/10</div>
                    <div>Genre: ${value.genre}</div>
                    <div>Director: ${value.director}</div>
                    <div>Staring:${value.staring}</div>
                    <div class="fst-italic">"${value.tagline}"</div>
                </div>
                <div class="controls ps-2 m-2">
                    <i class="fa-solid fa-xmark flex-grow-1"></i>
                    <i class="fa-solid fa-pen"></i>
                </div>
            </div>
            `;
        })
        $("#movieContent").html(movies);
    });
}

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









