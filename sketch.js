// ==============================================
//                       POSITIONAL DATA
// ==============================================


//laptop character dimensions and position
laptopx = 400;
laptopy = 100;
laptopheight =500;
laptopwidth =800;

//video reactions dimensions and position
videox = 480;
videoy = -50;
videoheight =320;
videowidth =500;

//button reactions dimensions and position
buttonx = 100;
buttony = 115;
buttonx2 = 100;
buttony2 = 275;
buttonx3 = 250;
buttony3 = 235;
buttonheight =150;
buttonwidth =150;
buttonheight2 =75;
buttonwidth2 =75;

// ==============================================
//                 ESTABLISHING VARS/ANIMS
// ==============================================
//list for reactions 
let reactions;
//list of found reactions
let found;

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
hintscreen = false;

//establishing needed vars for voice rec
let myRec; //recognition var
let resultText = ""; //results
let prevText = ""; //last known text

let lastChangeTime = 0;
let silenceDelay = 2000; // 2 seconds




// ==============================================
//          PRELOAD - GETTING VIDEOS AND ANIMS
// ==============================================
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
	sta = createVideo("Reactions/sta.mp4"); //say that again

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

// ==============================================
//                              SETUP
// ==============================================
function setup() 
{
	//establish canvas
	document.body.style.zoom = "100%";
	createCanvas(windowWidth, windowHeight);

	// Create speech recognizer
	myRec = new p5.SpeechRec('en-US', gotSpeech);

	// Starts continuous listening
	myRec.continuous = true; 
	myRec.interimResults = false; //no final results, removes repeating issues

	//animation frame padding 
	IdleAnim.frameDelay = 15;
	OpenAnim.frameDelay = 5;
	CloseAnim.frameDelay = 5;

	//creates "random Reaction button"
	react = createButton("?");
	react.style('background-color', '#7b1f7bff'); // tomato color
  	react.style('color', 'white');
 	react.style('border', '4px solid #370f38ff');
  	react.style('border-radius', '100px');
  	react.style('font-size', '75px');
	react.style('font-family', 'Arial Rounded MT Bold, Arial, sans-serif');
 	react.style('color', '#e18fe3ff');
	react.position(buttonx,buttony);
	react.size(buttonwidth,buttonheight);

	react.mousePressed(() => {
		RandReact = int(random(0, 19));
		reactiontrigger();
	});
	
	speak = createButton("🎤︎︎");
	speak.style('background-color', '#7b1f7bff'); // tomato color
  	speak.style('color', 'white');
 	speak.style('border', '4px solid #370f38ff');
  	speak.style('border-radius', '100px');
  	speak.style('font-size', '75px');
	speak.style('font-family', 'Arial Rounded MT Bold, Arial, sans-serif');
 	speak.style('color', '#e18fe3ff');
	speak.position(buttonx2,buttony2);
	speak.size(buttonwidth,buttonheight);

	speak.mousePressed(() => {
		myRec.start(); //starts recording
	});

	speak.mouseReleased(() => {
		myRec.stop(); //starts recording
	});

	List = createButton("...");
	List.style('background-color', '#7b1f7bff'); // tomato color
  	List.style('color', 'white');
 	List.style('border', '4px solid #370f38ff');
  	List.style('border-radius', '100px');
  	List.style('font-size', '30px');
	List.style('font-family', 'Arial Rounded MT Bold, Arial, sans-serif');
 	List.style('color', '#e18fe3ff');
	List.position(buttonx3,buttony3);
	List.size(buttonwidth2,buttonheight2);

	List.mousePressed(() => {
		
		if (!hintscreen)
		{
			react.attribute('disabled', '');  
			speak.attribute('disabled', '');
			hintscreen = true;
		}
		else if (hintscreen)
		{
			react.removeAttribute('disabled', '');  
			speak.removeAttribute('disabled', '');
			hintscreen = false;
		}
	});

	//creates list of videos
	reactions = [jumpfoxy, iam, apr, ays, bm, doom, mcw, misinput, znoise, whistle, windows8, bluenew, blueold, loading, longhorn, when, absolute,sta];

	found = [];

	//goes through all videos, hides them for now
	for (let i = 0; i < reactions.length; i++) {
	reactions[i].hide();
	enableMicTap('Tap to enable motion sensors');
	}
}

// ==============================================
//         RESIZE - resizes when window is changed
// ==============================================
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function drawUI()
{
	if (hintscreen)
	{
		push();
		fill(191, 103, 204);
		stroke('#370f38ff');
		strokeWeight(4); 
		rect(325, 50, 615, 450, 40);
		pop();

		textSize(40);
		fill('white');
		text('Find all the memes! Hints:', 412, 100);
		textSize(25);
		fill('#fedeffff');
		if (found.includes(0)) text('✔', 370, 135);
		text('▢ A type of scare in a video game', 370, 135);
		if (found.includes(1)) text('✔', 370, 160);
		text('▢ invincible ', 370, 160);
		if (found.includes(2)) text('✔', 370, 185);
		text('▢ an obsessive roblox game ', 370, 185);
		if (found.includes(3)) text('✔', 370, 210);
		text('▢ guess who\'s finally getting his powers! ', 370, 210);
		if (found.includes(4)) text('✔', 370, 235);
		text('▢ a battle royale game ', 370, 235);
		if (found.includes(5)) text('✔', 370, 260);
		text('▢ can it run...', 370, 260);
		if (found.includes(6)) text('✔', 370, 285);
		text('▢ a game made out of blocks', 370, 285);
		if (found.includes(7)) text('✔', 370, 310);
		text('▢ CALM DOWN! IT WAS A... ', 370, 310);
		if (found.includes(8)) text('✔', 370, 335);
		text('▢ a call of duty game mode', 370, 335);
		if (found.includes(9)) text('✔', 370, 360);
		text('▢ a guy who whistles ', 370, 360);
		if (found.includes(10)) text('✔', 370, 385);
		text('▢ an operating system (/5),', 370, 385);
		if (found.includes(15)) text('✔', 370, 410);
		text('▢ a frustrating computer activity', 370, 410);
		if (found.includes(16)) text('✔', 370, 435);
		text('▢ martin scorsese meme', 370, 435);
		if (found.includes(17)) text('✔', 370, 460);
		text('▢ that was fantastic!', 370, 460);
	}
}
// ==============================================
//                               DRAW
// ==============================================
function draw()
{

	background(225,125,235);

	textSize(60);
	fill('white');
  	text('Aorus doesn\'t want to work.', 80, 100);
  	text('Say memes he knows.', 140, 480);

	
	//checks if current video is done playing
	if (reactions[RandReact].elt.ended || firstuse) {
		if (reset) //uses reset flag
		{
			react.removeAttribute('disabled', '');  //allows button use
			speak.removeAttribute('disabled', '');
			List.removeAttribute('disabled', '');
			reactions[RandReact].hide(); //rehides video
			State = "close" //sets animation state
			CloseAnim.frame = 0; //sets Animation Start frame
			CloseAnim.play(); //unpauses anim (had issues before w/o this)
			reset = false; //resets reset flag
		}
		else if (!CloseAnim.playing) //sets back to idle after close
		{
			State = "idle";
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

		drawUI();
}


// ==============================================
//                         SPEECH SETUP
// ==============================================
function gotSpeech() {
	if (myRec.resultValue) {
		resultText = myRec.resultString;
		resultText = resultText.toLowerCase();
		console.log("Heard:", resultText);
		check();
	}
}

// ==============================================
//                              REACTION TRIGGER
//    - logic used to trigger a given animation to play.
// ==============================================
function reactiontrigger()
{
		State = "open" //sets state to open
		myRec.stop(); //stops recording speech until after play (allows senetence to reset between reactions to avoid repeating)
		resultText = "";
		prevText = "";
		firstuse = false; //sets first use to false. only needed once. 
		OpenAnim.frame = 0; //sets open anim frame to beginning
		OpenAnim.play(); //starts open anim
		reset = true; //sets reset flag

		react.attribute('disabled', ''); //dissables button use
		speak.attribute('disabled', '');
		List.attribute('disabled', '');
		console.log("Reaction " + RandReact); //prints current reaction to console for debugging

		reactions[RandReact].position(videox,videoy); //sets vid position
		reactions[RandReact].size(videoheight,videowidth); //sets vid size

		reactions[RandReact].time(0); //sets video back to beginning
		//Only plays video when laptop has opened fully (~600)
		setTimeout(() => {
			reactions[RandReact].show();
			reactions[RandReact].play();
		}, 600);
}

// ==============================================
//      CHECK - After speaking, checks if any trigger 
// 			           words were included
// ==============================================
function check()
{
	
	// runs through all of the possible words/trigger phrases for each reaction

	//absolute
	if (resultText.includes("absolute") || resultText.includes("cinema"))
	{
		RandReact = 16;
		found.push(16);
		reactiontrigger()

	}
	//apr
	else if (resultText.includes("pressure") || resultText.includes("sky") || resultText.includes("pressured"))
	{
		RandReact = 2;
		found.push(2);
		reactiontrigger()
	}
	//ays
	else if (resultText.includes("are you sure") || resultText.includes("sure"))
	{
		RandReact = 3;
		found.push(3);
		reactiontrigger()
	}
	//bluenew / blueold / loading / longhorn / windows8
	else if (resultText.includes("error") || resultText.includes("bluescreen") || resultText.includes("windows") || resultText.includes("process"))
	{
		RandReact = int(random(0, 5));
		console.log(RandReact);
		if (RandReact == 0)
		{
			RandReact = 10;
		}
		else if (RandReact == 1)
		{
			RandReact = 11;
		}
		else if (RandReact == 2)
		{
			RandReact = 12;
		}
		else if (RandReact == 3)
		{
			RandReact = 13;
		}
		else if (RandReact == 4)
		{
			RandReact = 14;
		}
		found.push(11,12,13,14,10);
		reactiontrigger()

	}
	//bm
	else if (resultText.includes("fortnite") || resultText.includes("fortnight") || resultText.includes("fort night"))
	{
		RandReact = 4;
		found.push(4);
		reactiontrigger()
	}
	//doom
	else if (resultText.includes("doom") || resultText.includes("run"))
	{
		RandReact = 5;
		found.push(5);
		reactiontrigger()
	}
	//iam
	else if (resultText.includes("i am") || resultText.includes("i'm"))
	{
		console.log("ran")
		RandReact = 1;
		found.push(1);
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
		found.push(0,9);
		reactiontrigger()
	}
	//mc world
	else if (resultText.includes("create") || resultText.includes("mine") || resultText.includes("craft") || resultText.includes("water bucket"))
	{
		RandReact = 6;
		found.push(6);
		reactiontrigger()
	}
	//misinput
	else if (resultText.includes("misinput") || resultText.includes("miss input") || resultText.includes("calm"))
	{
		RandReact = 7;
		found.push(7);
		reactiontrigger()
	}
	//when
	else if (resultText.includes("when") || resultText.includes("programming") || resultText.includes("code") || resultText.includes("coding"))
	{
		RandReact = 15;
		found.push(15);
		reactiontrigger()
	}
	//znoises
	else if (resultText.includes("sam") || resultText.includes("zombies") || resultText.includes("dogging"))
	{
		RandReact = 8;
		found.push(8);
		reactiontrigger()
	}
	//say that again
	else if (resultText.includes("fantastic") || resultText.includes("thing") || resultText.includes("four") || resultText.includes("say that again"))
	{
		RandReact =17;
		found.push(17);
		reactiontrigger()
	}
}

// ==============================================
//                              ANIMATIONS
//    		       positions and draws animations.
// ==============================================

//draws Idle Animation
function drawIdle() {
	push();
	translate(laptopx, laptopy);
	scale(0.3);
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
	scale(0.3);
	animation(CloseAnim, laptopwidth, laptopheight);
	pop();
	CloseAnim.noLoop();
}