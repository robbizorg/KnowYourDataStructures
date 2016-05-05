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

var algorithms = "<div class='algCon'><h3>Dijkstras</h3>" + 
"     <div class='row' id='text'>" +
        "<h4>Find Distance between Two Nodes</h4>" + 
        "<input id='distSource' type='text' placeholder='Source'>&nbsp" +
        "<input id='distTarget' type='text' placeholder='Target'>&nbsp" +
        "<button class='btn' id='distBtn'>Find Distance</button>" +
        "<p>Distance between " + source.value + " and " + target.value + ": " + result.dist + "</p>" + 
     "</div>" + 
"<p>Where to even beigin with this amazing algorithm. Dijkstra's finds the shortest " +
"distance between two points in a, dare I say, greedy way. In the beginning, the algorithm " +
"first sets all nodes' known fields to false, their previous or path fields to null, and their distance fields " +
"to infinity (or in our case a negative number).</p><p>Then starting at a specified node, the algorithm sets the current " +
"node's known field to true, looks at all the adjacent nodes, and then sets their distance fields to the distance between " +
"the current node and themselves. After the distance, the algorithm then sets their path field to the current node. " +
"The next unknown node that is the shortest distance away is then the one that is selected next, and the process repeats itself " +
"until all nodes are known.</p>" + 

"<h3>Topological Sort</h3><h3>Minimum Spanning Trees</h3></div>";

    p.innerHTML = algorithms;
    });
  }
});