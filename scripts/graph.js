function node(svg) {

}

function edge(svg, source, target) {

}

function graph() {
	var nodes = [];
	var links = [];

	function newNode(element, source) {
		nodes.push({"element": element});

		if (source === undefined) {
      console.log(source);
			if (nodes.length > 1) {
				links.push({"source": (nodes.length - 2) , "target": (nodes.length - 1)});
			}
		} else {
      console.log(source);
      if (nodes.length > 1) {
        links.push({"source": parseInt(source), "target": (nodes.length - 1)})
      }
    }
	}

	return {
		nodes: nodes,
		links: links,
		newNode: newNode
	}
}

var realGraph = graph();
realGraph.newNode("chris");
realGraph.newNode("bob");
realGraph.newNode("tim", 0);
console.log(realGraph.nodes);
console.log(realGraph.links);

var force = d3.layout.force()
    .charge(-200)
    .linkDistance(100)
    .size([400, 400])
    .nodes(realGraph.nodes)
    .links(realGraph.links)
    .start();

var svg = d3.select(".linkedList").append('svg')
		.attr("height", 500)
		.attr("width", 500);

  var link = svg.selectAll(".link")
  	.data(realGraph.links)
    .enter().append("line")
      .attr("class", "link")

  var node = svg.selectAll(".node")
  	.data(realGraph.nodes)
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", 10)
      //.style("fill", function(d) { return color(d.group); })
      .call(force.drag);

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  });

function addNode(element, source) {
  force.stop();

  if (element === "" && source === "") {
    realGraph.newNode("element");   
  } else if (source === "") {
    realGraph.newNode(element);
  } else {
    realGraph.newNode(element, source)
  }
  
  console.log(realGraph.nodes);
  console.log(realGraph.nodes[realGraph.nodes.length - 1]);
  console.log(realGraph.links[realGraph.links.length - 1]);

  force.nodes(realGraph.nodes);
  force.links(realGraph.links);

  force.charge(-120)
    .linkDistance(100).start();

  console.log(force.nodes());

  link
    .data(realGraph.links)
    .enter().insert("line", ":first-child")
      .attr("class", "link")

  node
    .data(realGraph.nodes)
    .enter().append("circle")
    .attr("class", "node")
    .attr("r", 10)
    .attr("cx", force.nodes()[force.nodes().length - 1].x)
    .attr("cy", force.nodes()[force.nodes().length - 1].y)
    .call(force.drag);

  force.on("tick", function() {
    d3.selectAll(".link").attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    d3.selectAll(".node").attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  });
};

document.getElementById("itemBtn").addEventListener("click", function() {
  var source = document.getElementById("source");
  if (source.value == "") {
    addNode(document.getElementById("itemText").value);
  } else {
    addNode(document.getElementById("itemText").value, source.value);
  }

});