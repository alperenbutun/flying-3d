function _0x2a89(_0x210c74, _0xc2425){const _0x3616eb=_0x3616();return _0x2a89=function(_0x2a8974, _0x229053){_0x2a8974=_0x2a8974-0x129;let _0x2e4559=_0x3616eb[_0x2a8974];return _0x2e4559;},_0x2a89(_0x210c74,_0xc2425);}const _0x306649=_0x2a89;(function(_0x3cca46,_0x894c82){const _0x14b967=_0x2a89,_0xd2494a=_0x3cca46();while(!![]){try{const _0x1f5f38=-parseInt(_0x14b967(0x13e))/0x1*(-parseInt(_0x14b967(0x142))/0x2)+-parseInt(_0x14b967(0x172))/0x3+parseInt(_0x14b967(0x196))/0x4+-parseInt(_0x14b967(0x148))/0x5+parseInt(_0x14b967(0x165))/0x6*(-parseInt(_0x14b967(0x184))/0x7)+-parseInt(_0x14b967(0x19d))/0x8+-parseInt(_0x14b967(0x132))/0x9*(-parseInt(_0x14b967(0x187))/0xa);if(_0x1f5f38===_0x894c82)break;else _0xd2494a['push'](_0xd2494a['shift']());}catch(_0x49ebc2){_0xd2494a['push'](_0xd2494a['shift']());}}}(_0x3616,0x8b750));import*as _0x5c9c42 from'three';import{GLTFLoader}from'https://rawcdn.githack.com/mrdoob/three.js/master/examples/jsm/loaders/GLTFLoader.js';let flightModel='',hitTextTimeout='',flightList=[],countdown=0x3*0x6*0xa,continueGame=!![];const scene=new _0x5c9c42[(_0x306649(0x179))]();scene['background']=new _0x5c9c42[(_0x306649(0x1a7))]()['setPath'](_0x306649(0x16f))[_0x306649(0x1a1)]([_0x306649(0x175),'left.jpeg',_0x306649(0x153),_0x306649(0x168),'front.jpeg',_0x306649(0x129)]);const HemisphereLight=new _0x5c9c42['HemisphereLight'](0xffffbb,0x181821,0x1);scene[_0x306649(0x13b)](HemisphereLight);const camera=new _0x5c9c42[(_0x306649(0x1a0))](0x32,window[_0x306649(0x16e)]/window[_0x306649(0x161)],0.1,0x2710),geometry=new _0x5c9c42[(_0x306649(0x14f))](0.19,0.19,0x80,0x40),material=new _0x5c9c42[(_0x306649(0x15e))]({'color':0xffffff}),canvas=document[_0x306649(0x18b)](_0x306649(0x185)),ctx=canvas[_0x306649(0x192)]('2d');function printCountDown(){const _0x4c19fe=_0x306649;if(Math[_0x4c19fe(0x141)](countdown)==countdown){let _0x1c49fb=Math[_0x4c19fe(0x141)](countdown/0x3c),_0x270158=countdown-Math['floor'](countdown/0x3c)*0x3c;document[_0x4c19fe(0x18c)]('span#countdown')[_0x4c19fe(0x146)]=_0x1c49fb+':'+(_0x270158<0xa?'0'+_0x270158:_0x270158);if(countdown==0x0){continueGame=![],document['querySelector']('#table')[_0x4c19fe(0x16a)][_0x4c19fe(0x1a8)]=_0x4c19fe(0x152),document[_0x4c19fe(0x18c)]('#table-head')[_0x4c19fe(0x16a)]['display']=_0x4c19fe(0x152),document['querySelector'](_0x4c19fe(0x14c))[_0x4c19fe(0x16a)][_0x4c19fe(0x1a8)]='none';return;}}}function bullet(_0x4e900a){const _0x287d61=_0x306649;if(flightList[_0x4e900a]['rotate']=='<'||flightList[_0x4e900a]['rotate']=='>'||flightList[_0x4e900a]['rotate']=='<<'||flightList[_0x4e900a][_0x287d61(0x171)]=='>>'||flightList[_0x4e900a]['hararet']>=0x64)return;flightList[_0x4e900a]['dt'][_0x287d61(0x158)]({'name':_0x287d61(0x173)+_0x4e900a+''+new Date()[_0x287d61(0x1a3)](),'moveCount':0x0}),flightList[_0x4e900a][_0x287d61(0x197)]++,flightList[_0x4e900a][_0x287d61(0x17e)]+=0x1,clearInterval(flightList[_0x4e900a][_0x287d61(0x180)]),document[_0x287d61(0x18c)](_0x287d61(0x182))['innerHTML']=flightList[_0x4e900a][_0x287d61(0x197)];let _0x3cd3d4=flightList[_0x4e900a][_0x287d61(0x17e)]<0x4b?'yellow':_0x287d61(0x19a);document[_0x287d61(0x18c)](_0x287d61(0x1a4))[_0x287d61(0x16a)][_0x287d61(0x13c)]=_0x287d61(0x164)+_0x3cd3d4+'\x20'+flightList[_0x4e900a][_0x287d61(0x17e)]+_0x287d61(0x15a)+flightList[_0x4e900a][_0x287d61(0x17e)]+'%)';}function bulletStop(_0x2201fd){const _0x4c403f=_0x306649;clearInterval(flightList[_0x2201fd]['dtInterval']),clearInterval(flightList[_0x2201fd][_0x4c403f(0x180)]),flightList[_0x2201fd]['hararetInterval']=setInterval(function(){const _0x16373c=_0x4c403f;flightList[_0x2201fd][_0x16373c(0x17e)]-=0x1;flightList[_0x2201fd][_0x16373c(0x17e)]<=0x0&&(flightList[_0x2201fd][_0x16373c(0x17e)]=0x0,clearInterval(flightList[_0x2201fd][_0x16373c(0x180)]));let _0x518204=flightList[_0x2201fd][_0x16373c(0x17e)]<0x4b?_0x16373c(0x166):_0x16373c(0x19a);document[_0x16373c(0x18c)]('div#bullet')[_0x16373c(0x16a)][_0x16373c(0x13c)]=_0x16373c(0x164)+_0x518204+'\x20'+flightList[_0x2201fd][_0x16373c(0x17e)]+'%,\x20white\x20'+flightList[_0x2201fd][_0x16373c(0x17e)]+'%)';},0x32);}const gt=new _0x5c9c42[(_0x306649(0x177))]()[_0x306649(0x1a1)](_0x306649(0x169)),gg=new _0x5c9c42[(_0x306649(0x19b))](0x249f0,0x249f0),gm=new _0x5c9c42[(_0x306649(0x157))]({'color':0xffffff,'map':gt,'transparent':!![],'opacity':0.039}),ground=new _0x5c9c42[(_0x306649(0x16b))](gg,gm);ground['rotation']['x']=-Math['PI']/0x2,ground[_0x306649(0x12c)][_0x306649(0x185)][_0x306649(0x130)][_0x306649(0x183)](0x40,0x40),ground[_0x306649(0x12c)][_0x306649(0x185)]['wrapS']=_0x5c9c42['RepeatWrapping'],ground[_0x306649(0x12c)][_0x306649(0x185)][_0x306649(0x14e)]=_0x5c9c42[_0x306649(0x154)],ground[_0x306649(0x12c)]['map']['colorSpace']=_0x5c9c42['SRGBColorSpace'],scene['add'](ground),new GLTFLoader()[_0x306649(0x1a1)]('https://rawcdn.githack.com/alperenbutun/free-time-project/master/gltf/f35.glb',function(_0x3908af){const _0x1845c2=_0x306649;document['addEventListener'](_0x1845c2(0x12f),function(_0x1940d3){const _0x520159=_0x1845c2;switch(_0x1940d3[_0x520159(0x138)]){case 0x1:!flightList[0x0][_0x520159(0x143)]&&(_0x1940d3['clientX']<_0x1940d3['target'][_0x520159(0x135)]*0.5?_0x1940d3['clientX']-_0x1940d3[_0x520159(0x140)]['clientWidth']*0.5>-0x7b?flightList[0x0][_0x520159(0x171)]='<<':flightList[0x0][_0x520159(0x171)]='<':_0x1940d3[_0x520159(0x14d)]-_0x1940d3['target'][_0x520159(0x135)]*0.5<0x7b?flightList[0x0]['rotate']='>>':flightList[0x0][_0x520159(0x171)]='>');break;case 0x2:bullet(0x0),flightList[0x0][_0x520159(0x194)]=setInterval(function(){bullet(0x0);},0x32);break;case 0x3:bullet(0x0),flightList[0x0]['dtInterval']=setInterval(function(){bullet(0x0);},0x32);break;}}),document['addEventListener'](_0x1845c2(0x133),function(_0x16dd63){const _0x11df87=_0x1845c2;switch(_0x16dd63[_0x11df87(0x138)]){case 0x1:!flightList[0x0][_0x11df87(0x143)]&&(flightList[0x0][_0x11df87(0x171)]='|');break;case 0x2:bulletStop(0x0);break;case 0x3:bulletStop(0x0);break;}}),document['addEventListener'](_0x1845c2(0x174),function(_0x2dfc68){_0x2dfc68['preventDefault']();}),document[_0x1845c2(0x1a2)](_0x1845c2(0x19c),function(_0x4c3be2){const _0x9cc1b4=_0x1845c2;switch(_0x4c3be2[_0x9cc1b4(0x18a)]){case 0x9:_0x4c3be2['preventDefault'](),document[_0x9cc1b4(0x18c)]('#table')['style'][_0x9cc1b4(0x1a8)]=_0x9cc1b4(0x152),document[_0x9cc1b4(0x18c)]('#table-head')[_0x9cc1b4(0x16a)][_0x9cc1b4(0x1a8)]=_0x9cc1b4(0x152),document['querySelector'](_0x9cc1b4(0x14c))[_0x9cc1b4(0x16a)][_0x9cc1b4(0x1a8)]=_0x9cc1b4(0x18d);break;}}),document[_0x1845c2(0x1a2)](_0x1845c2(0x198),function(_0x18ab43){const _0x369e7c=_0x1845c2;switch(_0x18ab43['keyCode']){case 0x9:_0x18ab43['preventDefault'](),document[_0x369e7c(0x18c)](_0x369e7c(0x12a))[_0x369e7c(0x16a)][_0x369e7c(0x1a8)]='none',document[_0x369e7c(0x18c)](_0x369e7c(0x14b))['style'][_0x369e7c(0x1a8)]=_0x369e7c(0x18d),document['querySelector'](_0x369e7c(0x14c))[_0x369e7c(0x16a)][_0x369e7c(0x1a8)]=_0x369e7c(0x152);break;}}),setInterval(function(){const _0x4ab1ba=_0x1845c2;let _0x60ebea=[];ctx[_0x4ab1ba(0x159)](0x0,0x0,0x7d,0x7d);for(let _0x3161bc=0x0;_0x3161bc<flightList['length'];_0x3161bc++){let _0x2ccdb1=scene[_0x4ab1ba(0x13d)](flightList[_0x3161bc][_0x4ab1ba(0x160)]),_0x51941d=[Math[_0x4ab1ba(0x141)](_0x2ccdb1[_0x4ab1ba(0x137)]['x']/0x50)+62.5,Math[_0x4ab1ba(0x141)](_0x2ccdb1[_0x4ab1ba(0x137)]['z']/0x50)+62.5];ctx[_0x4ab1ba(0x17b)]=_0x3161bc==0x0?_0x4ab1ba(0x19a):_0x4ab1ba(0x12e),ctx[_0x4ab1ba(0x193)]=_0x3161bc==0x0?'red':'black',ctx[_0x4ab1ba(0x186)](),ctx[_0x4ab1ba(0x19e)](_0x51941d[0x0],_0x51941d[0x1],0x3,0x0,0x2*Math['PI']),ctx['fill'](),ctx[_0x4ab1ba(0x178)](),flightList[_0x3161bc][_0x4ab1ba(0x189)]=flightList[_0x3161bc][_0x4ab1ba(0x18e)]-flightList[_0x3161bc][_0x4ab1ba(0x12d)],_0x60ebea[_0x60ebea[_0x4ab1ba(0x145)]]=flightList[_0x3161bc];}_0x60ebea[_0x4ab1ba(0x17c)](function(_0x448e35,_0xd76298){const _0x5ba042=_0x4ab1ba;return _0xd76298[_0x5ba042(0x189)]-_0x448e35['average'];}),document['querySelector'](_0x4ab1ba(0x12a))[_0x4ab1ba(0x146)]='';for(let _0x435337=0x0;_0x435337<_0x60ebea[_0x4ab1ba(0x145)];_0x435337++){let _0x5b4ddb=_0x435337==0x0?_0x4ab1ba(0x181):_0x4ab1ba(0x139);document[_0x4ab1ba(0x18c)](_0x4ab1ba(0x12a))[_0x4ab1ba(0x146)]+=_0x4ab1ba(0x144)+_0x5b4ddb+'\x22>'+_0x60ebea[_0x435337][_0x4ab1ba(0x160)]+'</span><span\x20style=\x22position:relative;float:right;right:11px;top:5px;\x22>'+_0x60ebea[_0x435337][_0x4ab1ba(0x18e)]+'/'+_0x60ebea[_0x435337]['gothit']+_0x4ab1ba(0x1aa)+_0x60ebea[_0x435337][_0x4ab1ba(0x189)]+_0x4ab1ba(0x1a6);}countdown>0x0&&(countdown-=0.5,printCountDown());},0x1f4),flightModel=_0x3908af[_0x1845c2(0x188)];for(let _0x45c973=0x0;_0x45c973<0x8;_0x45c973++){flightList[flightList[_0x1845c2(0x145)]]={'name':_0x1845c2(0x173)+_0x45c973,'rotate':'|','autopilot':![],'dt':[],'dtInterval':'','bullet':0x0,'hit':0x0,'gothit':0x0,'average':0x0,'hararet':0x0,'hararetInterval':''};let _0x39ebc7=flightModel['clone']();_0x39ebc7['name']='flight'+_0x45c973,_0x39ebc7['position'][_0x1845c2(0x183)](0x0,0xf,0x0),_0x39ebc7['rotation']['y']=Math[_0x1845c2(0x15f)]()*Math['PI']*0x2,scene[_0x1845c2(0x13b)](_0x39ebc7);}var _0x55cb84=new _0x5c9c42['Mesh'](geometry,material);_0x55cb84[_0x1845c2(0x160)]='cylinder',_0x55cb84[_0x1845c2(0x149)]=![],scene[_0x1845c2(0x13b)](_0x55cb84),document[_0x1845c2(0x18c)](_0x1845c2(0x14a))['style'][_0x1845c2(0x1a8)]=_0x1845c2(0x18d),document[_0x1845c2(0x18c)](_0x1845c2(0x18f))[_0x1845c2(0x16a)][_0x1845c2(0x1a8)]=_0x1845c2(0x152),document[_0x1845c2(0x18c)](_0x1845c2(0x1a4))[_0x1845c2(0x16a)][_0x1845c2(0x1a8)]=_0x1845c2(0x152),document['querySelector'](_0x1845c2(0x15c))[_0x1845c2(0x16a)]['display']=_0x1845c2(0x152),document[_0x1845c2(0x18c)](_0x1845c2(0x14c))[_0x1845c2(0x16a)][_0x1845c2(0x1a8)]=_0x1845c2(0x152),animate();},function(_0x3c151e){const _0x255266=_0x306649;let _0x3f4170=Math[_0x255266(0x151)](_0x3c151e[_0x255266(0x195)]/_0x3c151e[_0x255266(0x13a)]*0x64);document[_0x255266(0x18c)](_0x255266(0x131))['innerHTML']='\x20'+_0x3f4170+'%\x20loaded\x20('+Math[_0x255266(0x151)](0x20*_0x3f4170/0x64)+_0x255266(0x15b);});function animate(){const _0x9be223=_0x306649;requestAnimationFrame(animate);if(!continueGame)return;for(let _0x1ca3fa=0x0;_0x1ca3fa<flightList[_0x9be223(0x145)];_0x1ca3fa++){let _0x616614=scene[_0x9be223(0x13d)](flightList[_0x1ca3fa]['name']);if(flightList[_0x1ca3fa]['rotate']==='<')_0x616614[_0x9be223(0x167)]['z']-=Math['PI']/0x24,_0x616614[_0x9be223(0x167)]['z']<=-Math['PI']/2.6&&(_0x616614[_0x9be223(0x167)]['z']=-Math['PI']/2.6,_0x616614[_0x9be223(0x167)]['y']+=Math['PI']/0x10e);else{if(flightList[_0x1ca3fa]['rotate']==='>')_0x616614['rotation']['z']+=Math['PI']/0x24,_0x616614['rotation']['z']>=Math['PI']/2.6&&(_0x616614[_0x9be223(0x167)]['z']=Math['PI']/2.6,_0x616614['rotation']['y']-=Math['PI']/0x10e);else{if(flightList[_0x1ca3fa][_0x9be223(0x171)]==='<<'&&_0x616614[_0x9be223(0x167)]['z']==0x0)_0x616614['rotation']['y']+=Math['PI']/0x438;else{if(flightList[_0x1ca3fa]['rotate']==='>>'&&_0x616614[_0x9be223(0x167)]['z']==0x0)_0x616614[_0x9be223(0x167)]['y']-=Math['PI']/0x438;else{if(Math[_0x9be223(0x19f)](_0x616614[_0x9be223(0x167)]['z'])<Math['PI']/0x24)_0x616614['rotation']['z']=0x0;else{if(_0x616614[_0x9be223(0x167)]['z']>0x0)_0x616614['rotation']['z']-=Math['PI']/0x24;else _0x616614[_0x9be223(0x167)]['z']<0x0&&(_0x616614['rotation']['z']+=Math['PI']/0x24);}}}}}let _0x358755=-_0x616614[_0x9be223(0x167)]['y']*(0xb4/Math['PI'])%0x168;_0x358755=_0x358755<0x0?0x168+_0x358755:_0x358755;if(_0x616614[_0x9be223(0x137)]['z']>=0x1388)flightList[_0x1ca3fa][_0x9be223(0x143)]==![]&&(flightList[_0x1ca3fa][_0x9be223(0x143)]=!![],_0x358755>=0x0&&_0x358755<=0x5a?flightList[_0x1ca3fa][_0x9be223(0x171)]='>':flightList[_0x1ca3fa][_0x9be223(0x171)]='<');else{if(_0x616614[_0x9be223(0x137)]['z']<=-0x1388)flightList[_0x1ca3fa][_0x9be223(0x143)]==![]&&(flightList[_0x1ca3fa][_0x9be223(0x143)]=!![],_0x358755>=0xb4&&_0x358755<=0x10e?flightList[_0x1ca3fa]['rotate']='>':flightList[_0x1ca3fa][_0x9be223(0x171)]='<');else{if(_0x616614[_0x9be223(0x137)]['x']>=0x1388)flightList[_0x1ca3fa]['autopilot']==![]&&(flightList[_0x1ca3fa][_0x9be223(0x143)]=!![],_0x358755>=0x10e&&_0x358755<=0x168?flightList[_0x1ca3fa][_0x9be223(0x171)]='>':flightList[_0x1ca3fa][_0x9be223(0x171)]='<');else{if(_0x616614['position']['x']<=-0x1388)flightList[_0x1ca3fa][_0x9be223(0x143)]==![]&&(flightList[_0x1ca3fa]['autopilot']=!![],_0x358755>=0x5a&&_0x358755<=0xb4?flightList[_0x1ca3fa]['rotate']='>':flightList[_0x1ca3fa][_0x9be223(0x171)]='<');else flightList[_0x1ca3fa][_0x9be223(0x143)]==!![]&&(flightList[_0x1ca3fa][_0x9be223(0x171)]='|',flightList[_0x1ca3fa][_0x9be223(0x143)]=![]);}}}_0x616614[_0x9be223(0x16c)](0x5);_0x1ca3fa==0x0&&(camera[_0x9be223(0x137)][_0x9be223(0x183)](_0x616614[_0x9be223(0x137)]['x'],_0x616614[_0x9be223(0x137)]['y'],_0x616614[_0x9be223(0x137)]['z']),camera[_0x9be223(0x167)]['y']=_0x616614['rotation']['y']+Math['PI'],camera[_0x9be223(0x16c)](0x18),camera[_0x9be223(0x17a)](3.8));for(let _0x502150=0x0;_0x502150<flightList[_0x1ca3fa]['dt'][_0x9be223(0x145)];_0x502150++){if(flightList[_0x1ca3fa]['dt'][_0x502150][_0x9be223(0x1a5)]==0x0){let _0x200e65=scene[_0x9be223(0x13d)](_0x9be223(0x150))['clone']();_0x200e65[_0x9be223(0x137)][_0x9be223(0x183)](_0x616614[_0x9be223(0x137)]['x'],_0x616614[_0x9be223(0x137)]['y'],_0x616614[_0x9be223(0x137)]['z']),_0x200e65[_0x9be223(0x167)]['x']=-Math['PI']/0x2,_0x200e65[_0x9be223(0x167)]['z']=_0x616614[_0x9be223(0x167)]['y']+[0.0075,0.005,0.0025,0.0025,0.0025,-0.0025,-0.0025,-0.0025,-0.005,-0.0075][Math[_0x9be223(0x141)](Math['random']()*0xa)],_0x200e65[_0x9be223(0x160)]=flightList[_0x1ca3fa]['dt'][_0x502150][_0x9be223(0x160)],_0x200e65[_0x9be223(0x149)]=!![],_0x200e65['translateY'](-0x4b),scene[_0x9be223(0x13b)](_0x200e65),flightList[_0x1ca3fa]['dt'][_0x502150][_0x9be223(0x1a5)]+=0x1;}else{flightList[_0x1ca3fa]['dt'][_0x502150][_0x9be223(0x1a5)]+=0x1;let _0x20bc4f=scene[_0x9be223(0x13d)](flightList[_0x1ca3fa]['dt'][_0x502150][_0x9be223(0x160)]);_0x20bc4f[_0x9be223(0x17a)](-0x13);if(flightList[_0x1ca3fa]['dt'][_0x502150][_0x9be223(0x1a5)]>0xfa)flightList[_0x1ca3fa]['dt'][_0x9be223(0x16d)](_0x502150,0x1),scene[_0x9be223(0x1a9)](_0x20bc4f);else for(let _0x3f157c=0x0;_0x3f157c<flightList[_0x9be223(0x145)];_0x3f157c++){if(_0x1ca3fa==_0x3f157c||typeof flightList[_0x1ca3fa]['dt'][_0x502150]==_0x9be223(0x170))continue;let _0x1d267c=scene['getObjectByName'](flightList[_0x1ca3fa]['dt'][_0x502150][_0x9be223(0x160)]);if(typeof _0x1d267c=='undefined')continue;let _0x51579b=scene[_0x9be223(0x13d)](flightList[_0x3f157c]['name']),_0x578f5d=Math[_0x9be223(0x147)](Math[_0x9be223(0x191)](_0x51579b[_0x9be223(0x137)]['x']-_0x1d267c[_0x9be223(0x137)]['x'],0x2)+Math['pow'](_0x51579b[_0x9be223(0x137)]['z']-_0x1d267c['position']['z'],0x2));_0x578f5d<=0x7&&(flightList[_0x1ca3fa][_0x9be223(0x18e)]+=0x1,flightList[_0x3f157c]['gothit']+=0x1,flightList[_0x1ca3fa]['dt']['splice'](_0x502150,0x1),scene['remove'](_0x1d267c),$(_0x9be223(0x199))[_0x9be223(0x156)](_0x9be223(0x190),_0x1ca3fa==0x0?_0x9be223(0x13f):'red'),$(_0x9be223(0x199))[_0x9be223(0x156)](_0x9be223(0x1a8))!=_0x9be223(0x18d)?$(_0x9be223(0x199))[_0x9be223(0x15d)](_0x9be223(0x155)+(parseInt($(_0x9be223(0x199))[_0x9be223(0x15d)]()[_0x9be223(0x134)]('\x20')[0x1])+0x1)):$('#hit-text')['html']('HIT\x201'),$(_0x9be223(0x199))[_0x9be223(0x12b)](),clearTimeout(hitTextTimeout),hitTextTimeout=setTimeout(function(){const _0x406486=_0x9be223;$(_0x406486(0x199))['fadeOut']();},0x3e8));}}}}renderer[_0x9be223(0x17f)](scene,camera);}function _0x3616(){const _0x842c99=['translateY','fillStyle','sort','WebGLRenderer','hararet','render','hararetInterval','700','#bullet-text','set','7XQBGJU','map','beginPath','1130BNpSnw','scene','average','keyCode','getElementById','querySelector','none','hit','canvas#map','color','pow','getContext','strokeStyle','dtInterval','loaded','4264768dtJjGu','bullet','keyup','#hit-text','red','PlaneGeometry','keydown','4980208ohhyJw','arc','abs','PerspectiveCamera','load','addEventListener','getTime','div#bullet','moveCount','</span></div>','CubeTextureLoader','display','remove','\x20>\x20','back.jpeg','#table','show','material','gothit','black','mousedown','repeat','span#percentage','203679xfpejI','mouseup','split','clientWidth','domElement','position','which','normal','total','add','background','getObjectByName','827SyqtRY','white','target','floor','1234gLbMKO','autopilot','<div\x20style=\x22position:relative;float:left;width:100%;height:32px;\x22><span\x20style=\x22position:relative;float:left;left:11px;top:5px;font-weight:','length','innerHTML','sqrt','5097620nYWFuN','visible','span#loading','#table-head','div#tab-text','clientX','wrapT','CylinderGeometry','cylinder','ceil','block','top.jpeg','RepeatWrapping','HIT\x20','css','MeshPhongMaterial','push','clearRect','%,\x20white\x20','MB\x20of\x2032MB)','div#game','html','MeshBasicMaterial','random','name','innerHeight','setSize','outputEncoding','linear-gradient(to\x20top,\x20','6252126WpBIMv','yellow','rotation','bottom.jpeg','https://rawcdn.githack.com/alperenbutun/free-time-project/f881038/texture/texture.jpg','style','Mesh','translateZ','splice','innerWidth','texture/cubemap/','undefined','rotate','2635401NelaCM','flight','contextmenu','right.jpeg','sRGBEncoding','TextureLoader','stroke','Scene'];_0x3616=function(){return _0x842c99;};return _0x3616();}const renderer=new _0x5c9c42[(_0x306649(0x17d))]();renderer[_0x306649(0x163)]=_0x5c9c42[_0x306649(0x176)],renderer[_0x306649(0x162)](window['innerWidth'],window[_0x306649(0x161)]),document['body']['appendChild'](renderer[_0x306649(0x136)]);
