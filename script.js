import * as _0x1391a9 from 'three';
import { GLTFLoader } from 'https://rawcdn.githack.com/mrdoob/three.js/master/examples/jsm/loaders/GLTFLoader.js';
let flightModel = '';
let hitTextTimeout = '';
let flightList = [];
let countdown = 180;
let continueGame = true;
const scene = new _0x1391a9.Scene();
scene.background = new _0x1391a9.CubeTextureLoader().setPath("texture/cubemap/").load(["right.jpeg", 'left.jpeg', 'top.jpeg', "bottom.jpeg", "front.jpeg", "back.jpeg"]);
const DirectionalLight = new _0x1391a9.DirectionalLight(0xffffff, 0x8);
scene.add(DirectionalLight);
const camera = new _0x1391a9.PerspectiveCamera(0x32, window.innerWidth / window.innerHeight, 0.1, 0x2710);
const geometry = new _0x1391a9.CylinderGeometry(0.19, 0.19, 0x80, 0x40);
const material = new _0x1391a9.MeshBasicMaterial({
  'color': 0xffffff
});
const canvas = document.getElementById("map");
const ctx = canvas.getContext('2d');
const renderer = new _0x1391a9.WebGLRenderer();
renderer.outputEncoding = _0x1391a9.sRGBEncoding;
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
    let _0x136230 = Math.floor(countdown / 0x3c);
    let _0x4ddc9c = countdown - Math.floor(countdown / 0x3c) * 0x3c;
    document.querySelector("span#countdown").innerHTML = _0x136230 + ':' + (_0x4ddc9c < 0xa ? '0' + _0x4ddc9c : _0x4ddc9c);
    if (countdown == 0x0) {
      continueGame = false;
      document.querySelector('#table').style.display = "block";
      document.querySelector("#table-head").style.display = "block";
      document.querySelector("div#tab-text").style.display = "none";
      return;
    }
  }
}
function bullet(_0x553f0a) {
  if (!continueGame) {
    return;
  }
  if (flightList[_0x553f0a].rotate == '<' || flightList[_0x553f0a].rotate == '>' || flightList[_0x553f0a].rotate == '<<' || flightList[_0x553f0a].rotate == '>>' || flightList[_0x553f0a].hararet >= 0x64) {
    return;
  }
  flightList[_0x553f0a].dt.push({
    'name': "flight" + _0x553f0a + '' + new Date().getTime(),
    'moveCount': 0x0
  });
  flightList[_0x553f0a].bullet++;
  flightList[_0x553f0a].hararet += 0x1;
  clearInterval(flightList[_0x553f0a].hararetInterval);
  document.querySelector("#bullet-text").innerHTML = flightList[_0x553f0a].bullet;
  let _0x1505d3 = flightList[_0x553f0a].hararet < 0x4b ? "yellow" : 'red';
  document.querySelector("div#bullet").style.background = "linear-gradient(to top, " + _0x1505d3 + " " + flightList[_0x553f0a].hararet + "%, white " + flightList[_0x553f0a].hararet + '%)';
}
function bulletStop(_0xd55589) {
  if (!continueGame) {
    return;
  }
  clearInterval(flightList[_0xd55589].dtInterval);
  clearInterval(flightList[_0xd55589].hararetInterval);
  flightList[_0xd55589].hararetInterval = setInterval(function () {
    flightList[_0xd55589].hararet -= 0x1;
    if (flightList[_0xd55589].hararet <= 0x0) {
      flightList[_0xd55589].hararet = 0x0;
      clearInterval(flightList[_0xd55589].hararetInterval);
    }
    let _0x547794 = flightList[_0xd55589].hararet < 0x4b ? "yellow" : "red";
    document.querySelector("div#bullet").style.background = "linear-gradient(to top, " + _0x547794 + " " + flightList[_0xd55589].hararet + "%, white " + flightList[_0xd55589].hararet + '%)';
  }, 0x32);
}
const gt = new _0x1391a9.TextureLoader().load('https://rawcdn.githack.com/alperenbutun/free-time-project/f881038/texture/texture.jpg');
const gg = new _0x1391a9.PlaneGeometry(0x249f0, 0x249f0);
const gm = new _0x1391a9.MeshPhongMaterial({
  'color': 0xffffff,
  'map': gt,
  'transparent': true,
  'opacity': 0.025
});
const ground = new _0x1391a9.Mesh(gg, gm);
ground.rotation.x = -Math.PI / 0x2;
ground.material.map.repeat.set(0x40, 0x40);
ground.material.map.wrapS = _0x1391a9.RepeatWrapping;
ground.material.map.wrapT = _0x1391a9.RepeatWrapping;
ground.material.map.colorSpace = _0x1391a9.SRGBColorSpace;
scene.add(ground);
new GLTFLoader().load("https://rawcdn.githack.com/alperenbutun/free-time-project/master/gltf/f35.glb", function (_0x39b89a) {
  flightModel = _0x39b89a.scene;
  flightModel.traverse(_0x2331a4 => {
    if (_0x2331a4.material) {
      _0x2331a4.material.color.r = 0x0;
      _0x2331a4.material.color.g = 0x0;
      _0x2331a4.material.color.b = 0x0;
    }
  });
  for (let _0x48639e = 0x0; _0x48639e < 0x5; _0x48639e++) {
    flightList[flightList.length] = {
      'name': "flight" + _0x48639e,
      'rotate': '|',
      'autopilot': false,
      'dt': [],
      'dtInterval': '',
      'bullet': 0x0,
      'hit': 0x0,
      'gothit': 0x0,
      'average': 0x0,
      'hararet': 0x0,
      'hararetInterval': '',
      'force': 0x0
    };
    let _0x5a3dd0 = flightModel.clone();
    _0x5a3dd0.name = 'flight' + _0x48639e;
    _0x5a3dd0.position.set(Math.round(Math.random() * 0x2328) - 0x1194, 0x5, Math.round(Math.random() * 0x2328) - 0x1194);
    _0x5a3dd0.rotation.y = Math.random() * Math.PI * 0x2;
    scene.add(_0x5a3dd0);
  }
  var _0x2a2a8a = new _0x1391a9.Mesh(geometry, material);
  _0x2a2a8a.name = "cylinder";
  _0x2a2a8a.visible = false;
  scene.add(_0x2a2a8a);
  document.querySelector('#fullscreen-button').style.display = "block";
}, function (_0x5590da) {
  let _0x10d9c8 = Math.ceil(_0x5590da.loaded / _0x5590da.total * 0x64);
  document.querySelector("span#percentage").innerHTML = " " + _0x10d9c8 + "% loaded (" + Math.ceil(0x20 * _0x10d9c8 / 0x64) + "MB of 32MB)";
});
window.startTheGame = function () {
  document.querySelector("#fullscreen-button").style.display = "none";
  setTimeout(function () {
    document.body.appendChild(renderer.domElement);
    document.querySelector('span#loading').style.display = 'none';
    document.querySelector("canvas#map").style.display = "block";
    document.querySelector('div#bullet').style.display = 'block';
    document.querySelector("div#game").style.display = "block";
    document.querySelector("div#tab-text").style.display = "block";
    animate();
  }, 0x1f4);
  document.addEventListener("mousedown", function (_0x3d93ef) {
    if (!continueGame) {
      return;
    }
    switch (_0x3d93ef.which) {
      case 0x1:
        if (!flightList[0x0].autopilot) {
          if (_0x3d93ef.clientX < _0x3d93ef.target.clientWidth * 0.5) {
            if (_0x3d93ef.clientX - _0x3d93ef.target.clientWidth * 0.5 > -0x7b) {
              flightList[0x0].rotate = '<<';
            } else {
              flightList[0x0].rotate = '<';
            }
          } else if (_0x3d93ef.clientX - _0x3d93ef.target.clientWidth * 0.5 < 0x7b) {
            flightList[0x0].rotate = '>>';
          } else {
            flightList[0x0].rotate = '>';
          }
        }
        break;
      case 0x2:
        bullet(0x0);
        flightList[0x0].dtInterval = setInterval(function () {
          bullet(0x0);
        }, 0x32);
        break;
      case 0x3:
        bullet(0x0);
        flightList[0x0].dtInterval = setInterval(function () {
          bullet(0x0);
        }, 0x32);
        break;
    }
  });
  document.addEventListener("mouseup", function (_0x1860d7) {
    if (!continueGame) {
      return;
    }
    switch (_0x1860d7.which) {
      case 0x1:
        if (!flightList[0x0].autopilot) {
          flightList[0x0].rotate = '|';
        }
        break;
      case 0x2:
        bulletStop(0x0);
        break;
      case 0x3:
        bulletStop(0x0);
        break;
    }
  });
  document.addEventListener('contextmenu', function (_0x1e8ba0) {
    _0x1e8ba0.preventDefault();
  });
  document.addEventListener('keydown', function (_0x2774b0) {
    if (!continueGame) {
      return;
    }
    switch (_0x2774b0.keyCode) {
      case 0x9:
        _0x2774b0.preventDefault();
        document.querySelector("#table").style.display = 'block';
        document.querySelector("#table-head").style.display = 'block';
        document.querySelector('div#tab-text').style.display = "none";
        break;
    }
  });
  document.addEventListener('keyup', function (_0x486807) {
    if (!continueGame) {
      return;
    }
    switch (_0x486807.keyCode) {
      case 0x9:
        _0x486807.preventDefault();
        document.querySelector("#table").style.display = "none";
        document.querySelector("#table-head").style.display = "none";
        document.querySelector('div#tab-text').style.display = 'block';
        break;
    }
  });
  setInterval(function () {
    if (!continueGame) {
      return;
    }
    let _0x2fe06d = [];
    ctx.clearRect(0x0, 0x0, 0x7d, 0x7d);
    for (let _0x2f7287 = 0x0; _0x2f7287 < flightList.length; _0x2f7287++) {
      let _0x38c18a = scene.getObjectByName(flightList[_0x2f7287].name);
      let _0x378840 = [Math.floor(_0x38c18a.position.x / 0x50) + 62.5, Math.floor(_0x38c18a.position.z / 0x50) + 62.5];
      ctx.fillStyle = _0x2f7287 == 0x0 ? 'red' : "black";
      ctx.strokeStyle = _0x2f7287 == 0x0 ? 'red' : "black";
      ctx.beginPath();
      ctx.arc(_0x378840[0x0], _0x378840[0x1], 0x3, 0x0, 0x2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      flightList[_0x2f7287].average = flightList[_0x2f7287].hit - flightList[_0x2f7287].gothit;
      _0x2fe06d[_0x2fe06d.length] = flightList[_0x2f7287];
    }
    _0x2fe06d.sort(function (_0x64a77b, _0x294e1b) {
      return _0x294e1b.average - _0x64a77b.average;
    });
    document.querySelector("#table").innerHTML = '';
    for (let _0x4f56ec = 0x0; _0x4f56ec < _0x2fe06d.length; _0x4f56ec++) {
      let _0x31750e = _0x4f56ec == 0x0 ? "700" : "normal";
      document.querySelector('#table').innerHTML += "<div style=\"position:relative;float:left;width:100%;height:32px;\"><span style=\"position:relative;float:left;left:11px;top:5px;font-weight:" + _0x31750e + "\">" + _0x2fe06d[_0x4f56ec].name + "</span><span style=\"position:relative;float:right;right:11px;top:5px;\">" + _0x2fe06d[_0x4f56ec].hit + '/' + _0x2fe06d[_0x4f56ec].gothit + " > " + _0x2fe06d[_0x4f56ec].average + "</span></div>";
    }
    if (countdown > 0x0) {
      countdown -= 0.5;
      printCountDown();
    }
    let _0x42b796 = flightList[0x0].force * 0.2 < 0x4b ? 'yellow' : "red";
    document.querySelector('div#game').style.background = "linear-gradient(to top, " + _0x42b796 + " " + flightList[0x0].force * 0.2 + "%, white " + flightList[0x0].force * 0.2 + '%)';
  }, 0x1f4);
};
function animate() {
  requestAnimationFrame(animate);
  if (!continueGame) {
    return;
  }
  for (let _0x2cda66 = 0x0; _0x2cda66 < flightList.length; _0x2cda66++) {
    let _0x320539 = scene.getObjectByName(flightList[_0x2cda66].name);
    if (flightList[_0x2cda66].rotate === '<') {
      _0x320539.rotation.z -= Math.PI / 0x24;
      if (_0x320539.rotation.z <= -Math.PI / 2.6) {
        _0x320539.rotation.z = -Math.PI / 2.6;
        _0x320539.rotation.y += Math.PI / 0x10e;
        flightList[_0x2cda66].force+=1;
      }
    } else {
      if (flightList[_0x2cda66].rotate === '>') {
        _0x320539.rotation.z += Math.PI / 0x24;
        if (_0x320539.rotation.z >= Math.PI / 2.6) {
          _0x320539.rotation.z = Math.PI / 2.6;
          _0x320539.rotation.y -= Math.PI / 0x10e;
          flightList[_0x2cda66].force+=1;
        }
      } else {
        if (flightList[_0x2cda66].rotate === '<<' && _0x320539.rotation.z == 0x0) {
          _0x320539.rotation.y += Math.PI / 0x438;
          flightList[_0x2cda66].force-=0.5;
        } else {
          if (flightList[_0x2cda66].rotate === '>>' && _0x320539.rotation.z == 0x0) {
            _0x320539.rotation.y -= Math.PI / 0x438;
            flightList[_0x2cda66].force-=0.5;
          } else {
            if (Math.abs(_0x320539.rotation.z) < Math.PI / 0x24) {
              _0x320539.rotation.z = 0x0;
            } else {
              if (_0x320539.rotation.z > 0x0) {
                _0x320539.rotation.z -= Math.PI / 0x24;
              } else if (_0x320539.rotation.z < 0x0) {
                _0x320539.rotation.z += Math.PI / 0x24;
              }
            }
            flightList[_0x2cda66].force-=0.5;
          }
        }
      }
    }
    if (flightList[_0x2cda66].force < 0x0) {
      flightList[_0x2cda66].force = 0x0;
    } else if (flightList[_0x2cda66].force > 0x1f4) {
      flightList[_0x2cda66].force = 0x1f4;
      if (!flightList[_0x2cda66].autopilot) {
        flightList[_0x2cda66].rotate = '|';
      }
      if (_0x2cda66 == 0x0) {
        document.querySelector("div#game").style.background = "linear-gradient(to top, red 100%, white 100%)";
      }
    }
    let _0x39ea31 = -_0x320539.rotation.y * (0xb4 / Math.PI) % 0x168;
    _0x39ea31 = _0x39ea31 < 0x0 ? 0x168 + _0x39ea31 : _0x39ea31;
    if (_0x320539.position.z >= 0x1388) {
      if (flightList[_0x2cda66].autopilot == false) {
        flightList[_0x2cda66].autopilot = true;
        if (_0x39ea31 >= 0x0 && _0x39ea31 <= 0x5a) {
          flightList[_0x2cda66].rotate = '>';
        } else {
          flightList[_0x2cda66].rotate = '<';
        }
      }
    } else {
      if (_0x320539.position.z <= -0x1388) {
        if (flightList[_0x2cda66].autopilot == false) {
          flightList[_0x2cda66].autopilot = true;
          if (_0x39ea31 >= 0xb4 && _0x39ea31 <= 0x10e) {
            flightList[_0x2cda66].rotate = '>';
          } else {
            flightList[_0x2cda66].rotate = '<';
          }
        }
      } else {
        if (_0x320539.position.x >= 0x1388) {
          if (flightList[_0x2cda66].autopilot == false) {
            flightList[_0x2cda66].autopilot = true;
            if (_0x39ea31 >= 0x10e && _0x39ea31 <= 0x168) {
              flightList[_0x2cda66].rotate = '>';
            } else {
              flightList[_0x2cda66].rotate = '<';
            }
          }
        } else {
          if (_0x320539.position.x <= -0x1388) {
            if (flightList[_0x2cda66].autopilot == false) {
              flightList[_0x2cda66].autopilot = true;
              if (_0x39ea31 >= 0x5a && _0x39ea31 <= 0xb4) {
                flightList[_0x2cda66].rotate = '>';
              } else {
                flightList[_0x2cda66].rotate = '<';
              }
            }
          } else if (flightList[_0x2cda66].autopilot == true) {
            flightList[_0x2cda66].rotate = '|';
            flightList[_0x2cda66].autopilot = false;
          }
        }
      }
    }
    _0x320539.translateZ(0x5);
    if (_0x2cda66 == 0x0) {
      camera.position.set(_0x320539.position.x, _0x320539.position.y, _0x320539.position.z);
      camera.rotation.y = _0x320539.rotation.y + Math.PI;
      camera.translateZ(0x18);
      camera.translateY(3.8);
    }
    for (let _0x40d456 = 0x0; _0x40d456 < flightList[_0x2cda66].dt.length; _0x40d456++) {
      if (flightList[_0x2cda66].dt[_0x40d456].moveCount == 0x0) {
        let _0x5a5866 = scene.getObjectByName("cylinder").clone();
        _0x5a5866.position.set(_0x320539.position.x, _0x320539.position.y, _0x320539.position.z);
        _0x5a5866.rotation.x = -Math.PI / 0x2;
        _0x5a5866.rotation.z = _0x320539.rotation.y + [0.0075, 0.005, 0.0025, 0.0025, 0.0025, -0.0025, -0.0025, -0.0025, -0.005, -0.0075][Math.floor(Math.random() * 0xa)];
        _0x5a5866.name = flightList[_0x2cda66].dt[_0x40d456].name;
        _0x5a5866.visible = true;
        _0x5a5866.translateY(-0x4b);
        scene.add(_0x5a5866);
        flightList[_0x2cda66].dt[_0x40d456].moveCount += 0x1;
      } else {
        flightList[_0x2cda66].dt[_0x40d456].moveCount += 0x1;
        let _0x7481d8 = scene.getObjectByName(flightList[_0x2cda66].dt[_0x40d456].name);
        _0x7481d8.translateY(-0x13);
        if (flightList[_0x2cda66].dt[_0x40d456].moveCount > 0xfa) {
          flightList[_0x2cda66].dt.splice(_0x40d456, 0x1);
          scene.remove(_0x7481d8);
        } else {
          for (let _0x373703 = 0x0; _0x373703 < flightList.length; _0x373703++) {
            if (_0x2cda66 == _0x373703 || typeof flightList[_0x2cda66].dt[_0x40d456] == "undefined") {
              continue;
            }
            let _0x478297 = scene.getObjectByName(flightList[_0x2cda66].dt[_0x40d456].name);
            if (typeof _0x478297 == "undefined") {
              continue;
            }
            let _0x3b5e8d = scene.getObjectByName(flightList[_0x373703].name);
            let _0x4aeabc = Math.sqrt(Math.pow(_0x3b5e8d.position.x - _0x478297.position.x, 0x2) + Math.pow(_0x3b5e8d.position.z - _0x478297.position.z, 0x2));
            if (_0x4aeabc <= 0x7) {
              flightList[_0x2cda66].hit += 0x1;
              flightList[_0x373703].gothit += 0x1;
              flightList[_0x2cda66].dt.splice(_0x40d456, 0x1);
              scene.remove(_0x478297);
              $('#hit-text').css("color", _0x2cda66 == 0x0 ? "white" : "red");
              if ($("#hit-text").css("display") != "none") {
                $("#hit-text").html(parseInt($("#hit-text").html()) + 0x1);
              } else {
                $("#hit-text").html('1');
              }
              $('#hit-text').show();
              clearTimeout(hitTextTimeout);
              hitTextTimeout = setTimeout(function () {
                $("#hit-text").fadeOut();
              }, 0x3e8);
            }
          }
        }
      }
    }
  }
  renderer.render(scene, camera);
}
