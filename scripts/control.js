// NEED ABOUT, APPLICATIONS, AND COSTS TO BE DEFINED IN OTHER JS FILE

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
  if (pState !== "applications") {
    pState = "applications";
    p.innerHTML = applications;
  }
});
