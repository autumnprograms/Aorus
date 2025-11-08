laptopx = 100;
laptopy = 300;
laptopheight =500;
laptopwidth =800;
videox = 180;
videoy = 150;
videoheight =320;
videowidth =500;
let reactions;
let IdleAnim;
let OpenAnim;
let CloseAnim;
State = "idle"; //set to idle
reset = false;
firstuse = true;
rand = 0;
whentriggered = false;

let myRec;
let resultText = "";
let isFinal = event.results[current].isFinal;

function preload()
{

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

	frameref = createImage('frames/f1.PNG');

	IdleAnim = loadAnimation(
		'frames/f1.PNG',
		'frames/f2.PNG',
		'frames/f3.PNG',

	);

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
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function drawIdle() {
	push();
	translate(laptopx, laptopy);
	scale(0.3); // 50% size
	animation(IdleAnim, laptopwidth, laptopheight);
	pop();
}

function drawOpen() {
	push();

	translate(laptopx, laptopy);
	scale(0.3);
	animation(OpenAnim, laptopwidth, laptopheight);
	pop();
	OpenAnim.noLoop();


}

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
	createCanvas(windowWidth, windowHeight);

		// Create speech recognizer
	myRec = new p5.SpeechRec('en-US', gotSpeech);

	// Start continuous listening
	myRec.continuous = true; 
	myRec.interimResults = false;
	myRec.start();


	IdleAnim.frameDelay = 15;
	OpenAnim.frameDelay = 5;
	CloseAnim.frameDelay = 5;


	jumpfoxy.hide();
	iam.hide();
	apr.hide();
	ays.hide();
	bm.hide();
	doom.hide();
	mcw.hide();
	misinput.hide();
	znoise.hide();
	whistle.hide();
	bluenew.hide();
	blueold.hide();
	loading.hide();
	longhorn.hide();
	when.hide();
	absolute.hide();
	windows8.hide();

	react = createButton("react");
	react.position(100,100);
	react.size(100,100);
	react.mousePressed(() => {
		RandReact = int(random(0, 17));
		reactiontrigger();
		});

	reactions = [jumpfoxy, iam, apr, ays, bm, doom, mcw, misinput, znoise, whistle, windows8, bluenew, blueold, loading, longhorn, when];
	RandReact = 0;

}

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
	
	
	if (reactions[RandReact].elt.ended || firstuse) {
		if (reset)
		{
			react.removeAttribute('disabled', ''); 
			reactions[RandReact].hide();
			State = "close"
			CloseAnim.frame = 0;
			CloseAnim.play();
			reset = false;
			myRec.start();
		}
		else if (!CloseAnim.playing)
		{
			State = "idle";
		}

		if (!whentriggered)
		{
		//absolute
		if (resultText.toLowerCase().includes("absolute") || resultText.toLowerCase().includes("cinema"))
		{
			// RANDOM RandReact = int(random(0, 17));
			RandReact = 0;
			reactiontrigger()

		}
		//apr
		else if (resultText.toLowerCase().includes("pressure") || resultText.toLowerCase().includes("sky"))
		{
			RandReact = 2;
			reactiontrigger()
		}
		//ays
		else if (resultText.toLowerCase().includes("are you sure") || resultText.toLowerCase().includes("sure"))
		{
			RandReact = 3;
			reactiontrigger()
		}
		//bluenew / blueold / loading / longhorn / windows8
		else if (resultText.toLowerCase().includes("error") || resultText.toLowerCase().includes("bluescreen") || resultText.toLowerCase().includes("windows") || resultText.toLowerCase().includes("process"))
		{
			rand = int(random(0, 5));
			console.log(rand);
			if (rand == 0)
			{
				RandReact = 11;
			}
			else if (rand == 1)
			{
				RandReact = 12;
			}
			else if (rand == 2)
			{
				RandReact = 13;
			}
			else if (rand == 3)
			{
				RandReact = 14;
			}
			else if (rand == 4)
			{
				RandReact = 11;
			}
		}
		//bm
		else if (resultText.toLowerCase().includes("fortnite") || resultText.toLowerCase().includes("fortnight") || resultText.toLowerCase().includes("fort night"))
		{
			RandReact = 4;
			reactiontrigger()
		}
		//doom
		else if (resultText.toLowerCase().includes("doom") || resultText.toLowerCase().includes("run"))
		{
			RandReact = 5;
			reactiontrigger()
		}
		//iam
		else if (resultText.toLowerCase().includes("i am") || resultText.toLowerCase().includes("i'm"))
		{
			console.log("ran")
			RandReact = 1;
			reactiontrigger()
		}
		//jumpfoxy / whistle
		else if (resultText.toLowerCase().includes("jump scare") || resultText.toLowerCase().includes("freddy") || resultText.toLowerCase().includes("five bear") || resultText.toLowerCase().includes("five nights") || resultText.toLowerCase().includes("josh") || resultText.toLowerCase().includes("whistle"))
		{
			rand = int(random(0, 2));
			console.log(rand);
			if (rand == 0)
			{
				RandReact = 0;
			}
			else if (rand == 1)
			{
				RandReact = 9;
			}
			reactiontrigger()
		}
		//mc world
		else if (resultText.toLowerCase().includes("create") || resultText.toLowerCase().includes("mine") || resultText.toLowerCase().includes("craft") || resultText.toLowerCase().includes("water bucket"))
		{
			RandReact = 6;
			reactiontrigger()
		}
		//misinput
		else if (resultText.toLowerCase().includes("misinput") || resultText.toLowerCase().includes("miss input") || resultText.toLowerCase().includes("calm"))
		{
			RandReact = 7;
			reactiontrigger()
		}
		//when
		else if (resultText.toLowerCase().includes("when") || resultText.toLowerCase().includes("programming") || resultText.toLowerCase().includes("code") || resultText.toLowerCase().includes("coding"))
		{
			RandReact = 15;
			reactiontrigger()
		}
		//znoises
		else if (resultText.toLowerCase().includes("sam") || resultText.toLowerCase().includes("zombies") || resultText.toLowerCase().includes("dogging"))
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
		}, 550);

}


