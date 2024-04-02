import * as _0xc385e8 from 'three';
import { GLTFLoader } from 'https://rawcdn.githack.com/mrdoob/three.js/master/examples/jsm/loaders/GLTFLoader.js';
let flightModel = '';
let flightSprite = [];
let flightList = [];
let countdown = 0x16d;
let continueGame = true;
let scene = new _0xc385e8.Scene();
let DirectionalLight = new _0xc385e8.DirectionalLight(0xffffff, 0x8);
scene.background = new _0xc385e8.CubeTextureLoader().setPath("texture/cubemap/").load(["right.jpeg", "left.jpeg", "top.jpeg", 'bottom.jpeg', "front.jpeg", "back.jpeg"]);
scene.add(DirectionalLight);
let camera = new _0xc385e8.PerspectiveCamera(0x32, window.innerWidth / window.innerHeight, 0.1, 0x2710);
let canvas = document.getElementById("map");
let ctx = canvas.getContext('2d');
let map = new _0xc385e8.TextureLoader().load("https://rawcdn.githack.com/alperenbutun/free-time-project/61618a8/texture/flash.png");
let sprite = new _0xc385e8.Sprite(new _0xc385e8.SpriteMaterial({
  'map': map
}));
sprite.scale.set(0xa, 0xa, 0xa);
const renderer = new _0xc385e8.WebGLRenderer();
renderer.outputEncoding = _0xc385e8.sRGBEncoding;
renderer.setSize(window.innerWidth, window.innerHeight);
window.addEventListener("resize", onWindowResize);
function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
}
function printCountDown() {
  if (!continueGame) {
    return;
  }
  if (Math.floor(countdown) == countdown) {
    let _0x94fa0f = Math.floor(countdown / 0x3c);
    let _0x31842f = countdown - Math.floor(countdown / 0x3c) * 0x3c;
    document.querySelector("span#countdown").innerHTML = _0x94fa0f + ':' + (_0x31842f < 0xa ? '0' + _0x31842f : _0x31842f);
    if (countdown == 0x0) {
      continueGame = false;
      document.querySelector("#table").style.display = "block";
      document.querySelector("#table-head").style.display = 'block';
      document.querySelector('div#tab-text').style.display = "none";
      return;
    }
  }
}
function clicked(_0x5cc0fe, _0x253359) {
  if (!continueGame) {
    return;
  }
  if (flightList[_0x5cc0fe].rotate == '<' || flightList[_0x5cc0fe].rotate == '>') {
    return;
  }
  if (_0x253359 == 0x0) {
    clearInterval(flightList[_0x5cc0fe].clickInterval);
  } else {
    flightSprite[_0x5cc0fe] = scene.getObjectByName("sprite" + _0x5cc0fe);
    flightSprite[_0x5cc0fe].visible = true;
    flightList[_0x5cc0fe].bullet++;
    setTimeout(function () {
      flightSprite[_0x5cc0fe].visible = false;
      document.querySelector("span#bullet-text").innerHTML = flightList[_0x5cc0fe].bullet;
    }, 0x23);
    clearInterval(flightList[_0x5cc0fe].clickInterval);
    flightList[_0x5cc0fe].clickInterval = setInterval(function () {
      flightSprite[_0x5cc0fe].visible = true;
      flightList[_0x5cc0fe].bullet++;
      setTimeout(function () {
        flightSprite[_0x5cc0fe].visible = false;
        document.querySelector("span#bullet-text").innerHTML = flightList[_0x5cc0fe].bullet;
      }, 0x23);
    }, 0x46);
  }
}
const gl = new _0xc385e8.TextureLoader().load("https://rawcdn.githack.com/alperenbutun/free-time-project/f881038/texture/texture.jpg");
const gg = new _0xc385e8.PlaneGeometry(0x249f0, 0x249f0);
const gm = new _0xc385e8.MeshPhongMaterial({
  'color': 0xffffff,
  'map': gl,
  'transparent': true,
  'opacity': 0.01
});
const ground = new _0xc385e8.Mesh(gg, gm);
ground.rotation.x = -Math.PI / 0x2;
ground.material.map.repeat.set(0x40, 0x40);
ground.material.map.wrapS = _0xc385e8.RepeatWrapping;
ground.material.map.wrapT = _0xc385e8.RepeatWrapping;
ground.material.map.colorSpace = _0xc385e8.SRGBColorSpace;
scene.add(ground);
new GLTFLoader().load('https://rawcdn.githack.com/alperenbutun/free-time-project/master/gltf/f35.glb', function (_0x438c68) {
  flightModel = _0x438c68.scene;
  flightModel.traverse(_0x33fc14 => {
    if (_0x33fc14.material) {
      _0x33fc14.material.color.r = 0x0;
      _0x33fc14.material.color.g = 0x0;
      _0x33fc14.material.color.b = 0x0;
    }
  });
  for (let _0x1b0c64 = 0x0; _0x1b0c64 < 0x8; _0x1b0c64++) {
    flightList[flightList.length] = {
      'name': "flight" + _0x1b0c64,
      'rotate': '|',
      'autopilot': false,
      'bullet': 0x0,
      'hit': 0x0,
      'gothit': 0x0,
      'average': 0x0,
      'clickInterval': ''
    };
    let _0x2b60eb = flightModel.clone();
    _0x2b60eb.name = "flight" + _0x1b0c64;
    _0x2b60eb.position.set(Math.round(Math.random() * 0x1388) - 0x9c4, 0x3, Math.round(Math.random() * 0x1388) - 0x9c4);
    _0x2b60eb.rotation.y = Math.random() * Math.PI * 0x2;
    let _0x2e3528 = sprite.clone();
    _0x2e3528.name = 'sprite' + _0x1b0c64;
    _0x2e3528.visible = false;
    scene.add(_0x2e3528);
    scene.add(_0x2b60eb);
  }
  document.querySelector("#fullscreen-button").style.display = "block";
}, function (_0x4e6ad8) {
  let _0x199c27 = Math.ceil(_0x4e6ad8.loaded / _0x4e6ad8.total * 0x64);
  document.querySelector("span#percentage").innerHTML = " " + _0x199c27 + "% (" + Math.floor(0x20 * _0x199c27 / 0x64) + "MB of 32MB) please wait...";
});
window.startTheGame = function () {
  document.querySelector("#fullscreen-button").style.display = "none";
  setTimeout(function () {
    document.body.appendChild(renderer.domElement);
    document.querySelector("span#loading").style.display = "none";
    document.querySelector("canvas#map").style.display = "block";
    document.querySelector("div#bullet").style.display = "block";
    document.querySelector("div#game").style.display = 'block';
    document.querySelector("div#tab-text").style.display = "block";
    animate();
  }, 0x1f4);
  document.addEventListener("mousedown", function (_0x3aabcf) {
    if (!continueGame) {
      return;
    }
    switch (_0x3aabcf.which) {
      case 0x1:
        if (!flightList[0x0].autopilot) {
          if (_0x3aabcf.clientX < _0x3aabcf.target.clientWidth * 0.5) {
            if (_0x3aabcf.clientX - _0x3aabcf.target.clientWidth * 0.5 > -0x7b) {
              flightList[0x0].rotate = '<<';
            } else {
              flightList[0x0].rotate = '<';
            }
          } else if (_0x3aabcf.clientX - _0x3aabcf.target.clientWidth * 0.5 < 0x7b) {
            flightList[0x0].rotate = '>>';
          } else {
            flightList[0x0].rotate = '>';
          }
        }
        break;
      case 0x2:
        clicked(0x0, 0x1);
        break;
      case 0x3:
        clicked(0x0, 0x1);
        break;
    }
  });
  document.addEventListener("mouseup", function (_0x445e44) {
    if (!continueGame) {
      return;
    }
    switch (_0x445e44.which) {
      case 0x1:
        if (!flightList[0x0].autopilot) {
          flightList[0x0].rotate = '|';
        }
        break;
      case 0x2:
        clicked(0x0, 0x0);
        break;
      case 0x3:
        clicked(0x0, 0x0);
        break;
    }
  });
  document.addEventListener("contextmenu", function (_0x164ec4) {
    if (!continueGame) {
      return;
    }
    _0x164ec4.preventDefault();
  });
  document.addEventListener("keydown", function (_0x167d85) {
    if (!continueGame) {
      return;
    }
    switch (_0x167d85.keyCode) {
      case 0x9:
        _0x167d85.preventDefault();
        document.querySelector("#table").style.display = "block";
        document.querySelector('#table-head').style.display = "block";
        document.querySelector("div#tab-text").style.display = "none";
        break;
    }
  });
  document.addEventListener("keyup", function (_0x488d6a) {
    if (!continueGame) {
      return;
    }
    switch (_0x488d6a.keyCode) {
      case 0x9:
        _0x488d6a.preventDefault();
        document.querySelector("#table").style.display = "none";
        document.querySelector('#table-head').style.display = "none";
        document.querySelector("div#tab-text").style.display = 'block';
        break;
    }
  });
  setInterval(function () {
    if (!continueGame) {
      return;
    }
    let _0xaff39e = [];
    ctx.clearRect(0x0, 0x0, 0x7d, 0x7d);
    for (let _0x3c66c5 = 0x0; _0x3c66c5 < flightList.length; _0x3c66c5++) {
      let _0x114afc = scene.getObjectByName(flightList[_0x3c66c5].name);
      let _0x552254 = [Math.floor(_0x114afc.position.x / 0x50) + 62.5, Math.floor(_0x114afc.position.z / 0x50) + 62.5];
      ctx.fillStyle = _0x3c66c5 == 0x0 ? 'red' : "black";
      ctx.strokeStyle = _0x3c66c5 == 0x0 ? "red" : "black";
      ctx.beginPath();
      ctx.arc(_0x552254[0x0], _0x552254[0x1], 0x3, 0x0, 0x2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      flightList[_0x3c66c5].average = flightList[_0x3c66c5].hit - flightList[_0x3c66c5].gothit;
      _0xaff39e[_0xaff39e.length] = flightList[_0x3c66c5];
    }
    _0xaff39e.sort(function (_0xa462d9, _0x3b142e) {
      return _0x3b142e.average - _0xa462d9.average;
    });
    document.querySelector("#table").innerHTML = '';
    for (let _0x508623 = 0x0; _0x508623 < _0xaff39e.length; _0x508623++) {
      let _0x196aaf = _0x508623 == 0x0 ? "700" : "normal";
      document.querySelector("#table").innerHTML += "<div style=\"position:relative;float:left;width:100%;height:32px;\"><span style=\"position:relative;float:left;left:11px;top:5px;font-weight:" + _0x196aaf + "\">" + _0xaff39e[_0x508623].name + "</span><span style=\"position:relative;float:right;right:11px;top:5px;\">" + _0xaff39e[_0x508623].hit + '/' + _0xaff39e[_0x508623].gothit + " > " + _0xaff39e[_0x508623].average + "</span></div>";
    }
    if (countdown > 0x0) {
      countdown -= 0.5;
      printCountDown();
    }
  }, 0x1f4);
};
let date = new Date().getTime();
let count =0;
function animate() {
  requestAnimationFrame(animate);
  if (!continueGame) {
    return;
  }
  
count++;
if (count % 2 == 0) {
  	return;
  } 
  
  document.title = new Date().getTime() - date;
  date = new Date().getTime();

  for (let _0xce61eb = 0x0; _0xce61eb < flightList.length; _0xce61eb++) {
    let _0x1be16c = scene.getObjectByName(flightList[_0xce61eb].name);
    if (flightList[_0xce61eb].rotate === '<') {
      _0x1be16c.rotation.z -= Math.PI / 0x24;
      if (_0x1be16c.rotation.z <= -Math.PI / 2.6) {
        _0x1be16c.rotation.z = -Math.PI / 2.6;
        _0x1be16c.rotation.y += Math.PI / 0x10e;
      }
    } else {
      if (flightList[_0xce61eb].rotate === '>') {
        _0x1be16c.rotation.z += Math.PI / 0x24;
        if (_0x1be16c.rotation.z >= Math.PI / 2.6) {
          _0x1be16c.rotation.z = Math.PI / 2.6;
          _0x1be16c.rotation.y -= Math.PI / 0x10e;
        }
      } else {
        if (flightList[_0xce61eb].rotate === '<<' && _0x1be16c.rotation.z == 0x0) {
          _0x1be16c.rotation.y += Math.PI / 0x438;
        } else {
          if (flightList[_0xce61eb].rotate === '>>' && _0x1be16c.rotation.z == 0x0) {
            _0x1be16c.rotation.y -= Math.PI / 0x438;
          } else {
            if (Math.abs(_0x1be16c.rotation.z) < Math.PI / 0x24) {
              _0x1be16c.rotation.z = 0x0;
            } else {
              if (_0x1be16c.rotation.z > 0x0) {
                _0x1be16c.rotation.z -= Math.PI / 0x24;
              } else if (_0x1be16c.rotation.z < 0x0) {
                _0x1be16c.rotation.z += Math.PI / 0x24;
              }
            }
          }
        }
      }
    }
    let _0x189e86 = -_0x1be16c.rotation.y * (0xb4 / Math.PI) % 0x168;
    _0x189e86 = _0x189e86 < 0x0 ? 0x168 + _0x189e86 : _0x189e86;
    if (_0x1be16c.position.z >= 0x1388) {
      if (flightList[_0xce61eb].autopilot == false) {
        flightList[_0xce61eb].autopilot = true;
        if (_0x189e86 >= 0x0 && _0x189e86 <= 0x5a) {
          flightList[_0xce61eb].rotate = '>';
        } else {
          flightList[_0xce61eb].rotate = '<';
        }
      }
    } else {
      if (_0x1be16c.position.z <= -0x1388) {
        if (flightList[_0xce61eb].autopilot == false) {
          flightList[_0xce61eb].autopilot = true;
          if (_0x189e86 >= 0xb4 && _0x189e86 <= 0x10e) {
            flightList[_0xce61eb].rotate = '>';
          } else {
            flightList[_0xce61eb].rotate = '<';
          }
        }
      } else {
        if (_0x1be16c.position.x >= 0x1388) {
          if (flightList[_0xce61eb].autopilot == false) {
            flightList[_0xce61eb].autopilot = true;
            if (_0x189e86 >= 0x10e && _0x189e86 <= 0x168) {
              flightList[_0xce61eb].rotate = '>';
            } else {
              flightList[_0xce61eb].rotate = '<';
            }
          }
        } else {
          if (_0x1be16c.position.x <= -0x1388) {
            if (flightList[_0xce61eb].autopilot == false) {
              flightList[_0xce61eb].autopilot = true;
              if (_0x189e86 >= 0x5a && _0x189e86 <= 0xb4) {
                flightList[_0xce61eb].rotate = '>';
              } else {
                flightList[_0xce61eb].rotate = '<';
              }
            }
          } else if (flightList[_0xce61eb].autopilot == true) {
            flightList[_0xce61eb].rotate = '|';
            flightList[_0xce61eb].autopilot = false;
          }
        }
      }
    }
    _0x1be16c.translateZ(0x8);
    if (_0xce61eb == 0x0) {
      camera.position.set(_0x1be16c.position.x, _0x1be16c.position.y, _0x1be16c.position.z);
      camera.rotation.y = _0x1be16c.rotation.y + Math.PI;
      camera.translateZ(0x18);
      camera.translateY(2.4);
    }
    let _0x6534c2 = scene.getObjectByName("sprite" + _0xce61eb);
    _0x6534c2.position.set(_0x1be16c.position.x, _0x1be16c.position.y + 0.59, _0x1be16c.position.z);
    _0x6534c2.rotation.y = _0x1be16c.rotation.y;
    _0x6534c2.translateZ(0x5);
    _0x6534c2.translateX(-0.39);
  }
  renderer.render(scene, camera);
}
