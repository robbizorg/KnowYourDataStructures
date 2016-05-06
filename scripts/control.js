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

if ($(document).find("title").text() == "Graph") {
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
      $(".dijkHead").remove();
      $("#dijkTable").remove();
      var source = document.getElementById("distSource2").value;
      var target = document.getElementById("distTarget2").value;
      var tableArr = doDijkstras(source, target);
      var currentStep = 0;

      $(".helpDist").append("<div class='row dijkHead' id='steps'><h4>Results: </h4>" + 
        "<button class='btn' id='prevStep'>Previous Step</button>" +
        "<button class='btn' id='nextStep'>Next Step</button>" +
     "</div>");
      $(".helpDist").append(tableArr[currentStep]);

      var prev = document.getElementById("prevStep");
      prev.addEventListener("click", function prevHandler() {
        if (currentStep != 0) {
          $("#dijkTable").remove();
          $(".helpDist").append(tableArr[--currentStep]);
        }
      });

      var next = document.getElementById("nextStep"); 
      next.addEventListener("click", function nextHandler() {
        if (currentStep != (tableArr.length - 1)) {
          $("#dijkTable").remove();
          $(".helpDist").append(tableArr[++currentStep]);
        }
      });
    });
  }
});
}