//REQUIRED PACKAGES
require("dotenv").config();
//FILES NEEDED
var keys = require('./keys.js');
// NODE BUILT IN PACKAGES
var fs = require ('fs');
// NODE INSTALLED PACKAGES
var twitter = require('twitter');
var spotifyAccess = require ('node-spotify-api')
var request = require('request')
var spotify = new spotifyAccess(keys.spotify);
var client = new twitter(keys.twitter);
//==============================================================================================================
var argumentTwo = process.argv[2];

if(argumentTwo === "spotify-this-song"){  
  callSpotify();
}
if(argumentTwo === "my-tweets"){
  my_tweets();
}
if(argumentTwo === "movie-this"){
  movie_this();
}
if(argumentTwo === "do-what-it-says"){
  do_what_it_says();
}
//==============================================================================================================
//FUNCTIONS

function callSpotify (task){
  allArguments = process.argv;

  var songName = process.argv[3];

  if (allArguments.length === 3) {
    songName = "The Sign by Ace of Base";
  }

  if (typeof task !== 'undefined') {
    songName = task;
  }

  spotify.search({ type: 'track', query: songName }, function(err, data) {
    
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    // Check if a parameter was not passed in the movie_this function. If it was not, then set it to the task
  
  var songInfo = {
    artist: (data.tracks.items[0].artists[0].name),
    song:(data.tracks.items[0].name),
    album:(data.tracks.items[0].album.name),
    link:(data.tracks.items[0].preview_url)
  }
  console.log("Title: " + songInfo.song + "\n" + "Artist: " + songInfo.artist +  "\n" + "Album: " + songInfo.album + "\n" + "Preview Link: " + songInfo.link);
  });
}

function my_tweets(){
  var params = {screen_name: 'Veenauppalapati', count: 20};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log("hello twitter")
    console.log(tweets[0].text);
    console.log(tweets[0].created_at);
  }
  });
}


function movie_this(){
  allArguments = process.argv;
  var movie = process.argv[3];
  if (allArguments.length === 3) {
    movie = "Mr.+Nobody";
  }
  request(`http://www.omdbapi.com/?t=${movie}&y=&plot=short&apikey=trilogy`, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      body = (JSON.parse(body));
      var movieInfo = {
        Title: body.Title,
        Year: body.Year,
        imdbRating: body.imdbRating,
        // rottenTomatoesRating: body.Ratings[1].Value,
        country: body.Country,
        plot: body.Plot,
        actors: body.Actors
      }
      console.log(movieInfo);
    }
  });
}


function do_what_it_says () {
  
  // Then, we can use that variable to read:
  fs.readFile("random.txt", "utf8", (err, data) => {
        
    if (err){
      return console.log(err);
    }
    // We can do whatever we what to do with the data:
    // First, let's split the string and turn it into an array
    data = data.split(",");
    // Then, let's grab the action to do and the task to be done
    var action = data[0];
    var task = data[1];
    //  Now, let's check if the action is spotify-this-song or anything else using the switch statement:
    if (action === "spotify-this-song") {
      callSpotify(task);
    }
     
  });
}



