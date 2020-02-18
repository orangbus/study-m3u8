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
                <p class="mdui-text-center">video + mp4</p>
                <video
                        class="video-js vjs-default-skin vjs-current-time vjs-big-play-centered"
                        id="my-video1"
                        crossorigin="anonymous"
                        style="width: 100%;height: auto;position: static;"
                >
                    <source :src="mp4_url" type="video/mp4">
                </video>
            </div>
            <div class="mdui-col-md-xs-12 mdui-text-center mdui-m-t-3">
                <button class="mdui-btn mdui-color-theme" @click="videoPlayer()">播 放 M3u8</button>
            </div>
            <div class="mdui-col-xs-12 mdui-m-t-3 mdui-text-center">
                不知道啥原因,mp4格式的文件都播放不了,网上说有可能视频格式不对,我也不知道,有大佬知道的可以试试
            </div>
        </div>
    </div>
</template>

<script>
    import videojs from "video.js"
    import "video.js/dist/video-js.min.css"
    // import "videojs-contrib-hls"

    export default {
        name: "Mp4Demo",
        data(){
            return {
                input_url: "",
                last_url: "http://ivi.bupt.edu.cn/hls/cctv6hd.m3u8",
                mp4_url: "http://localhost:8080/demo.mp4"
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
                    autoplay: true,
                    preload: true, //视频预加载
                };
                window.player = videojs('my-video1',videoOptin);
                // let player = videojs('my-video');
                // window.player.play();
                console.log(window.player)
            },
            videoPlayer(){
                console.log(this.input_url)
                let newPlayer = window.player;
                newPlayer.src({
                    src: this.input_url,
                    type: "video/mp4",
                });
                newPlayer.load();
                newPlayer.play();
                this.last_url = this.input_url;
                this.input_url = "";
            }
        },
        beforeDestroy() {
            window.player.dispose();
            console.log("dispose")
        }
    }
</script>

<style scoped>

</style>