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


function preload()
{

	jumpfoxy = createVideo("Reactions/jumpfoxy.mp4"); //foxy jumpscare
	iam = createVideo("Reactions/iam.mp4"); //title card
	apr = createVideo("Reactions/averagepressurerun.mov"); //pressure
	ays = createVideo("Reactions/ays.mp4"); //are you sure?
	bm = createVideo("Reactions/bm.mp4"); //best mates
	doom = createVideo("Reactions/doom.mp4"); //doom
	mcw = createVideo("Reactions/mc world.mp4"); //mc world
	misimput = createVideo("Reactions/misinput.mp4"); //misinput
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


function drawIdle() {
	push();
	clear();
	translate(laptopx, laptopy);
	scale(0.3); // 50% size
	animation(IdleAnim, laptopwidth, laptopheight);
	pop();
}

function drawOpen() {
	push();
	clear();
	translate(laptopx, laptopy);
	scale(0.3);
	animation(OpenAnim, laptopwidth, laptopheight);
	pop();
	OpenAnim.noLoop();


}

function drawClose() {
	push();
	clear();
	translate(laptopx, laptopy);
	scale(0.3); // 50% size
	animation(CloseAnim, laptopwidth, laptopheight);
	pop();
	CloseAnim.noLoop();
}


function setup() 
{
	createCanvas(windowHeight, windowWidth);

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
	misimput.hide();
	znoise.hide();
	whistle.hide();
	bluenew.hide();
	blueold.hide();
	loading.hide();
	longhorn.hide();
	when.hide();
	absolute.hide();
	windows8.hide();

	react = createButton("react", 1);
	react.position(100,100);
	react.size(100,100);
	react.mousePressed(reactiontrigger);

	reactions = [jumpfoxy, iam, apr, ays, bm, doom, mcw, misimput, znoise, whistle, windows8, bluenew, blueold, loading, longhorn, when, when];
	RandReact = 0;
}

function draw()
{
	
	if (reactions[RandReact].elt.ended) {
		if (reset)
		{
			react.removeAttribute('disabled', ''); 
			reactions[RandReact].hide();
			State = "close"
			CloseAnim.frame = 0;
			CloseAnim.play();
			reset = false;
		}
		else if (!CloseAnim.playing)
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

}

function reactiontrigger()
{
		State = "open"
		OpenAnim.frame = 0;
		OpenAnim.play();
	
		reset = true;

		react.attribute('disabled', '');
		RandReact = int(random(0, 17));
		console.log("Reaction " + RandReact);

		reactions[RandReact].position(videox,videoy);
		reactions[RandReact].size(videoheight,videowidth);

		reactions[RandReact].time(0);
		setTimeout(() => {
			reactions[RandReact].show();
			reactions[RandReact].play();
		}, 500);


	//for ease of programming make all images short video clips in premiere
	//needed
		//laptop
		//idle movement.
		//opening and closing after vids
		//spam protection
}


