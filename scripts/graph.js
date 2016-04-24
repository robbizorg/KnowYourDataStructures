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
			if (nodes.length > 1) {
				links.push({"source": (nodes.length - 2) , "target": (nodes.length - 1)})
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
realGraph.newNode("tim");
console.log(realGraph.nodes);
console.log(realGraph.links);

var force = d3.layout.force()
    .charge(-120)
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
      .style("stroke", "black")
      .style("stroke-width", 1);

  var node = svg.selectAll(".node")
  	.data(realGraph.nodes)
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", 25)
      //.style("fill", function(d) { return color(d.group); })
      .style("fill", "black")
      .call(force.drag);

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  });

setTimeout(function addNode() {
  force.stop();

  realGraph.newNode("rob");
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
    .enter().append("line")
      .attr("class", "link")
      .style("stroke", "black")
      .style("stroke-width", 1)

  node
    .data(realGraph.nodes)
    .enter().append("circle")
    .attr("class", "node")
    .attr("r", 25)
    .style("fill", "black")
    .attr("cx", force.nodes()[force.nodes().length - 1].x)
    .attr("cy", force.nodes()[force.nodes().length - 1].y)
    .call(force.drag);

   console.log(force.nodes());
   console.log(force.links());
   console.log(force.nodes()[force.nodes().length - 2]);

  force.on("tick", function() {
    d3.selectAll(".link").attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    d3.selectAll(".node").attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  });

}, 3000);

