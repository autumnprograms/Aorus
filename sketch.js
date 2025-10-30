laptopx = 200;
laptopy = 200;
laptopheight =500;
laptopwidth =800;

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
	znoise = createVideo("Reactions/SAM.mp4"); //zombie noises
	whistle = createVideo("Reactions/whistle.mp4"); //whistle
	// bluenew = loadImage("Reactions/bluenew.avif"); //bluescreen windows 10
	// blueold = loadImage("Reactions/blueold.png"); //bluescreen old
	// loading = loadImage("Reactions/loading.jpg"); //windows ten update
	// longhorn = loadImage("Reactions/longhorn.jpg"); //longhorn
	// when = loadImage("Reactions/when.gif"); //when
	// windows8 = loadImage("Reactions/windows8.gif"); //windows 8 home
	


}

function setup() 
{
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
	createCanvas(400, 400);
	react = createButton("react", 1);
	react.position(100,100);
	react.size(100,100);
	react.mousePressed(reactiontrigger);
}

function draw()
{
	//foxy jumpscare initializing
	jumpfoxy.position(laptopx,laptopy);
	jumpfoxy.size(laptopheight,laptopwidth);
	if (jumpfoxy.elt.ended) {
		jumpfoxy.hide();
	}

	//invincible titlecard initializing
	iam.position(laptopx,laptopy);
	iam.size(laptopheight,laptopwidth);
	if (iam.elt.ended) {
		iam.hide();
	}

	//pressure initializing
	apr.position(laptopx,laptopy);
	apr.size(laptopheight,laptopwidth);
	if (apr.elt.ended) {
		apr.hide();
	}

	//foxy jumpscare initializing
	ays.position(laptopx,laptopy);
	ays.size(laptopheight,laptopwidth);
	if (ays.elt.ended) {
		ays.hide();
	}

	//foxy jumpscare initializing
	bm.position(laptopx,laptopy);
	bm.size(laptopheight,laptopwidth);
	if (bm.elt.ended) {
		bm.hide();
	}

	//foxy jumpscare initializing
	doom.position(laptopx,laptopy);
	doom.size(laptopheight,laptopwidth);
	if (doom.elt.ended) {
		doom.hide();
	}

	//foxy jumpscare initializing
	mcw.position(laptopx,laptopy);
	mcw.size(laptopheight,laptopwidth);
	if (mcw.elt.ended) {
		mcw.hide();
	}

	//foxy jumpscare initializing
	misimput.position(laptopx,laptopy);
	misimput.size(laptopheight,laptopwidth);
	if (misimput.elt.ended) {
		misimput.hide();
	}

	//foxy jumpscare initializing
	znoise.position(laptopx,laptopy);
	znoise.size(laptopheight,laptopwidth);
	if (znoise.elt.ended) {
		znoise.hide();
	}

	//foxy jumpscare initializing
	whistle.position(laptopx,laptopy);
	whistle.size(laptopheight,laptopwidth);
	if (whistle.elt.ended) {
		whistle.hide();
	}


}

function reactiontrigger()
{
	iam.show();
	iam.play();

}


