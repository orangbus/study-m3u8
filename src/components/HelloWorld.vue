<template>
  <div>
    <div class="mdui-appbar">
      <div class="mdui-toolbar mdui-color-theme">
        <a href="javascript:;" class="mdui-btn mdui-btn-icon"><i class="mdui-icon material-icons">menu</i></a>
        <a href="https://orangbus.cn" target="_blank" class="mdui-typo-title">OrangBus</a>
        <div class="mdui-toolbar-spacer"></div>
        <a href="https://github.com/orangbus" class="mdui-btn mdui-btn-icon"><i class="mdui-icon material-icons">favorite</i></a>
      </div>
    </div>
    <!--demo-1-->
    <div class="mdui-container">
      <div class="mdui-row">
        <div class="mdui-col-md-col-xs-12">
          <div class="mdui-textfield mdui-textfield-floating-label ">
            <label class="mdui-textfield-label">请输入 M3U8 视频链接</label>
            <input class="mdui-textfield-input" type="text" v-model="input_url"/>
          </div>
        </div>
        <div class="mdui-col-md-col-xs-12">
          <p class="mdui-text-center">video + hls</p>
          <video
                  class="video-js vjs-default-skin vjs-current-time vjs-big-play-centered"
                  id="my-video1"
                  controls
                  crossorigin="anonymous"
                  style="width: 100%;height: auto;position: static;"
          >
            <source :src="mp4_url">
          </video>
        </div>
        <div class="mdui-col-md-xs-12 mdui-text-center mdui-m-t-1">
          <button class="mdui-btn mdui-color-theme" @click="playerOne()">播 放 M3u8</button>
        </div>
      </div>
    </div>
    <hr>
    <!--demo-2-->
    <div class="mdui-container">
      <div class="mdui-row">
        <div class="mdui-col-md-col-xs-12">
          <p class="mdui-text-center">Dplayer + hls</p>
          <div id="my-video2" ></div>
        </div>
        <div class="mdui-col-md-xs-12 mdui-text-center mdui-m-t-1">
          <button class="mdui-btn mdui-color-theme" @click="playerTwo()">播 放 M3u8</button>
        </div>
      </div>
    </div>
    <!--demo-3 http://localhost:8080/orangbus.png-->
    <div class="mdui-container">
      <div class="mdui-row">
        <div class="mdui-col-md-col-xs-12">
          <p class="mdui-text-center">videojs + videojs-contrib-hls</p>
          <video id="my-video3"
                 class="video-js vjs-default-skin"
                 controls muted
                 preload="auto"
                 poster=""
                 style="width: 100%;height: auto;position: static"
          >
            <source
                :src="mp4_url"
            >
          </video>

        </div>
        <div class="mdui-col-md-xs-12 mdui-text-center mdui-m-t-1">
          <button class="mdui-btn mdui-color-theme" @click="playerThree()">播 放 M3u8</button>
        </div>
      </div>
    </div>
    <!-- footer -->
    <div class="mdui-bottom-nav mdui-color-indigo mdui-m-t-3">
      <div class="mdui-col-xs-12">
        <p class="mdui-typo-title mdui-text-center">{{msg}}</p>
      </div>
    </div>
  </div>

</template>

<script>
  import mdui from "mdui"
  //demo-1
  import "hls.js"
  import "video.js/dist/video-js.min.css"
  import videojs from "video.js"
  // demo-2
  import Hls from "hls.js"; //这个必须先导入
  import DPlayer from "dplayer"
  import "dplayer/dist/DPlayer.min.css"
  const hls = new Hls();
  //demo-3 //此方法会和 demo-1 方式冲突，暂时注释了，也可以能我老家网络比较卡，半天加载不出来，理论上是可以播放的
  // import "video.js/dist/video-js.min.css"
  // import videojs from "video.js" //上面已经引入了
  // import "videojs-contrib-hls"

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return {
      mp4_url: "http://localhost:8080/video/demo.mp4",
      // input_url: "https://cn1.18787000118.com/hls/20200215/fd51693e3c3f2efaa8bbc305e284ea93/index.m3u8",
      input_url: "http://ivi.bupt.edu.cn/hls/cctv6hd.m3u8",
      video_url: ""
    }
  },
  mounted() {
    this.initPlayer();
  },
  methods:{
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
    initDplayer(url){
      //init dplayer
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

      // demo-3
      // videojs('my-video3',{
      //   bigPlayButton: false,
      //   textTrackDisplay: false,
      //   posterImage: true,
      //   errorDisplay: false,
      //   controlBar: true
      // },()=>{this.play()})
    },
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
    playerTwo(){
      this.initDplayer(this.input_url);
    },
    playerThree(){
        let video = videojs('my-video3');
        video.src({
          src: this.input_url,
          type:"application/x-mpegURL"
        });
        video.load();
        mdui.snackbar("如果视频未开始播放，请手动个点击一下视频播放图标按钮")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
