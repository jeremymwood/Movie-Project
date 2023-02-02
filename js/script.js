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


//loading message function to disappear and show movie lists after 5 seconds
function startDelay(){
    setTimeout(function() {
            $('#loading').addClass('hide');
            getMovies();
    }, 5000);
}
$(window).load(startDelay());

//ajax request to get a listing of all movies
function getMovies () {
    $.get(url).done(function (data) {
        //do something with the data
        let movies= "";
        $.each(data, function(data,value){
            movies += `
            <div class="movieLists">
                <ul>
                    <li>${value.title}</li>
                    <li>${value.director}</li>
                    <li>${value.rating}</li>
                    <li>${value.genre}</li>
                    <li>${value.id}</li>
                    <li>${value.tagline}</li>
                    <li>${value.staring}</li>
                </ul>
            </div>
            `;
        })
        $("#movieContent").html(movies);
    });
}

//submit button functionality for new movies
$("#addMoviesSubmitBtn").click(function(){
    $(".movieList").append(`<ul>
            <li> ${$("#mtitle").val()}</li>
            <li>${$("#mrating").val()}</li>
            </ul>`)
}); //this doesnt work yet



