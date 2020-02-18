<template>
    <div class="mdui-container">
        <div class="mdui-row">
            <div class="mdui-col-md-col-xs-12">
                <div class="mdui-textfield mdui-textfield-floating-label ">
<!--                    <label class="mdui-textfield-label">请输入 M3U8 视频链接</label>-->
                    <input class="mdui-textfield-input" type="text" v-model="input_url" :placeholder="last_url"/>
                </div>
            </div>
            <div class="mdui-col-md-col-xs-12">
                <p class="mdui-text-center">Dplayer + hls: 配置灵活,操作简单</p>
                <div id="video-dplayer"></div>
            </div>
            <div class="mdui-col-md-xs-12 mdui-text-center mdui-m-t-3">
                <button class="mdui-btn mdui-color-theme" @click="playerTwo()">播 放 M3u8</button>
            </div>
            <div class="mdui-col-xs-12 mdui-m-t-3 mdui-text-center">
                感觉还行
            </div>
        </div>
    </div>
</template>

<script>
    import "dplayer/dist/DPlayer.min.css"
    import "video.js/dist/video-js.min.css"
    import Hls from "hls.js"
    import DPlayer from "dplayer"

    export default {
        name: "video2",
        data(){
            return {
                input_url: "",
                last_url: "http://ivi.bupt.edu.cn/hls/cctv6hd.m3u8"
            }
        },
        mounted() {
            this.instPlayer();
        },
        methods: {
            instPlayer(url=this.last_url){
                const dp = new DPlayer({
                    container: document.getElementById('video-dplayer'),
                    preload: true,
                    video:{
                        name: "m3u8",
                        url: url,
                        type: 'customHls',
                        customType: {
                            customHls: (video) => { //video = dp.video对象
                                const hls = new Hls();
                                hls.loadSource(video.src);
                                hls.attachMedia(video);
                                hls.on(Hls.Events.MANIFEST_PARSED,() => {video.play();})
                            }
                        }
                    },
                    screenshot: true,
                    autoplay: true,
                    logo: "http://localhost:8080/orangbus.png",
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
                            link: ""
                        }
                    ],
                });
                console.log(dp)
            },
            playerTwo(){
                this.last_url = this.input_url;
                this.instPlayer(this.input_url);
                this.input_url = ""
            }
        }
    }
</script>

<style scoped>

</style>