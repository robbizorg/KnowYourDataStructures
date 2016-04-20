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

var list = linkedList();
var htmlString = "";

list.insert("hello");
list.insert("what's up?");
list.insert("Something");

var arr = list.getElements();

for (element in arr) {
	console.log(arr[element]);
	htmlString += "<div>" + arr[element] + "</div>";
}

console.log(htmlString);
var div = document.getElementById("list");
div.innerHTML = htmlString;


