"use strict";

const url = 'https://round-puffy-blizzard.glitch.me/movies';
let allMovies;

// loading message function to disappear and show movie lists after 5 seconds
function startDelay(){
    setTimeout(function() {
        $('#loading').addClass('hide');
        getMovies();
        // console.log(allMovies);
    }, 500);

}
startDelay();


//ajax request to get a listing of all movies
function getMovies () {
    $.get(url).done(function (data) {
        // allMovies = data;
        //do something with the data
        allMovies = data;
        let movies= "";
        $.each(data, function(data,value){
            movies += `
           <div class="col">
                <div class="movieItem card bg-transparent border border-2 d-flex flex-row p-3 w-100 h-100" id="${value.id}">
                    <div class="flex-grow-1 pe-3">
                        <div class="cardTitle fs-5 fw-bolder">${value.title}</div>
                        <div class="cardRating">Rating: ${value.rating}/10</div>
                        <div class="cardGenre">Genre: ${value.genre}</div>
                        <div class="cardDirector">Director: ${value.director}</div>
                        <div class="cardStaring">Staring:${value.staring}</div>
                        <div class="cardTagline fst-italic">"${value.tagline}"</div>
                    </div>
                    <div class="controls d-flex flex-column">
                        <button type="button" class="btn closeButton" >
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                        <button type="button" class="btn mb-2 editMovieBtn" data-bs-toggle="modal" data-bs-target="#editMovieModal" data-id="${value.id}">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                    </div>
                </div>
            </div>
            `;

        })
        console.log(data);
        $("#movieContent").html(movies);
    });
}

//delete button functionality for deleting movie cards
$(document).on("click", '.closeButton', function(event){
    event.preventDefault();
    let thisCard = this.closest(".movieItem");
    let thisId = this.closest(".movieItem").id;
    // let json = {id: thisId};
    console.log(thisId);
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
    console.log("working");
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

function refreshPage(){
    window.location.reload();
}

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
    console.log(working);
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
    let typedMovie = $("#searchBar").val();
    let filteredMovies = [];
    for (let i = 0; i < allMovies.length; i++) {
        if (typedMovie === allMovies[i].title) { //and dropdown menu is title
            filteredMovies.push(allMovies[i]);
            // console.log(allMovies[i].title);
            // console.log(allMovies[i].id);
            // console.log(filteredMovies);
            // return allMovies[i].title;
            continue;
        }
        if (allMovies[i].title.includes(typedMovie)){
            filteredMovies.push(allMovies[i]);
            continue;
        }
        // function filterCards(data) {
        //     //do something with the data
        //     allMovies = data;
    }
    console.log(filteredMovies);
    let movies = "";
    $(filteredMovies).each(function(data,value) {
        // let filteredValues = "";
        // filteredValues += value;

        movies += `
           <div class="col">
                <div class="movieItem card bg-transparent border border-2 d-flex flex-row p-3 w-100 h-100" id="${value.id}">
                    <div class="flex-grow-1 pe-3">
                        <div class="cardTitle fs-5 fw-bolder">${value.title}</div>
                        <div class="cardRating">Rating: ${value.rating}/10</div>
                        <div class="cardGenre">Genre: ${value.genre}</div>
                        <div class="cardDirector">Director: ${value.director}</div>
                        <div class="cardStaring">Staring:${value.staring}</div>
                        <div class="cardTagline fst-italic">"${value.tagline}"</div>
                    </div>
                    <div class="controls d-flex flex-column">
                        <button type="button" class="btn closeButton" >
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                        <button type="button" class="btn mb-2 editMovieBtn" data-bs-toggle="modal" data-bs-target="#editMovieModal" data-id="${value.id}">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                    </div>
                </div>
            </div>
            `;
        console.log(movies);

        console.log(value);
    });
    $("#movieContent").html(movies);
});


//filter functionality
$("#titleFilter").click(function(){
    console.log("working");
});

$("#ratingFilter").click(function(){
    console.log("working");
});

$("#genreFilter").click(function(){
    console.log("working");
});