var linkedList = function ll() {
	function nodeClass(element, next) {
		return {
			element: element,
			next: next
		}
	};

	var head = nodeClass("head", null);
	var size = 0;

	var insert = function insertF(element) {
		var temp = head.next;
		head.next = nodeClass(element, temp);
		size++;
	};
 
	var remove = function removeF() {
		head.next = head.next.next;
		size--;
	}

	var printAll = function() {
		print(head.next);
	}

	var getSize = function sizef() {
		return size;
	}

	var getElements = function() {
		var elementArr = [];
		var currentNode = head.next;

		while (currentNode !== null) {
			elementArr.push(currentNode.element);
			currentNode = currentNode.next;
		}

		return elementArr;
	}

	// Private Functions
	var print = function printOne(node) {
		if (node !== null) {
			console.log(node.element);	
			printOne(node.next);		
		}
	}

	return {
		insert: insert,
		print: printAll,
		remove: remove,
		size: getSize,
		getElements: getElements
	}
};

function doublyLinkedList() {
	function nodeClass(element, next, prev) {
		return {
			element: element,
			next: next,
			prev: prev
		}
	};

	var head = nodeClass(null, null, null);
	var tail = nodeClass(null, null, head);
	head.next = tail;
	size = 0;

	var insertFront = function insertF(element) {
		var temp = head.next;
		head.next = nodeClass(element, temp, head);
		head.next.next.prev = head.next;
		size++;
	};

	var insertBack = function insertBack(element) {
		var temp = tail.prev;
		tail.prev = nodeClass(element, tail, temp);
		tail.prev.prev.next = tail.prev;
		size++;
	}
 
	var removeFirst = function removeF() {
		var temp = head.next;
		head.next = head.next.next;
		head.next.prev = head;
		size--;
		return temp.element;
	}

	var removeLast = function removeLast() {
		var temp = tail.prev;
		tail.prev = tail.prev.prev;
		tail.prev.next = tail;
		size--;
		return temp.element;
	}

	var printAll = function() {
		print(head.next);
		console.log(" ");
	}

	var print = function printOne(node) {
		if (node.next !== null) {
			console.log("CHECKING NODE");
			console.log(node.element);
			console.log(node.next);
			console.log(node.prev);	
			console.log("===========")
			printOne(node.next);		
		}
	}

	var peek = function p() {
		return tail.prev.element;
	}

	return {
		insertFront: insertFront,
		insertLast: insertBack,
		printAll: printAll,
		removeFirst: removeFirst,
		removeLast: removeLast,
		size: size,
		peek: peek
	}

}

/* Example Doubly Linked List when needed
function exampleDD() {
	var dd = doublyLinkedList();
	dd.insertFront("1");
	dd.insertFront("2");
	dd.insertFront("3");
	dd.insertFront("4");
	dd.insertFront("5");

	dd.removeLast();
	console.log(dd.size);
	dd.printAll();
}
*/

function queue() {
	var dl = doublyLinkedList();
	var size = 0;

	function enqueue(element) {
		dl.insertFront(element);
		size++;
	}

	function dequeue() {
		size--;
		return dl.removeLast();
	}

	function peek() {
		return dl.peek();
	}

	function getSize() {
		return size;
	}

	return {
		enqueue: enqueue,
		dequeue: dequeue,
		peek: peek,
		getSize: getSize
	}
}

/* Example Queue as Needed
function exampleQ() {
	var q = queue();

	q.enqueue("Hello!");
	q.enqueue("Goodbye");
	q.enqueue("I will be the last to come off!");
	q.enqueue("I will not come off");

	q.dequeue();
	q.dequeue();
	q.dequeue();
	console.log(q.peek());

	q.enqueue("I just was enqueued and pushed it off!");
	q.dequeue();
	console.log(q.peek());
}
*/

function graph() {
	var nodes = [];
	var links = [];
	var weighted = true;
	// Variable that Keeps track of amount of nodes added overall:
	var currentCount = 0;

	function newNode(element, source) {
		var node = {"element": element, "adjList": [], dist: -1, known: false, path: null, idx: currentCount};
		nodes.push(node);
		currentCount++;

		if (source === undefined) {
			if (nodes.length > 1) {
				//links.push({"source": (nodes.length - 2) , "target": (nodes.length - 1)});
			}
		} else {
      if (nodes.length > 1) {

        	// Find real source in array
        	var realSource = -1;
        	for (node in nodes) {
        		if (nodes[node].idx == source) {
        			realSource = node;
        			break;
        		} 
        	}
        	// Return function if nothing found
        	if (realSource < 0)
        		return;
        	if (weighted)
        		var link = {"source": parseInt(realSource), "target": (nodes.length - 1), "weight": Math.round(Math.random()*100)};
        	else
        		var link = {"source": parseInt(realSource), "target": (nodes.length - 1)};
      		links.push(link);
      		nodes[link.source].adjList.push(links[links.length - 1]);
      }
    }

  }
  
  function addLink(source, target, weight) {
    if (source === undefined || target === undefined) {
      return undefined;
    } else {
    	// Find Source
    	var realSource = -1;
    	for (node in nodes) {
    		if (nodes[node].idx == source) {
    			realSource = node;
    			console.log("YES");
    			console.log(realSource + " " + source);
    			break;
    		}
    	}

    	// Find Target
    	var realTarget = -1;
    	for (node in nodes) {
    		if (nodes[node].idx == target) {
    			realTarget = node;
    			console.log(realTarget + " " + target);
    			break;
    		}
    	}

    	if (realTarget < 0 || realSource < 0)
    		return;

    	if (weighted) {
    		if (weight !== undefined || weight !== "") {
    			var link = {"source": parseInt(realSource), "target": parseInt(realTarget), "weight": parseInt(weight)};
    		}
    		else {
    			var link = {"source": parseInt(realSource), "target": parseInt(realTarget), "weight": Math.round(Math.random()*100)};
    		}
    	}
    	else {
    		var link = {"source": parseInt(realSource), "target": parseInt(realTarget)};
    	}
     	links.push(link);
     	nodes[link.source].adjList.push(link);
    }
  }

  function remove(source) {
    if (source === undefined || source === "") {
      console.err("REMOVE ERR: No source provided");
    } else {
      var index = parseInt(source);
      var realIdx = -1;

      // Find the Actual Node Index
      for (node in nodes) {
      	if (nodes[node].idx == index)
      		realIdx = parseInt(node);
      }
      if (realIdx < 0)
      	return;

      if (realIdx > -1) {
        for (var link = 0; link < links.length; link++) {
          if (links[link].source.index == realIdx || links[link].target.index == realIdx) {
            links.splice(link, 1);
            link--;
          }
        }

        // DELETING ACTS VERY VERY STANGELY
        for (node in nodes) {
        	for (nd in nodes[node].adjList) {
        		if (nodes[node].adjList[nd] == realIdx) {
        			console.log(nodes[node].adjList);
        			nodes[node].adjList.splice(nd, 1);
        			console.log(nodes[node].adjList);
        		}
        	}
        }

        for (node in nodes)
        	console.log(nodes[node].idx + " " + node);
        nodes.splice(realIdx, 1);

        for (node in nodes)
        	console.log(nodes[node].idx + " " + node);
      }
    }
  }

  function checkKnown() {
  	for (node in nodes) {
  		console.log(nodes[node].known);
  	}
  	for (node in nodes) {
  		if (!nodes[node].known) {
  			console.log("it's false");
  			return false;
  		}
  	}
  	console.log("Checking CHECK KNOWN AS TRUE");
  	return true;
  }

  // Graph Algorithms
  function dijkstras(start) {
    if (weighted != true) {
      return false;
    } else {

      //q = queue();
      // Need to implement Binary Heap for this to work ^^
      for (node in nodes) {
      	nodes[node].dist = -1;
      	nodes[node].known = false;
      	nodes[node].path = null;     	
      }

      nodes[start].dist = 0;
      var q = [];
      q.push(nodes[start]);

      while (!checkKnown()) {
      	// Find min vertex distance in array
      	console.log("Starting Iteration");
      	var min = -1;
      	var minIdx = -1;
      	for (node in q) {
      		if (min < 0 && !q[node].known) {
      			min = q[node].dist;
      			minIdx = node;
      		} else if (q[node].dist < min && !q[node].known) {
      			min = q[node].dist;
      			minIdx = node
      		}
      	}
      	v = q[minIdx];
      	console.log(v);
      	console.log("Setting ^^ to known = true");
      	v.known = true;

      	for (link in v.adjList) {
      		console.log("Checking: " + v.adjList[link].target);
      		console.log(v.adjList[link].target.known);
      		if (!v.adjList[link].target.known) {
      			console.log(v.adjList[link].target + " is unknown, now in if statement");
      			var cost = v.adjList[link].weight;

      			console.log("Comparing v.dist + cost and v.adj...");
      			console.log((v.dist + cost) + " " + v.adjList[link].target.dist);
      			if (v.dist + cost < v.adjList[link].target.dist) {
      				v.adjList[link].target.dist = v.dist + cost;
      				v.adjList[link].target.path = v.adjList[link];
      				q.push(v.adjList[link].target);
      			} else if (v.adjList[link].target.dist < 0) {
      				v.adjList[link].target.dist = v.dist + cost;
      				v.adjList[link].target.path = v.adjList[link];
      				q.push(v.adjList[link].target);   				
      			}
      		}
      	}
      	console.log("Finished ADj List");
      }

    }

  }

  function getDijkstras(source, target) {
  	// Don't Call Dijkstra's on Empty Array
  	if (nodes.length < 2)
  		return false;
  	// Run Dijkstra's, generate path object

  	// find real Source and Target

    var indexSource = source;
    var indexTarget = target;
    var source = -1;
    var target = -1;

    // Find the Actual Node Index
    for (node in nodes) {
      if (nodes[node].idx == indexSource)
      	source = parseInt(node);
      if (nodes[node].idx == indexTarget)
      	target = parseInt(node);
    }
    if (source < 0 || target < 0)
      return;

  	dijkstras(source);
  	path = [];
  	currentVertex = nodes[target];
  	path.dist = currentVertex.dist;

  	// Recontruct path
  	while (currentVertex.path != null) {
  		path.push(currentVertex.path);
  		currentVertex = currentVertex.path.source;
  	}

  	return path;
  }

  function shortestPathUnweighted() {
    
  }

  function topSort() {

  }

  function mst() {

  }
	

	return {
		nodes: nodes,
		links: links,
		newNode: newNode,
    	addLink: addLink,
    	remove: remove,
    	dijkstras: dijkstras,
    	getDijkstras: getDijkstras,
    	weighted: weighted
	}
}