addLayer("t1", {
	tabFormat: {
		"Main":{
			content: [
				"main-display",
				"prestige-button",
				"blank",
				"upgrades"
			],
		},
		"Buyables":{
			content: [
				"main-display",
				"buyables"
			],
		},
		"Clickables":{
			content:[
				"main-display",
				"clickables"
			],
		},
	},
	name: "时间泡沫", // This is optional, only used in a few places, If absent it just uses the layer id.
	symbol: "T1", // This appears on the layer's node. Default is the id with the first letter capitalized
	position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
	startData() { return {
		unlocked: true,
		points: new Decimal(0),
	}},
	color: "#00A2D8",
	requires: new Decimal(10), // Can be a function that takes requirement increases into account
	resource: "时间泡沫", // Name of prestige currency
	baseResource: "时间点", // Name of resource prestige is based on
	baseAmount() {return player.points}, // Get the current amount of baseResource
	type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	exponent: 0.5, // Prestige currency exponent
	gainMult() { // Calculate the multiplier for main currency from bonuses
		mult = new Decimal(1)
		if (hasUpgrade('t1', 14)) mult = mult.times(upgradeEffect('t1', 14))
		if (hasUpgrade('s1', 12)) mult = mult.times(2)
		mult = mult.times(buyableEffect("t1",11).add(1))
		mult = mult.times(clickableEffect("s1",11))
		return mult
	},
	gainExp() { // Calculate the exponent on main currency from bonuses
		return new Decimal(1)
	},
	row: 0, // Row the layer is in on the tree (0 is the first row)
	displayRow: 0,
	hotkeys: [
		{key: "t", description: "T: 重置以获得时间泡沫", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
	],
	//style: {background: "white"},
	//tabFormat: [
	//"main-display",
	//"prestige-button",
	//"blank",
	//["display-text",function() { return "你有 " + format(player.points) + " 时间点" }],
	//"blank",
	//"upgrades"
	//],
	layerShown(){return true},
	upgrades:{
		11:{
			title: "时间开始流逝",
			description: "每秒获得1个时间点",
			//description() {
			//	return "nothing"
			//},
			cost: new Decimal(1),
			//fullDisplay() {
			//	return this.title+this.description
			//},
			//style: {background: "white"},
			//tooltip: "nothing",
			unlocked() {return true},
		},
		12:{
			title: "时间加速流逝",
			description: "每秒多获得1个时间点",
			cost: new Decimal(3),
			unlocked() {return hasUpgrade("t1",11)},
		},
		13:{
			title: "泡沫时间",
			description: "时间泡沫加速时间",
			cost: new Decimal(5),
			unlocked() {return hasUpgrade("t1",12)},
			effect(){
				var mult=player[this.layer].points.add(1).pow(0.5)
				if(hasUpgrade("t1",22)) mult=mult.times(2)
				return mult
			},
			effectDisplay(){
				return format(upgradeEffect(this.layer, this.id))+"x"
			},
		},
		14:{
			title: "时间泡沫",
			description: "时间加成时间泡沫获取",
			cost: new Decimal(10),
			unlocked() {return hasUpgrade("t1",13)},
			effect(){
				var mult=player.points.add(1).pow(0.2)
				if(hasUpgrade("t1",21)) mult=mult.times(2)
				return mult
			},
			effectDisplay(){
				return format(upgradeEffect(this.layer, this.id))+"x"
			},
		},
		21:{
			title: "假如时间欺骗了你",
			description: "使\"时间泡沫\" 2x 更强",
			cost: new Decimal(20),
			unlocked() {return hasUpgrade("t1",14)},
		},
		22:{
			title: "欺骗时间",
			description: "使\"泡沫时间\" 2x 更强",
			cost: new Decimal(50),
			unlocked() {return hasUpgrade("t1",21)},
		},
		23:{
			title: "时间肥皂",
			description: "解锁第一个可购买物",
			cost: new Decimal(100),
			unlocked() {return hasUpgrade("t1",21)&&hasUpgrade("t1",22)},
		},
		24:{
			title: "时间泡泡",
			description: "解锁第一个按钮",
			cost: new Decimal(125),
			unlocked() {return hasUpgrade("t1",23)},
		},
		31:{
			title: "更多时间泡泡",
			description: "使\"时间泡泡\" 5x 更强",
			cost: new Decimal(200),
			unlocked() {return hasUpgrade("t1",24)},
		},
		32:{
			title: "更好的肥皂",
			description: "使\"时间肥皂\" 5x 更强",
			cost: new Decimal(500),
			unlocked() {return hasUpgrade("t1",31)},
		},
	},
	buyables:{
		11:{
			title:"时间肥皂",
			cost(x){return new Decimal(2.5).mul(x.pow(2))},
			canAfford(){return player[this.layer].points.gte(this.cost())},
			display(){return "你有"+format(getBuyableAmount(this.layer,this.id),0)+"块肥皂\n\n使得时间泡沫获取"+format(this.effect())+"x\n成本："+format(this.cost(getBuyableAmount(this.layer,this.id)))+" 时间泡沫"},
			buy(){
				player[this.layer].points=player[this.layer].points.sub(this.cost())
				addBuyables(this.layer,this.id,1)
			},
			unlocked() {return hasUpgrade("t1",23)},
			effect(){
				var mult=getBuyableAmount(this.layer,this.id).pow(1.25)
				if(hasUpgrade("t1",32)) mult=mult.times(5)
				return mult
			},
		},
	},
	clickables:{
		11:{
			title:"时间泡泡",
			clicks: new Decimal(1),
			display(){return "点击以产生泡泡\n时间泡泡使得时间点获取量"+format(tmp[this.layer].clickables[11].effect)+"x"},
			effect(){
				var mult=this.clicks.pow(0.2)
				if(hasUpgrade("t1",31)) mult=mult.mul(5)
				return mult
			},
			canClick(){return true},
			onClick(){this.clicks=this.clicks.add(1)},
			onHold(){this.clicks=this.clicks.add(1)},
			unlocked() {return hasUpgrade("t1",24)},
		}
	}
})
addLayer("s1", {
	tabFormat: {
		"Main":{
			content: [
				"main-display",
				"prestige-button",
				"blank",
				"upgrades"
			],
		},
		"Buyables":{
			content: [
				"main-display",
				"buyables"
			],
		},
		"Clickables":{
			content:[
				"main-display",
				"clickables"
			],
		},
	},
	name: "空间泡沫", // This is optional, only used in a few places, If absent it just uses the layer id.
	symbol: "S1", // This appears on the layer's node. Default is the id with the first letter capitalized
	position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
	startData() { return {
		unlocked: false,
		points: new Decimal(0),
	}},
	color: "#00A2D8",
	requires: new Decimal("1e10"), // Can be a function that takes requirement increases into account
	resource: "空间泡沫", // Name of prestige currency
	baseResource: "时间泡沫", // Name of resource prestige is based on
	baseAmount() {return player.t1.points}, // Get the current amount of baseResource
	type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	exponent: 0.5, // Prestige currency exponent
	gainMult() { // Calculate the multiplier for main currency from bonuses
		mult = new Decimal(1)
		mult = mult.times(buyableEffect("s1",11)+1)
		return mult
	},
	gainExp() { // Calculate the exponent on main currency from bonuses
		return new Decimal(1)
	},
	row: 1, // Row the layer is in on the tree (0 is the first row)
	displayRow: 1,
	hotkeys: [
		{key: "s", description: "S: 重置以获得空间泡沫", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
	],
	layerShown(){return true},
	upgrades:{
		11:{
			title: "开辟空间",
			description: "使时间点 2x 更多",
			cost: new Decimal(1),
			//fullDisplay() {
			//	return this.title+this.description
			//},
			//style: {background: "white"},
			//tooltip: "nothing",
			unlocked() {return true},
		},
		12:{
			title: "更广阔的空间",
			description: "使时间泡沫 2x 更多",
			cost: new Decimal(3),
			unlocked() {return hasUpgrade("s1",11)},
		},
	},
	buyables:{
		11:{
			title:"空间肥皂",
			cost(x){return new Decimal(5).mul(x.add(1))},
			canAfford(){return player[this.layer].points.gte(this.cost())},
			display(){return "你有"+format(getBuyableAmount(this.layer,this.id),0)+"块肥皂\n\n使得空间泡沫获取"+format(this.effect())+"x\n成本："+format(this.cost(getBuyableAmount(this.layer,this.id)))+" 空间泡沫"},
			buy(){
				player[this.layer].points=player[this.layer].points.sub(this.cost())
				addBuyables(this.layer,this.id,1)
			},
			effect(){return getBuyableAmount(this.layer,this.id).pow(0.5)}
		},
	},
	clickables:{
		11:{
			title:"空间泡泡",
			clicks: new Decimal(1),
			display(){return "点击以产生泡泡\n空间泡泡使得时间泡沫获取量"+format(tmp[this.layer].clickables[11].effect)+"x"},
			effect(){return this.clicks.pow(0.05)},
			canClick(){return true},
			onClick(){this.clicks=this.clicks.add(1)},
			onHold(){if(player.ClickCheat) this.clicks=new Decimal("1e100")},
		}
	}
})