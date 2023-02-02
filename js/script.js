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
            <div class="movieItem">
                <div>
                    <div class="fs-5">${value.title}</div>
                    <div>${value.director}</div>
                    <div>${value.rating}</div>
                    <div>${value.genre}</div>
                    <div>${value.id}</div>
                    <div>${value.tagline}</div>
                    <div class="pb-3">${value.staring}</div>
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









