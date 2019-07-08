// Rain Background Effect

(function(){
	var $ = (function(elm){
		return document.querySelector(elm);
	}),
	Rain = function(){
		var num = (Math.min(window.innerWidth, window.innerHeight) / Math.max(window.innerWidth, window.innerHeight)) * 1700,
			 raindrop = function(x, y, r, s){
				var speed = {
					min: (c.width / c.height / 7),
					max: (c.width / c.height / 3)
				};
				return {
					radius: r || .5,
					pos: {
						x: x || Math.random() * c.width,
						y: y || -5
					},
					speed: s || Math.random() * (speed.max - speed.min) + speed.min
				}
			},
			drops = [],
			draw = function(drop, i){
				ctx.fillStyle = "rgba(255, 255, 255, .9)";
				ctx.beginPath();
				ctx.arc(drop.pos.x, drop.pos.y, drop.radius, 0, Math.PI * 2);
				ctx.fill();
				var newDrop = drop;
				for(var j = 0; j < drops.length; j++){
					if(
						drop != drops[j] &&
						Math.sqrt(
							(drop.pos.x - drops[j].pos.x) * (drop.pos.x - drops[j].pos.x) + 
							(drop.pos.y - drops[j].pos.y) * (drop.pos.y - drops[j].pos.y)
						) < drop.radius * 2 + drops[j].radius * 2
					){
						var pos = (~~(Math.random() * 2) ? drop.pos : drops[j].pos);
						newDrop = new raindrop(pos.x, pos.y, drop.radius + drops[j].radius);
						newDrop.speed = Math.max(drop.speed, drops[j].speed) + .1;
						drops.push(newDrop);
						drops.splice(i, 1);
						drops.splice(j, 1);
					}
				}
				
				if(newDrop.pos.y >= c.height){
					drops.splice(i, 1);
					drops.push(new raindrop());
				}
				else newDrop.pos.y += newDrop.speed;
			}
		return {
			init: function(){
				for(var i = 0; i < num; i++){
					drops.push(new raindrop(Math.random() * c.width, Math.random() * c.height));
				}
			},
			move: function(){
				setInterval(function(){
					ctx.clearRect(0, 0, c.width, c.height);
					background();
					for(var i = 0; i < drops.length; i++){
						draw(drops[i], i);
					}
				}, 1);
			}
		}
	}
	c = $("#sky"),
	background = function(){
		var grdnt = ctx.createLinearGradient(0, 0, 0, c.height);
		grdnt.addColorStop(0, "#135288");
		grdnt.addColorStop(1, "#0C5663");
		ctx.fillStyle = grdnt;
		ctx.fillRect(0, 0, c.width, c.height);
	},
	sky = new Rain();
	sky = new Rain();
	sky = new Rain();
	sky = new Rain();
	sky = new Rain();
	
	c.width = window.innerWidth;
	c.height = window.innerHeight;

	var ctx = c.getContext("2d");
	
	sky.init();
	background();
	sky.move();
	window.addEventListener("resize", function(){
		c.width = window.innerWidth;
		c.height = window.innerHeight;
	}, true);
}());