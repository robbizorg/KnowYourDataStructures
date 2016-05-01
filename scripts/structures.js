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

	function enqueue(element) {
		dl.insertFront(element);
	}

	function dequeue() {
		return dl.removeLast();
	}

	function peek() {
		return dl.peek();
	}

	return {
		enqueue: enqueue,
		dequeue: dequeue,
		peek: peek,
		size: dl.size
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
	var weighted = false;

	function newNode(element, source) {
		var node = {"element": element, "adjList": [], dist: -1, known: false, path: null, idx: nodes.length};
		nodes.push(node);

		if (source === undefined) {
			if (nodes.length > 1) {
				//links.push({"source": (nodes.length - 2) , "target": (nodes.length - 1)});
			}
		} else {
      if (nodes.length > 1) {
        if (weighted) {
          links.push({"source": parseInt(source), "target": (nodes.length - 1), "weight": 0});
        } else {
        	// DOES NOT MATCH UP WITH HOW D3 IS DELETING NODES
        	var realSource = -1;
        	for (node in nodes) {
        		if (nodes[node].idx == source) {
        			realSource = node;
        			break;
        		} 
        	}
        	if (realSource < 0)
        		return;
        	var link = {"source": parseInt(realSource), "target": (nodes.length - 1)};
      		links.push(link);
      		nodes[link.source].adjList.push(link.target);
      	}
      }
    }

  }
  
  function addLink(source, target) {
    if (source === undefined || target === undefined) {
      return undefined;
    } else {
    	var link = {"source": parseInt(source), "target": parseInt(target)};
     	links.push(link);
     	nodes[link.source].adjList.push(link.target);
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

  // Graph Algorithms
  function dijkstras() {
    if (weighted != true) {
      return false;
    } else {
      return true;
    }

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
    	remove: remove
	}
}