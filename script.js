//I'm gonna move this to github

var config = {
	apiKey: "AIzaSyAM18-ZHfKFsWZkuz11bn_0u8j1MznRR10",
	authDomain: "cloud-draw-b7d82.firebaseapp.com",
	databaseURL: "https://cloud-draw-b7d82.firebaseio.com",
	projectId: "cloud-draw-b7d82",
	storageBucket: "cloud-draw-b7d82.appspot.com",
	messagingSenderId: "293421482411"
};
firebase.initializeApp(config);
var database = firebase.database();

var mouse = false;
var p = document.getElementById("p");
var d = "M0,0";
var ref = database.ref().push();
var id = Math.floor(Math.random() * 100000)
var color = Math.floor(Math.random() * 16777215).toString(16);
p.setAttribute("stroke", "#" + color);
var s = document.getElementById("svg");

ref.set({
	color: color,
	line: d,
	id: id
});

s.onmousemove = function(e){
	if(mouse){
		p.setAttribute("d", d + "L" + e.clientX + "," + e.clientY + " ");
		d = p.getAttribute("d");
		ref.set({
			color: "bada55",
			line: d,
			id: id
		});
	}
}
s.onmouseup = function(){
	mouse = false;
}
s.onmousedown = function(e){
	p.setAttribute("d", d + "M" + e.clientX + "," + e.clientY + " ");
	d = p.getAttribute("d");
	mouse = true;
}
database.ref().once("value", function(e){
	e = e.val();
	for(var a in e){
		if(e[a].id != id)
			s.innerHTML += '<path id="' + e[a].id + '" fill="none" stroke="#' + e[a].color + '" stroke-width="5" d="M0,0 "/>';
	}
});
database.ref().on("child_changed", function(e){
	e = e.val();
	if(e.id != id)
		document.getElementById(e.id).setAttribute("d", e.line);
	p = document.getElementById("p");
});
database.ref().on("child_added", function(e){
	e = e.val();
	s.innerHTML += '<path id="' + e.id + '" fill="none" stroke="#' + e.color + '" stroke-width="5" d="M0,0 "/>';
	p = document.getElementById("p");
});
function clear(){
	d = "M0,0 ";
	p.setAttribute("d", d);
	ref.set({
		color: "bada55",
		line: d,
		id: id
	});
}
document.getElementById("button").onclick = clear;
