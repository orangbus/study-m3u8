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
                <p class="mdui-text-center">vue-player:不会玩</p>
                <video id="my-video3"
                       class="video-js vjs-default-skin"
                       controls
                       preload="auto"
                       poster="http://localhost:8080/logo.svg"
                       style="width: 100%;height: auto;position: static"
                >
                    <source :src="last_url" type="application/x-mpegURL">
                </video>

            </div>
            <div class="mdui-col-md-xs-12 mdui-text-center mdui-m-t-3">
                <button class="mdui-btn mdui-color-theme" @click="playerThree()">播 放 M3u8</button>
            </div>
            <div class="mdui-col-xs-12 mdui-m-t-3 mdui-text-center">
                啥功能也没有,会用的大佬可以教学一下
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "video3",
        data(){
            return {
                input_url: "",
                last_url: "http://ivi.bupt.edu.cn/hls/cctv6hd.m3u8"
            }
        },

        methods: {
            playerThree(){
                alert("nothing,give up!!!")
            }
        }
    }
</script>

<style scoped>

</style>