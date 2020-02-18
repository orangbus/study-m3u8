<template>
    <div class="mdui-container">
        <div class="mdui-row">
            <div class="mdui-col-md-col-xs-12">
                <div class="mdui-textfield mdui-textfield-floating-label ">
                    <!--                        <label class="mdui-textfield-label">请输入 M3U8 视频链接</label>-->
                    <input class="mdui-textfield-input" type="text" v-model="input_url" :placeholder="last_url"/>
                </div>
            </div>
            <div class="mdui-col-md-col-xs-12">
                <p class="mdui-text-center">videojs + videojs-contrib-hls</p>
                <video
                        class="video-js vjs-default-skin vjs-current-time vjs-big-play-centered"
                        id="my-video2"
                        crossorigin="anonymous"
                        style="width: 100%;height: auto;position: static;"
                >
                    <source :src="last_url" type="application/x-mpegURL">
                </video>
            </div>
            <div class="mdui-col-md-xs-12 mdui-text-center mdui-m-t-3">
                <button class="mdui-btn mdui-color-theme" @click="videoPlayer()">播 放 M3u8</button>
            </div>
            <div class="mdui-col-xs-12 mdui-m-t-3 mdui-text-center">
                默认是一个直播,可以添加m3u8视频源播放试试,不能播放可能由于跨域问题
            </div>
        </div>
    </div>
</template>

<script>
    import videojs from "video.js"
    import "video.js/dist/video-js.min.css"
    import "videojs-contrib-hls"

    export default {
        name: "Mp4Demo",
        data(){
            return {
                input_url: "",
                last_url: "http://ivi.bupt.edu.cn/hls/cctv6hd.m3u8",
            }
        },
        mounted() {
            this.instPlayer();
        },
        methods: {
            instPlayer(){
                let videoOptin = {
                    playbackRates:[0.5,1,1.5,2],
                    bigPlayButton: true,
                    controls: true,
                    liveui: true,
                    autoplay: true,
                    preload: true, //视频预加载
                    loop: true,
                    hls:{
                        withCredentials: true
                    }
                };
                window.player = videojs('my-video2',videoOptin);
                // let player = videojs('my-video');
                // window.player.play();
                console.log(window.player)
            },
            videoPlayer(){
                console.log(this.input_url)
                // let newPlayer = videojs('my-video2');
                let newPlayer = window.player;
                newPlayer.src({
                    src: this.input_url,
                    type: "application/x-mpegURL",
                    withCredentials: true
                });
                newPlayer.load();
                newPlayer.play();
                console.log(newPlayer)
                this.last_url = this.input_url;
                this.input_url = "";
            }
        },
        beforeDestroy() {
            // window.player.dispose();
            console.log("dispose")
        }
    }
</script>

<style scoped>

</style>