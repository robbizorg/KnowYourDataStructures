// NEED ABOUT, APPLICATIONS, AND COSTS TO BE DEFINED IN OTHER JS FILE

var p = document.getElementById("text");
p.innerHTML = about;
var pState = "about";

var aboutBox = document.getElementById("about");
var costsBox = document.getElementById("costs");
var applicationsBox = document.getElementById("applications");
var algorithmsBox = document.getElementById("algorithms");

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

algorithmsBox.addEventListener("click", function aboutHandler() {
  if (pState !== "algorithms") {
    pState = "algorithms";
    p.innerHTML = algorithms;

    var dist = document.getElementById("distBtn");
    dist.addEventListener("click", function distHandler() {
      var source = document.getElementById("distSource");
      var target = document.getElementById("distTarget");
      var result = getDijkstras(source.value, target.value);

      $(".regDist").append("<p>Distance between " + source.value + " and " + target.value + ": " + result.dist + "</p>");

    });

    var distHelp = document.getElementById("distBtn2");
    distHelp.addEventListener("click", function distHelpHandler() {
      var source = document.getElementById("distSource2").value;
      var target = document.getElementById("distTarget2").value;
      var tableArr = doDijkstras(source, target);

      $(".helpDist").append(tableArr[0]);
    });
  }
});