var context;
var soundMapping = {}; 
var cool;
document.addEventListener('DOMContentLoaded', loadSound);


function loadSound() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new AudioContext();
    createMapping(colors);
}


function createMapping(colors){
	Object.keys(colors).forEach( function(clr) { 
	loadSound(clr,colors[clr]);
	});
}



var loadSound = function(clr, soundname) {	
 // Create the Sound 
	var getSound = new XMLHttpRequest(); // Load the Sound with XMLHttpRequest
	getSound.open("GET", "sounds/"+soundname+".mp3", true); // Path to Audio File
	getSound.responseType = "arraybuffer"; // Read as Binary Data
	getSound.onload = function() {
		context.decodeAudioData(getSound.response, function(buffer){
			var soundBuffer = buffer; // Decode the Audio Data and Store it in a Variable
			soundMapping[clr] = soundBuffer;
			cool = buffer;
		});
	}
	getSound.send(); // Send the Request and Load the File

}

var getSound = function(clr,map) {
	var playSound = context.createBufferSource(); // Declare a New Sound
	playSound.buffer = map[clr]; // Attatch our Audio Data as it's Buffer
	playSound.connect(context.destination);
	playSound.loop = true;  // Link the Sound to the Output
	return playSound;	
}


function togglePlay(){
		console.log("playing");
		play();
		pause();

}

var currentSounds = {};
function pause() {
	Object.keys(currentSounds).forEach(function (clr) {
		currentSounds[clr].stop();
	});
	currentSounds = {};
	setColumn(0);
}


function play(){
	var speed = 300;
	var i = 0;
	var j= 0;

	while (i<800){ //loop
		console.log(i);

		if (j % speed == 0){
			var clmColors = getColumn();
			var currentColors = Object.keys(currentSounds);
			clmColors.forEach(function (clm_clr){ 
				if (!currentColors.includes(clm_clr)){
					var soundClr = getSound(clm_clr, soundMapping);
					currentSounds[clm_clr] = soundClr;
					currentSounds[clm_clr].start(0);
				}
			});

			currentColors.forEach(function (curr_clr){
				if (!clmColors.includes(curr_clr)){
					currentSounds[curr_clr].stop();
					delete currentSounds[curr_clr];
				}
			});
			i++;
		}
		j++;
	} //loop

}


function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

