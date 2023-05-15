"use strict";

//global variables
const url = 'https://round-puffy-blizzard.glitch.me/movies';
let allMovies;
let movies;
//comment
//reusable function for generating movie cards
function makeMovieCards(value){
   movies += `
           <div class="col">
                <div class="movieItem card bg-transparent text-white border border-2 d-flex flex-row p-3 w-100 h-100" id="${value.id}">
                    <div class="flex-grow-1 pe-3">
                        <div class="cardTitle fs-5 fw-bolder">${value.title} <i class="fa-solid fa-star"></i></div>
                        <div class="cardRating"><b>Rating:</b> ${value.rating}/10</div>
                        <div class="cardGenre"><b>Genre:</b> ${value.genre}</div>
                        <div class="cardDirector"><b>Director:</b> ${value.director}</div>
                        <div class="cardStaring"><b>Staring:</b> ${value.staring}</div>
                        <div class="cardTagline"><b>Tagline:</b> "<i>${value.tagline}</i>"</div>
                    </div>
                    <div class="controls d-flex flex-column">
                        <button type="button" class="btn closeButton" >
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                        <button type="button" class="btn mb-2 editMovieBtn" data-bs-toggle="modal" data-bs-target="#editMovieModal" data-id="${value.id}" >
                            <i class="fa-solid fa-pen"></i>
                        </button>
                    </div>
                </div>
            </div>
            `;
}

// loading message function to disappear and show movie lists after 5 seconds
function startDelay(){
    setTimeout(function() {
        $('#loading').addClass('hide');
        getMovies();
    }, 2000);
    setTimeout(function() {
        getMovies();
        $('footer').removeClass('d-none')
    }, 2500);
}
startDelay();

//ajax request to get a listing of all movies
function getMovies () {
    $.get(url).done(function (data) {
        allMovies = data;
        movies= "";
        $.each(data, function(data, value){
            makeMovieCards(value);
        })
        $("#movieContent").html(movies);
    });
}

//delete button functionality for deleting movie cards
$(document).on("click", '.closeButton', function(event){
    event.preventDefault();
    let thisCard = this.closest(".movieItem");
    let thisId = this.closest(".movieItem").id;
    thisCard.remove();
    const options = {
        method: 'DELETE',
    };
    fetch(url + "/" + thisId, options)
        .then(/* post was created successfully */)
        .catch(/* handle errors */);
});

//submit button functionality for adding movies
$("#addMoviesSubmitBtn").click(function(event) {
    event.preventDefault();
    const movie = {
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
    fetch(url, options)
        .then(function () {
            getMovies();
        }).then($("#addMovieModal").modal("toggle"));
});

//edit button functionality for editing movies
let working;
$("#movieContent").on("click", "button.editMovieBtn", function (event) {
    event.preventDefault();
    working = $(this).attr("data-id");
    $("#editmtitle").val(allMovies[working - 1].title);
    $("#editmrating").val(allMovies[working - 1].rating);
    $("#editmgenre").val(allMovies[working - 1].genre);
    $("#editmdirector").val(allMovies[working - 1].director);
    $("#editmstaring").val(allMovies[working - 1].staring);
    $("#editmtagline").val(allMovies[working - 1].tagline);
});

//submit button for editing movies
$("#editMoviesSubmitBtn").click(function(){
    $("#editmtitle").val();
    $("#editmrating").val();
    $("#editmgenre").val();
    $("#editmdirector").val();
    $("#editmstaring").val();
    $("#editmtagline").val();
    fetch(`https://round-puffy-blizzard.glitch.me/movies/${working}`, {
        method: "PATCH",
        body: JSON.stringify({
            title: document.querySelector('#editmtitle').value,
            rating: document.querySelector('#editmrating').value,
            genre: document.querySelector('#editmgenre').value,
            director: document.querySelector('#editmdirector').value,
            staring: document.querySelector('#editmstaring').value,
            tagline: document.querySelector('#editmtagline').value
        }),
        headers: {"Content-Type": "application/json"}
    }).then(function(){
        getMovies();
    }).then($("#editMovieModal").modal("toggle"))
        .catch(error => console.log(error));
});

// search bar functionality
$("#searchBarBtn").on("click",function() {
    // e.preventDefault();
    let typedMovie = $("#searchBar").val().toLowerCase();
    let searchedMovies = [];
    for (let i = 0; i < allMovies.length; i++) {
        if (typedMovie === allMovies[i].title.toLowerCase()) { //and dropdown menu is title
            searchedMovies.push(allMovies[i]);
            continue;
        }
        if (allMovies[i].title.toLowerCase().includes(typedMovie)){
            searchedMovies.push(allMovies[i]);
            continue;
        }
    }
    movies = "";
    $(searchedMovies).each(function(data,value) {
        makeMovieCards(value);
    });
    $("#movieContent").html(movies);
});


//title filter functionality
$("#titleFilter").click(function(){
    let filteredMoviesByTitle = allMovies.sort(function (a, b) {
        if (a.title < b.title) {
            return -1;
        }
        if (a.title > b.title) {
            return 1;
        }
        return 0;
    });
    movies = "";
    $(filteredMoviesByTitle).each(function(data,value) {
        makeMovieCards(value);
    });
    $("#movieContent").html(movies);
});

//rating filter functionality
$("#ratingFilter").click(function(){
    let filteredMoviesByRating = allMovies.sort(function (a, b) {
        if (a.rating < b.rating) {
            return -1;
        }
        if (a.rating > b.rating) {
            return 1;
        }
        return 0;
    });
    movies = "";
    $(filteredMoviesByRating).each(function(data,value) {
        makeMovieCards(value);
    });
    $("#movieContent").html(movies);
});

//genre filter functionality
$("#genreFilter").click(function(){
    let filteredMoviesByGenre = allMovies.sort(function (a, b) {
        if (a.genre < b.genre) {
            return -1;
        }
        if (a.genre > b.genre) {
            return 1;
        }
        return 0;
    });
    movies = "";
    $(filteredMoviesByGenre).each(function(data,value) {
        makeMovieCards(value);
    });
    $("#movieContent").html(movies);


});

//favorite click functionality
$(document).on("click", ".fa-star", function (event) {
    event.preventDefault();
    $(this).css('color', "var(--yellow)");
});
