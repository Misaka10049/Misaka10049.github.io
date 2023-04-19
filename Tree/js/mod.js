let modInfo = {
	name: "时空增量树",
	id: "tstree", //time space tree
	lastid: "mxlztree",
	author: "myh",
	pointsName: "时间点",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.01",
	name: "时间膨胀",
}


let winText = `恭喜！你已经走到了游戏的终点并取得了胜利，但是现在……`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = [""]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(0)
	if (hasUpgrade('t1', 11)) gain = gain.add(1)
	if (hasUpgrade('t1', 12)) gain = gain.add(1)
	if (hasUpgrade('t1', 13)) gain = gain.times(upgradeEffect('t1', 13))
	if (hasUpgrade('s1', 11)) gain = gain.times(2)
	gain=gain.times(clickableEffect("t1",11))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e308"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {
	
}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return 3600 // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}