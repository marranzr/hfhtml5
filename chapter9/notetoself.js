window.onload = init;

function init() {
	var button = document.getElementById("add_button");
	button.onclick = createSticky;
	
	var stickiesArray = getStickiesArray();
	
	for (var i in stickiesArray) {
		var key = stickiesArray[i];
		var value = JSON.parse(localStorage[key]);
		addStickyToDOM(key, value);
	}
	
}

function addStickyToDOM(key, stickyObj) {
	var stickies = document.getElementById("stickies");
	var sticky = document.createElement("li");
	sticky.setAttribute("id", key);
	
	sticky.style.backgroundColor = stickyObj.color;
	
	var span = document.createElement("span");
	span.setAttribute("class", "sticky");
	span.innerHTML = stickyObj.value;
	sticky.appendChild(span);
	stickies.appendChild(sticky);
	sticky.onclick = deleteSticky;
}

function createSticky() {
	var stickiesArray = getStickiesArray();
	var currentDate = new Date();
	var colorSelectObj = document.getElementById("note_color");
	var index = colorSelectObj.selectedIndex;
	var color = colorSelectObj[index].value;
	var time = currentDate.getTime();
	var key = "sticky_" + time;
	
	var value = document.getElementById("note_text").value;
	var stickyObj = {
		"value": value,
		"color":color
	};
	
	localStorage.setItem(key, JSON.stringify(stickyObj));
	stickiesArray.push(key);
	localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
	addStickyToDOM(key, stickyObj);
}

function getStickiesArray() {
	var stickiesArray = localStorage.getItem("stickiesArray");
	if (!stickiesArray) {
		stickiesArray = [];
		localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
	} else {
		stickiesArray = JSON.parse(stickiesArray);
	}
	return stickiesArray;
}

function deleteSticky(e) {
	var key = e.target.id;
	if (e.target.tagName.toLowerCase() == "span") {
		key = e.target.parentNode.id;
	}
	localStorage.removeItem(key);
	var stickiesArray = getStickiesArray();
	if (stickiesArray) {
		for (var i in stickiesArray) {
			if (key == stickiesArray[i]) {
				stickiesArray.splice(i, 1);
			}
		}
		
		localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
	}
	removeStickyFromDOM(key);
}

function removeStickyFromDOM(key) {
	var sticky = document.getElementById(key);
	sticky.parentNode.removeChild(sticky);
}
