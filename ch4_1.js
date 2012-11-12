function getNextShowing(movie) {
    var now = new Date().getTime();
    for (var i = 0; i < movie.showtimes.length; i++) {
        var showtime = getTimeFromString(movie.showtimes[i]);
        if ((showtime - now) > 0) {
            return "Next showing of " + movie.title + " is " + movie.showtimes[i];
        }
    }
    return null;
}
function getTimeFromString(timeString) {
    var theTime = new Date();
    var time = timeString.match(/(\d+)(?::(\d\d))?\s*(p?)/);
    theTime.setHours( parseInt(time[1]) + (time[3] ? 12 : 0) );
    theTime.setMinutes( parseInt(time[2]) || 0 );
    return theTime.getTime();
}

function Movie(title, genre, rating, showtimes) {
	this.title = title;
	this.genre = genre;
	this.rating = rating;
	this.showtimes = showtimes;
	this.getNextShowing = function() {
       var now = new Date().getTime();
       for (var i = 0; i < this.showtimes.length; i++) {
          var showtime = getTimeFromString(this.showtimes[i]);
          if ((showtime - now) > 0) {
              return "Next showing of " + this.title + " is " + this.showtimes[i];
          }
       }
       return null;
   };
}

function init () {
	var movie1 = new Movie("Plan 9 from Outer Space","Cult Classic",5,["3:00pm", "7:00pm", "11:00pm"]);
    var movie2 = new Movie("Forbidden Planet","Classic Sci-fi",5,["5:00pm", "9:00pm"]);
	
	var nextShowing = movie1.getNextShowing();
	alert(nextShowing);
	nextShowing = movie2.getNextShowing();
	alert(nextShowing);
}

window.onload = init;