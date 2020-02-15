# vue-web m3u8视频播放学习案例

官方文档：

- Videojs : <https://github.com/videojs/video.js>
- Dplayer:  <https://dplayer.js.org/zh>

Videojs中文文档：https://github.com/ShmilyLin/video.js.zh-cn

p2p加速的（暂时还没有研究过）：http://docs.cdnbye.com/

项目中使用了 mdui 框架布局，其他就没什么了。

## How to run project

```
git clone https://github.com/orangbus/study-m3u8.git --depth 1
cd study-m3u8
npm i
npm run serve
```

That is ok ,open browser input `http://localhost:8080` ,  then you can test and study .

## videojs + hls

> npm i videojs hls --save

```html
<video
       class="video-js vjs-default-skin vjs-current-time vjs-big-play-centered"
       id="my-video1"
       controls
       crossorigin="anonymous"
       style="width: 100%;height: auto;position: static;"
       >
    <source :src="mp4_url">
</video>
```

m3u8 or live 格式播放

```js
import Hls from "hls.js"; //这个必须先导入
import DPlayer from "dplayer"
import "dplayer/dist/DPlayer.min.css"
const hls = new Hls();
```

```js
//在 mounted 初始化 initPlayer方法
this.initPlayer();
// methods
initPlayer(){
    //初始化播放器
    const player = videojs('my-video1',{
        playbackRates:[0.5,1,1.5,2],
        bigPlayButton: false,
        textTrackDisplay: false,
        posterImage: true,
        errorDisplay: false,
        controlBar: true,
        autoplay: false,
        preload: true,
    },function onPlayerReady() {
        console.log("videojs is ready !")
        mdui.snackbar("videojs is ready !")
    })
    console.log(player);
},

```

```js
// play video
 playerOne(){
     let player = videojs('my-video1');
     player.src({
         src : this.input_url,
         type: "application/x-mpegURL",
         withCredentials: true
     });
     player.load();
     mdui.snackbar("视频重新载入。。")
 },
```

## Hls + Dplayer

> npm i --save dplayer hls.js

```html
<div id="my-video2" ></div>
```

```js
// import Hls from "hls.js"; //这个最先导入
import "hls.js";
import "video.js/dist/video-js.min.css"
import videojs from "video.js";
```

```js
// mounted
const dplayer = new DPlayer({
        container: document.getElementById('my-video2'),//选择播放器的节点
        video:{
          name: "m3u8",
          url: url,
          live: true,
          type: 'customHls', //自定义播放器的方式
          customType: {
            customHls: (video) => { //video = dp.video对象
              hls.loadSource(video.src);
              hls.attachMedia(video);
              // hls.on(Hls.Events.MANIFEST_PARSED,() => {video.play();}) //可以直接这样写，但是为了调试方便
              // video.play();
              // mdui.snackbar("hls 初始化完毕！")
              hls.on(Hls.Events.MANIFEST_PARSED,()=>{
                video.play();
                console.log("hls 初始化完毕！")
                mdui.snackbar("hls 初始化完毕！")
              })
            }
          },
        },
        screenshot: true,
        autoplay: true,
        logo: "http://localhost:8080/orangbus.png", //可以放一张图片，该图片会在视频右上方显示
        //视频右键菜单
        contextmenu:[
          {
            text: "OrangBus",
            link: 'https://orangbus.cn'
          },
          {
            text: "Github",
            link: 'https://github.com/orangbus'
          },
          {
            text: "老司机群",
            link: "511300462"
          }
        ],
      });
      dplayer.play();
      console.log(dplayer)
```

## videojs + videojs-contrib-hls

>  npm i videojs-contrib-hls videojs --save

```html
<video id="my-video3"
       class="video-js vjs-default-skin"
       controls muted
       preload="auto"
       poster=""
       style="width: 100%;height: auto;position: static"
       >
    <source :src="mp4_url">
</video>
```

```js
import "video.js/dist/video-js.min.css"
import videojs from "video.js" 
import "videojs-contrib-hls"
```

```js
// methods
playerThree(){
    let video = videojs('my-video3');
    video.src({
        src: this.input_url,
        type:"application/x-mpegURL"
    });
    video.load();
    mdui.snackbar("如果视频未开始播放，请手动个点击一下视频播放图标按钮")
}
```

附上几个m3u8的测试地址(聪明的你找规律)

```
http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8

http://ivi.bupt.edu.cn/hls/cctv6hd.m3u8
```

