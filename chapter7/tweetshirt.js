window.onload = function() {
	var button = document.getElementById("previewButton");
	button.onclick = previewHandler;
	makeImage();
}

function previewHandler() {
	var canvas = document.getElementById("tshirtCanvas");
	var context = canvas.getContext("2d");
	fillBackgroundColor(canvas, context);
	
	var selectObj = document.getElementById("shape");
	var index = selectObj.selectedIndex;
	var shape = selectObj[index].value;
	
	if (shape == "squares") {
		for (var squares = 0; squares < 20; squares++) {
			drawSquare(canvas, context);
		} 
	} else if (shape == "circles") {
		for (var circles = 0; circles < 20; circles++) {
			drawCircle(canvas, context);
		}
	}
	
	drawText(canvas, context);
	drawBird(canvas, context);
}

function drawSquare(canvas, context) {
	//set the fllStyle to "lightblue"
	context.fillStyle="lightblue";
	//calculate a random x position for the square inside the canvas
	var x = Math.floor(Math.random() * canvas.width);
	//calculate a random y position for the square inside the canvas
	var y = Math.floor(Math.random() * canvas.height);
	//calculate a random width for the square
	var w = Math.floor(Math.random() * 40)
	//draw a square at position x, y with width w
	context.fillRect(x,y,w,w);
}

function drawCircle(canvas, context) {
	var radius = Math.floor(Math.random() * 40);
	var x = Math.floor(Math.random() * canvas.width);
	var y = Math.floor(Math.random() * canvas.width);
	
	context.beginPath();
	context.arc(x, y, radius, 0, degreesToRadians(360), true);
	
	context.fillStyle = "lightblue";
	context.fill();
}

function fillBackgroundColor(canvas, context) {
    var selectObj = document.getElementById("backgroundColor");
    var index = selectObj.selectedIndex;
    var bgColor = selectObj.options[index].value;
    context.fillStyle = bgColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function updateTweets(tweets) {
	var tweetsSelection = document.getElementById("tweets");
	for (var i = 0; i < tweets.length; i++) {
		var tweet = tweets[i];
		var option = document.createElement("option");
		option.text = tweet.text;
		option.value = tweet.text.replace("\"", "'");
		tweetsSelection.options.add(option); 
	}
	
	tweetsSelection.selectedIndex = 0;
}

function degreesToRadians(degrees) {
	return (degrees * Math.PI)/180;
}

function drawText(canvas, context) {
    var selectObj = document.getElementById("foregroundColor");
    var index = selectObj.selectedIndex;
    var fgColor = selectObj[index].value;
    context.fillStyle = fgColor;
    context.font = "bold 1em sans-serif";
    context.textAlign = "left";
    context.fillText("I saw this tweet", 20, 40);
    
    // Get the selected tweet from the tweets menu 
    selectObj = document.getElementById("tweets");
    index = selectObj.selectedIndex;
    var tweet = selectObj[index].value;
    // Draw the tweet
    context.font = "1.2em italic serif"; 
    context.textAlign = "left";
    context.fillText(tweet, 30, 100);
    
    context.font = "bold 1em sans-serif";
    context.textAlign = "right";
    context.fillText("and all I got was this lousy t-shirt!",
        	canvas.width - 20, canvas.height - 40);
}

function drawBird(canvas, context) {
	var twitterBird = new Image();
	twitterBird.src = "twitterBird.png";
	
	twitterBird.onload = function() {
		context.drawImage(twitterBird, 20, 120, 70, 70);
	}
}

function makeImage() {
	var canvas = document.getElementById("tshirtCanvas");
    canvas.onclick = function () {
        window.location = canvas.toDataURL("image/png");
    };
}