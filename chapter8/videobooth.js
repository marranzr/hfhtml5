var videos = {video1:"video/demovideo1", video2:"video/demovideo2"};
var effectFunction = null;

window.onload = function() {
	var video = document.getElementById("video");
	video.src = videos.video1 + getFormatExtension();
	video.load();
	
    var controlLinks = document.querySelectorAll("a.control");
    for (var i = 0; i < controlLinks.length; i++) {
         controlLinks[i].onclick = handleControl;
    }
    var effectLinks = document.querySelectorAll("a.effect");
    for (var i = 0; i < effectLinks.length; i++) {
        effectLinks[i].onclick = setEffect;
    }
    var videoLinks = document.querySelectorAll("a.videoSelection");
    for (var i = 0; i < videoLinks.length; i++) {
        videoLinks[i].onclick = setvideo;
    }
    pushUnpushButtons("video1", []);
    pushUnpushButtons("normal", []);
    
    video.addEventListener("ended", endedHandler, false);
    video.addEventListener("play", processFrame, false);
}

function handleControl(e) {
	var video = document.getElementById("video");
    var id = e.target.getAttribute("id");
    if (id == "play") {
        pushUnpushButtons("play", ["pause"]);
        if (video.ended) {
        	video.load();
        }
        video.play();
    } else if (id == "pause") {
        pushUnpushButtons("pause", ["play"]);
        video.pause();
    } else if (id == "loop") {
        if (isButtonPushed("loop")) {
            pushUnpushButtons("", ["loop"]);
        } else {
            pushUnpushButtons("loop", []);
        }
        video.loop = !video.loop;
    } else if (id == "mute") {
        if (isButtonPushed("mute")) {
            pushUnpushButtons("", ["mute"]);
        } else {
            pushUnpushButtons("mute", []);
        }
        video.muted = !video.muted;
    }
}

function setEffect(e) {
    var id = e.target.getAttribute("id");
    if (id == "normal") {
        pushUnpushButtons("normal", ["western", "noir", "scifi"]);
        effectFunction = null;
    } else if (id == "western") {
        pushUnpushButtons("western", ["normal", "noir", "scifi"]);
        effectFunction = western;
    } else if (id == "noir") {
        pushUnpushButtons("noir", ["normal", "western", "scifi"]);
    	effectFunction = noir;
    } else if (id == "scifi") {
        pushUnpushButtons("scifi", ["normal", "western", "noir"]);
    	effectFunction = scifi;
    }
}

function setvideo(e) {
    var id = e.target.getAttribute("id");
    var video = document.getElementById("video");
    if (id == "video1") {
        pushUnpushButtons("video1", ["video2"]);
    } else if (id == "video2") {
        pushUnpushButtons("video2", ["video1"]);
    }
    
    video.src = videos[id] + getFormatExtension();
    video.load();
    video.play();
    
    pushUnpushButtons("play", ["pause"]);
}

function pushUnpushButtons(idToPush, idarrayToUnpush) {
    if (idToPush != "") {
        var anchor = document.getElementById(idToPush);
        var theClass = anchor.getAttribute("class");
        if (!theClass.indexOf("selected") >= 0) {
            theClass = theClass + " selected";
            anchor.setAttribute("class", theClass);
            var newImage = "url(images/" + idToPush + "pressed.png)";
            anchor.style.backgroundImage = newImage;
        }
    }
    for (var i = 0; i < idarrayToUnpush.length; i++) {
        anchor = document.getElementById(idarrayToUnpush[i]);
        theClass = anchor.getAttribute("class");
        if (theClass.indexOf("selected") >= 0) {
            theClass = theClass.replace("selected", "");
            anchor.setAttribute("class", theClass);
            anchor.style.backgroundImage = "";
        }
    }
}

function isButtonPushed(id) {
    var anchor = document.getElementById(id);
    var theClass = anchor.getAttribute("class");
    return (theClass.indexOf("selected") >= 0);
}

function getFormatExtension() {
	var video = document.getElementById("video");
	if (video.canPlayType("video/mp4") != "") {
		return ".mp4";
	} else if (video.canPlayType("video/webm") != "") {
		return ".webm";
	}else if (video.canPlayType("video/ogg") != "") {
		return ".ogv";
	}
}

function endedHandler() {
	pushUnpushButtons("", ["play"]);
}

function processFrame() {
	var video = document.getElementById("video");
	if (video.paused || video.ended) {
		return;
	}
	var bufferCanvas = document.getElementById("buffer");
	var displayCanvas = document.getElementById("display");
	
	var buffer = bufferCanvas.getContext("2d");
	var display = displayCanvas.getContext("2d");
	
	buffer.drawImage(video, 0, 0, bufferCanvas.width, bufferCanvas.height);
	var frame = buffer.getImageData(0, 0, bufferCanvas.width, bufferCanvas.height);
	
	var length = frame.data.length / 4;
	
	for (var i = 0; i < length; i++) {
		var r = frame.data [i * 4 + 0];
		var g = frame.data [i * 4 + 1];
		var b = frame.data [i * 4 + 2];
		if (effectFunction) {
			effectFunction(i,r,g,b,frame.data);
		}
	}
	
	display.putImageData(frame, 0, 0);
	
	setTimeout(processFrame, 0);
}

function noir(pos, r, g, b, data) {
	var brightness = (3*r + 4*g + b) >>> 3;
	if (brightness < 0) brightness = 0;
	data[pos*4 + 0] = brightness;
	data[pos*4 + 1] = brightness;
	data[pos*4 + 2] = brightness;
}

function western(pos, r, g, b, data) {
    var brightness = (3*r + 4*g + b) >>> 3;
    data[pos * 4 + 0] = brightness+40;
    data[pos * 4 + 1] = brightness+20;
    data[pos * 4 + 2] = brightness-20;
}

function scifi(pos, r, g, b, data) {
    var offset =  pos * 4;
    data[offset] = Math.round(255 - r) ;
    data[offset+1] = Math.round(255 - g) ;
    data[offset+2] = Math.round(255 - b) ;
}