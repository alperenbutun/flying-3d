import * as THREE from 'three';

import { GLTFLoader } from 'https://rawcdn.githack.com/mrdoob/three.js/master/examples/jsm/loaders/GLTFLoader.js';

let flightList 		   = [];
let flightSprite 	   = [];
let flightMuzzle 	   = [];
let flightModel 	   = "";
let fps 			   = {count:0, total:0};	
let continueGame 	   = true;

let scene 		   	   = new THREE.Scene();
let DirectionalLight   = new THREE.DirectionalLight(0xffffff, 8);
scene.background 	   = new THREE.CubeTextureLoader().setPath("texture/cubemap/").load(["right.jpeg", 'left.jpeg', 'top.jpeg', "bottom.jpeg", "front.jpeg", "back.jpeg"]);
scene.add(DirectionalLight);

let camera   = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10000);
let canvas   = document.getElementById("map");
let ctx      = canvas.getContext('2d');

let map    	 = new THREE.TextureLoader().load('texture/gunmuzzle.png');
let sprite 	 = new THREE.Sprite(new THREE.SpriteMaterial({map: map}));
sprite.scale.set(10,10,10);

let muzzlemap= new THREE.TextureLoader().load('texture/gunflash.png');
let muzzle 	 = new THREE.Sprite(new THREE.SpriteMaterial({map: muzzlemap}));
muzzle.scale.set(18,18,18);

const renderer = new THREE.WebGLRenderer();
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setSize(window.innerWidth, window.innerHeight);
window.addEventListener("resize", onWindowResize);
function onWindowResize() {
	renderer.setSize(window.innerWidth, window.innerHeight);
}

const gl = new THREE.TextureLoader().load('https://rawcdn.githack.com/alperenbutun/free-time-project/f881038/texture/texture.jpg');
const gg = new THREE.PlaneGeometry(150000, 150000);
const gm = new THREE.MeshPhongMaterial({'color': 0xffffff,'map': gl,'transparent': true,'opacity': 0.015});
const ground = new THREE.Mesh(gg, gm);
ground.rotation.x = -Math.PI / (2);
ground.material.map.repeat.set(64, 64);
ground.material.map.wrapS = THREE.RepeatWrapping;
ground.material.map.wrapT = THREE.RepeatWrapping;
ground.material.map.colorSpace = THREE.SRGBColorSpace;
scene.add(ground);

new GLTFLoader().load("https://rawcdn.githack.com/alperenbutun/free-time-project/0fd02c4/gltf/f35.glb", function (gltf) {
  
	flightModel = gltf.scene;
	flightModel.traverse(mesh => {
		if (mesh.material) {
			mesh.material.color.r = 0;
			mesh.material.color.g = 0;
			mesh.material.color.b = 0;
		}
	});
  
	for (let i=0; i<8; i++) {
		
		flightList[flightList.length] = {
			'id': i,
			'name': "flight" + i,
			'rotate': '|',
			'autopilot': false,
			'hit': 0,
			'hadhit': 0,
			'percentage': 100,
			'clickList': []
		};
		
		let cloned 			  	 = flightModel.clone();
			cloned.name 	  	 = "flight"+i;
			cloned.position.set(Math.round(Math.random() * 5000) - 2500, 0, Math.round(Math.random() * 5000) - 2500);
			cloned.rotation.y  	 = Math.random() * Math.PI * 2;
			
		let clonedsprite 		 = sprite.clone();
			clonedsprite.name 	 = "sprite"+i;
			clonedsprite.visible = false;
			
		let clonedmuzzle 		 = muzzle.clone();
			clonedmuzzle.name 	 = "muzzle"+i;
			clonedmuzzle.visible = false;
			
		let elementdiv = document.createElement("span");
		elementdiv.id = "flight-div-"+i;
		elementdiv.style.position = "absolute";
		elementdiv.style.width = "100px";
		elementdiv.style.textAlign = "center";
		elementdiv.style.height = "auto";
		elementdiv.style.fontWeight = "bold";
		elementdiv.style.userSelect = "none";
		elementdiv.style.letterSpacing = "1px";
		elementdiv.style.fontFamily = "Verdana";
		elementdiv.style.fontSize = "12px";
		elementdiv.style.display = "none";
		document.body.appendChild(elementdiv);
		
		scene.add(clonedsprite);
		scene.add(clonedmuzzle);
		scene.add(cloned);
	}

	document.querySelector('#fullscreen-button').style.display = "block";
  
}, function (progress) {
	let percentage = Math.ceil(progress.loaded / progress.total * 100);
	document.querySelector("span#percentage").innerHTML = " " + percentage + "% (" + Math.floor(32 * percentage / 100) + "MB of 32MB) please wait...";
});

window.startTheGame = function () {
	
	document.querySelector("#fullscreen-button").style.display = "none";
	
	document.querySelector("#map").style.display = "block";
	
	if (document.body.requestFullscreen) {
		document.body.requestFullscreen();
	} else if (document.body.webkitRequestFullscreen) {
		document.body.webkitRequestFullscreen();
	} else if (document.body.msRequestFullscreen) {
		document.body.msRequestFullscreen();
	}
	
	setInterval(function () {
		if (!continueGame) {
			return;
		}
		let tablelist = [];
		ctx.clearRect(0, 0, 125, 125);
		for (let index = 0; index < flightList.length; index++) {
			tablelist[tablelist.length] = flightList[index];
			if (flightList[index].percentage <= 0) {
				continue;
			}
			let theflight   = scene.getObjectByName(flightList[index].name);
			let mapdata     = [Math.floor(theflight.position.x / 80) + 62.5, Math.floor(theflight.position.z / 80) + 62.5];
			ctx.fillStyle   = index == 0 ? 'red' : "black";
			ctx.strokeStyle = index == 0 ? 'red' : "black";
			ctx.beginPath();
			ctx.arc(mapdata[0], mapdata[1], 3, 0, 2 * Math.PI);
			ctx.fill();
			ctx.stroke();
		}
		tablelist.sort(function (a, b) {
			return b.percentage - a.percentage;
		});
		document.querySelector("#table").innerHTML = '';
		for (let index = 0; index < tablelist.length; index++) {
			let fontWeight 	   = (tablelist[index].id == 0) ? "700" : "normal";
			let textDecoration = (tablelist[index].percentage <= 0) ? "line-through" : "none";
			document.querySelector('#table').innerHTML += "<div style=\"position:relative;float:left;width:100%;height:32px;\"><span style=\"position:relative;float:left;left:11px;top:5px;text-decoration:"+textDecoration+";font-weight:" + fontWeight + "\">" + tablelist[index].name + "</span><span style=\"position:relative;float:right;right:11px;text-decoration:"+textDecoration+";top:5px;\">" + tablelist[index].percentage + "%</span></div>";
		}
	}, 500);

	setTimeout(function () {
	  
		document.body.appendChild(renderer.domElement);
		document.querySelector('span#loading').style.display = 'none';

		setInterval(function() {
			if (!continueGame) {
				return;
			}
			let flag = [];
			for (let i=0; i<flightList.length; i ++) {
				if (flightList[i].percentage <= 0) {
					continue;
				}
				flightSprite[i] = scene.getObjectByName("sprite"+i);
				let clickList = flightList[i].clickList;
				if (clickList.length) {
					flightSprite[i].visible = (flightSprite[i].visible == false) ? true : false;
					for (let index=0; index<clickList.length; index ++) {
						if (flightList[clickList[index]].percentage <= 0) {
							continue;
						}
						flightList[i].hit    		  		  	+= 1;
						flightList[clickList[index]].hadhit   	+= 1;
						flightList[clickList[index]].percentage  = Math.round(100 - (flightList[clickList[index]].hadhit/10));
						if (flightList[clickList[index]].percentage <= 0) {
							flightList[clickList[index]].percentage = 0;
							scene.remove(scene.getObjectByName("sprite"+clickList[index]));
							scene.remove(scene.getObjectByName("flight"+clickList[index]));
							document.querySelector("#flight-div-"+clickList[index]).outerHTML = '';
							scene.getObjectByName("muzzle"+clickList[index]).visible = true;
						}
						flag[clickList[index]] = true;
					}
				} else {
					flightSprite[i].visible = false;
				}
			}
			for (let i=0; i<flightList.length; i ++) {
				if (flightList[i].percentage <= 0) {
					continue;
				}
				flightMuzzle[i] = scene.getObjectByName("muzzle"+i);
				if (typeof flag[i] != "undefined") {
					flightMuzzle[i].visible = (flightMuzzle[i].visible == false) ? true : false;
				} else {
					flightMuzzle[i].visible = false;
				}
			}
		}, 50);

		animate();

	}, 550);
  
	document.addEventListener("mousedown", function (event) {
		if (!continueGame) {
			return;
		}
		switch (event.which) {
			case 1:
				if (!flightList[0].autopilot) {
					if (event.clientX < window.innerWidth * 0.5) {
						flightList[0].rotate = '<';
					} else {
						flightList[0].rotate = '>';
					}
				}
				break;
		}
	});
	
	document.addEventListener("mouseup", function (event) {
		if (!continueGame) {
			return;
		}
		switch (event.which) {
			case 1:
				if (!flightList[0].autopilot) {
					flightList[0].rotate = '|';
				}
				break;
		}
	});
	
	document.addEventListener("pointerdown", function (event) {
		if (!continueGame) {
			return;
		}
		if (!flightList[0].autopilot) {
			if (event.clientX < window.innerWidth * 0.5) {
				flightList[0].rotate = '<';
			} else {
				flightList[0].rotate = '>';
			}
		}
	});
	
	document.addEventListener("pointerup", function (event) {
		if (!continueGame) {
			return;
		}
		if (!flightList[0].autopilot) {
			flightList[0].rotate = '|';
		}
	});
	
	document.addEventListener('contextmenu', function (event) {
		event.preventDefault();
	});
	
	document.addEventListener('keydown', function (event) {
		if (!continueGame) {
			return;
		}
		switch (event.keyCode) {
			case 9:
				event.preventDefault();
				document.querySelector("#table").style.display 		= 'block';
				document.querySelector("#table-head").style.display = 'block';
				break;
		}
	});
	
	document.addEventListener('keyup', function (event) {
		if (!continueGame) {
			return;
		}
		switch (event.keyCode) {
			case 9:
				event.preventDefault();
				document.querySelector("#table").style.display       = "none";
				document.querySelector("#table-head").style.display  = "none";
				break;
		}
	});

};

function animate() {
	
	requestAnimationFrame(animate);
	
	if (!continueGame) {
		return;
	}
	
	for (let i = 0; i < flightList.length; i++) {
		
		if (flightList[i].percentage <= 0) {
			continue;
		}
		
		let theflight = scene.getObjectByName(flightList[i].name);
		if (flightList[i].rotate === '<') {
			theflight.rotation.z -= Math.PI / 36;
			if (theflight.rotation.z <= -Math.PI / 2.6) {
				theflight.rotation.z = -Math.PI / 2.6;
			}
			theflight.rotation.y += Math.PI / 270;
		} else if (flightList[i].rotate === '>') {
			theflight.rotation.z += Math.PI / 36;
			if (theflight.rotation.z >= Math.PI / 2.6) {
				theflight.rotation.z = Math.PI / 2.6;
			}
			theflight.rotation.y -= Math.PI / 270;
		} else if (flightList[i].rotate === '<<' && theflight.rotation.z == 0) {
			theflight.rotation.y += Math.PI / 810;
		} else if (flightList[i].rotate === '>>' && theflight.rotation.z == 0) {
			theflight.rotation.y -= Math.PI / 810;
		} else {
			if (Math.abs(theflight.rotation.z) < Math.PI / 36) {
				theflight.rotation.z = 0;
			} else if (theflight.rotation.z > 0) {
				theflight.rotation.z -= Math.PI / 36;
			} else if (theflight.rotation.z < 0) {
				theflight.rotation.z += Math.PI / 36;
			}
		}

		let rotationz = -theflight.rotation.y * (180 / Math.PI) % 360;
		rotationz = rotationz < 0 ? 360 + rotationz : rotationz;
		
		if (theflight.position.z >= 5000) {
			if (flightList[i].autopilot == false) {
				flightList[i].autopilot = true;
				if (rotationz >= 0 && rotationz <= 90) {
					flightList[i].rotate = '>';
				} else {
					flightList[i].rotate = '<';
				}
			}
		} else if (theflight.position.z <= -5000) {
			if (flightList[i].autopilot == false) {
				flightList[i].autopilot = true;
				if (rotationz >= 180 && rotationz <= 270) {
					flightList[i].rotate = '>';
				} else {
					flightList[i].rotate = '<';
				}
			}
		} else if (theflight.position.x >= 5000) {
			if (flightList[i].autopilot == false) {
				flightList[i].autopilot = true;
				if (rotationz >= 270 && rotationz <= 360) {
					flightList[i].rotate = '>';
				} else {
					flightList[i].rotate = '<';
				}
			}
		} else if (theflight.position.x <= -5000) {
			if (flightList[i].autopilot == false) {
				flightList[i].autopilot = true;
				if (rotationz >= 90 && rotationz < 180) {
					flightList[i].rotate = '>';
				} else {
					flightList[i].rotate = '<';
				}
			}
		} else if (flightList[i].autopilot == true) {
			flightList[i].rotate = '|';
			flightList[i].autopilot = false;
		}
		  
		theflight.translateZ(10);
		
		if (i == 0) {
			camera.position.set(theflight.position.x, theflight.position.y, theflight.position.z);
			camera.rotation.y = theflight.rotation.y + Math.PI;
			camera.translateZ(24);
			camera.translateY(2.4);
		}
		
		let sprite = scene.getObjectByName("sprite" + i);
			sprite.position.set(theflight.position.x, theflight.position.y+0.59, theflight.position.z);
			sprite.rotation.y = theflight.rotation.y;
			sprite.translateZ(5);
			sprite.translateX(-0.39);
			
		let muzzle = scene.getObjectByName("muzzle" + i);
			muzzle.position.set(theflight.position.x, theflight.position.y, theflight.position.z);
			muzzle.rotation.y = theflight.rotation.y;
			
		flightList[i].clickList = [];
		for (let index=0;index<flightList.length;index ++) {
			if (i == index) {
				continue;
			}
			
			if (flightList[index].percentage <= 0) {
				continue;
			}
			
			let durumtext, durumcolor;
			let otherflight = scene.getObjectByName(flightList[index].name);
			let otherdegree = Math.atan2(otherflight.position.x - theflight.position.x, otherflight.position.z - theflight.position.z) * (180 / Math.PI);
			let distance    = Math.sqrt(Math.pow(theflight.position.x - otherflight.position.x,2)+Math.pow(theflight.position.z - otherflight.position.z,2));
			otherdegree 	= (otherdegree < 0) ? Math.abs(otherdegree) + 180 : Math.abs(otherdegree - 180);
			rotationz       = rotationz;
			
			if (distance > 1900) {
				durumtext = "FAR: " + ((distance-1900)/1000).toFixed(2);
				durumcolor= "yellow";
			} else if (Math.abs(otherdegree - rotationz) > 170 && Math.abs(otherdegree - rotationz) < 190) {
				durumtext = "LOCKED";
				durumcolor= "#ff0000";
				flightList[i].clickList.push(index);
			} else {
				durumtext = "AIM";
				durumcolor= "#f0f0f0";
			}
			
			if (i == 0) {
				let width = window.innerWidth, height = window.innerHeight;
				let widthHalf = width / (2), heightHalf = height / (2);
				let pos = otherflight.position.clone();
				pos.project(camera);
				pos.x = ( pos.x * widthHalf ) + widthHalf;
				pos.y = - ( pos.y * heightHalf ) + heightHalf;					
				let leftvalue = pos.x;
				let topvalue  = pos.y;
				if (leftvalue > 0 && leftvalue < window.innerWidth && Math.abs(otherdegree - rotationz) > 90 && Math.abs(otherdegree - rotationz) < 270) {
					document.querySelector("#flight-div-"+index).style.left = (leftvalue - 50) + "px";
					document.querySelector("#flight-div-"+index).style.top  = (topvalue  - 50) + "px";
					document.querySelector("#flight-div-"+index).style.display = 'block';
					document.querySelector("#flight-div-"+index).style.color = durumcolor;
					document.querySelector("#flight-div-"+index).innerHTML = durumtext;
				} else {
					document.querySelector("#flight-div-"+index).style.display = 'none';
				}
			}
		}
	}
	renderer.render(scene, camera); 
}