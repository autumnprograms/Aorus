//laptop character dimensions and position
laptopx = 100;
laptopy = 300;
laptopheight =500;
laptopwidth =800;

//video reactions dimensions and position
videox = 180;
videoy = 150;
videoheight =320;
videowidth =500;

//button reactions dimensions and position
buttonx = 100;
buttony = 100;
buttonheight =100;
buttonwidth =100;

//list for reactions 
let reactions;

//establishing animation names
let IdleAnim;
let OpenAnim;
let CloseAnim;

//state for changing animation
State = "idle";

//general use variables 
reset = false; //used as flag for if reset has taken place
firstuse = true; //used to allow first use, avoids repeating reactions in loop
RandReact = 0; //used in some reaction cases to choose a random reaction
whentriggered = false; //flag that tracks if reaction is currently being played.

//establishing needed vars for voice rec
let myRec; //recognition var
let resultText = ""; //results

function preload()
{
	//creating video assets
	jumpfoxy = createVideo("Reactions/jumpfoxy.mp4"); //foxy jumpscare
	iam = createVideo("Reactions/iam.mp4"); //title card
	apr = createVideo("Reactions/averagepressurerun.mov"); //pressure
	ays = createVideo("Reactions/ays.mp4"); //are you sure?
	bm = createVideo("Reactions/bm.mp4"); //best mates
	doom = createVideo("Reactions/doom.mp4"); //doom
	mcw = createVideo("Reactions/mc world.mp4"); //mc world
	misinput = createVideo("Reactions/misinput.mp4"); //misinput
	znoise = createVideo("Reactions/znoises.mp4"); //zombie noises
	whistle = createVideo("Reactions/whistle.mp4"); //whistle
	windows8 = createVideo("Reactions/windows8.mp4"); //windows 8 home
	bluenew = createVideo("Reactions/bluenew.mp4"); //bluescreen windows 10
	blueold = createVideo("Reactions/blueold.mp4"); //bluescreen old
	loading = createVideo("Reactions/loading.mp4"); //windows ten update
	longhorn = createVideo("Reactions/longhorn.mp4"); //longhorn
	when = createVideo("Reactions/when.mp4"); //when
	absolute = createVideo("Reactions/absolute.mp4"); //absolute

	//loads Idle Anim
	IdleAnim = loadAnimation(
		'frames/f1.PNG',
		'frames/f2.PNG',
		'frames/f3.PNG',

	);

	//loads Open Anim
	OpenAnim = loadAnimation(
		'frames/f1.PNG',
		'frames/f2.PNG',
		'frames/f3.PNG',
		'frames/f4.PNG',
		'frames/f5.PNG',
		'frames/f6.PNG',
		'frames/f7.PNG',
		'frames/f8.PNG',
		'frames/f9.PNG',
		'frames/f10.PNG'
	);

	//loads Close Anim
	CloseAnim = loadAnimation(
		'frames/f10.PNG',
		'frames/f9.PNG',
		'frames/f8.PNG',
		'frames/f7.PNG',
		'frames/f6.PNG',
		'frames/f5.PNG',
		'frames/f4.PNG',
		'frames/f3.PNG',
		'frames/f2.PNG',
		'frames/f1.PNG'
	);

}

//resizes dependent on window size
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//draws Idle Animation
function drawIdle() {
	push();
	translate(laptopx, laptopy);
	scale(0.3); // 50% size
	animation(IdleAnim, laptopwidth, laptopheight);
	pop();
}

//draws Open Animation
function drawOpen() {
	push();

	translate(laptopx, laptopy);
	scale(0.3);
	animation(OpenAnim, laptopwidth, laptopheight);
	pop();
	OpenAnim.noLoop();


}

//draws Close Animation
function drawClose() {
	push();
	translate(laptopx, laptopy);
	scale(0.3); // 50% size
	animation(CloseAnim, laptopwidth, laptopheight);
	pop();
	CloseAnim.noLoop();
}


function setup() 
{
	//establish canvas
	createCanvas(windowWidth, windowHeight);

	// Create speech recognizer
	myRec = new p5.SpeechRec('en-US', gotSpeech);

	// Starts continuous listening
	myRec.continuous = true; 
	myRec.interimResults = false; //no final results, removes repeating issues
	myRec.start(); //starts recording

	//animation frame padding 
	IdleAnim.frameDelay = 15;
	OpenAnim.frameDelay = 5;
	CloseAnim.frameDelay = 5;

	//creates "random Reaction button"
	react = createButton("react");
	react.position(buttonx,buttony);
	react.size(buttonwidth,buttonheight);
	react.mousePressed(() => {
		RandReact = int(random(0, 18));
		reactiontrigger();
	});

	//creates list of videos
	reactions = [jumpfoxy, iam, apr, ays, bm, doom, mcw, misinput, znoise, whistle, windows8, bluenew, blueold, loading, longhorn, when, absolute];

	//goes through all videos, hides them for now
	for (let i = 0; i < reactions.length; i++) {
	reactions[i].hide();
	}
}

//funct for speech recognition
function gotSpeech() {
	if (myRec.resultValue) {
		resultText = myRec.resultString;
		console.log("Heard:", resultText);
	}
}

function draw()
{
	push();
	background(225,125,235);
	
	//checks if current video is done playing
	if (reactions[RandReact].elt.ended || firstuse) {
		if (reset) //uses reset flag
		{
			react.removeAttribute('disabled', '');  //allows button use
			reactions[RandReact].hide(); //rehides video
			State = "close" //sets animation state
			CloseAnim.frame = 0; //sets Animation Start frame
			CloseAnim.play(); //unpauses anim (had issues before w/o this)
			reset = false; //resets reset flag
			myRec.start(); //starts checking for words again
		}
		else if (!CloseAnim.playing) //sets back to idle after close
		{
			State = "idle";
		}

		if (!whentriggered) //only if reaction hasnt already been triggered.
		{
		
		// runs through all of the possible words/trigger phrases for each reaction

		resultText = resultText.toLowerCase();
		//absolute
		if (resultText.includes("absolute") || resultText.includes("cinema"))
		{
			RandReact = 0;
			reactiontrigger()

		}
		//apr
		else if (resultText.includes("pressure") || resultText.includes("sky"))
		{
			RandReact = 2;
			reactiontrigger()
		}
		//ays
		else if (resultText.includes("are you sure") || resultText.includes("sure"))
		{
			RandReact = 3;
			reactiontrigger()
		}
		//bluenew / blueold / loading / longhorn / windows8
		else if (resultText.includes("error") || resultText.includes("bluescreen") || resultText.includes("windows") || resultText.includes("process"))
		{
			RandReact = int(random(0, 5));
			console.log(RandReact);
			if (RandReact == 0)
			{
				RandReact = 11;
			}
			else if (RandReact == 1)
			{
				RandReact = 12;
			}
			else if (RandReact == 2)
			{
				RandReact = 13;
			}
			else if (RandReact == 3)
			{
				RandReact = 14;
			}
			else if (RandReact == 4)
			{
				RandReact = 11;
			}
		}
		//bm
		else if (resultText.includes("fortnite") || resultText.includes("fortnight") || resultText.includes("fort night"))
		{
			RandReact = 4;
			reactiontrigger()
		}
		//doom
		else if (resultText.includes("doom") || resultText.includes("run"))
		{
			RandReact = 5;
			reactiontrigger()
		}
		//iam
		else if (resultText.includes("i am") || resultText.includes("i'm"))
		{
			console.log("ran")
			RandReact = 1;
			reactiontrigger()
		}
		//jumpfoxy / whistle
		else if (resultText.includes("jump scare") || resultText.includes("freddy") || resultText.includes("five bear") || resultText.includes("five nights") || resultText.includes("josh") || resultText.includes("whistle"))
		{
			RandReact = int(random(0, 2));
			console.log(RandReact);
			if (RandReact == 0)
			{
				RandReact = 0;
			}
			else if (RandReact == 1)
			{
				RandReact = 9;
			}
			reactiontrigger()
		}
		//mc world
		else if (resultText.includes("create") || resultText.includes("mine") || resultText.includes("craft") || resultText.includes("water bucket"))
		{
			RandReact = 6;
			reactiontrigger()
		}
		//misinput
		else if (resultText.includes("misinput") || resultText.includes("miss input") || resultText.includes("calm"))
		{
			RandReact = 7;
			reactiontrigger()
		}
		//when
		else if (resultText.includes("when") || resultText.includes("programming") || resultText.includes("code") || resultText.includes("coding"))
		{
			RandReact = 15;
			reactiontrigger()
		}
		//znoises
		else if (resultText.includes("sam") || resultText.includes("zombies") || resultText.includes("dogging"))
		{
			RandReact = 8;
			reactiontrigger()
		}
	}



	}

	if (State == "idle")
	{
		drawIdle();
	}
	else if (State == "open")
	{
		drawOpen();
	}
	else if (State == "close")
	{
		drawClose();
	}
	pop();
	

}

function reactiontrigger()
{
		State = "open"
		myRec.stop();
		resultText = "";
		firstuse = false;
		OpenAnim.frame = 0;
		OpenAnim.play();
		reset = true;

		react.attribute('disabled', '');
		console.log("Reaction " + RandReact);

		reactions[RandReact].position(videox,videoy);
		reactions[RandReact].size(videoheight,videowidth);

		reactions[RandReact].time(0);
		setTimeout(() => {
			reactions[RandReact].show();
			reactions[RandReact].play();
		}, 600);

}


