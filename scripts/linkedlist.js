var linkedList = function ll() {
	return;
};

var about = "Linked Lists are a Data Structure that typically stores data " +
	"that does not need to be accessed immediately.";

var applications = "A linked list can be used to implement a stack, keep track" +
	"of other data."; 

var costs = "Insert: O(1)";

var p = document.getElementById("text");
p.innerHTML = about;
var pState = "about";

var aboutBox = document.getElementById("about");
var costsBox = document.getElementById("costs");
var applicationsBox = document.getElementById("applications");

aboutBox.addEventListener("click", function aboutHandler() {
	if (pState !== "about") {
		pState = "about";
		p.innerHTML = about;
	}
});

costsBox.addEventListener("click", function aboutHandler() {
	if (pState !== "costs") {
		pState = "costs";
		p.innerHTML = costs;
	}
});

applicationsBox.addEventListener("click", function aboutHandler() {
	if (pState !== "about") {
		pState = "applications";
		p.innerHTML = applications;
	}
});



