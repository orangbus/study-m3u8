<template>
    <div class="mdui-bottom-nav">
        <router-link to="/"  class="mdui-ripple ">
            <i class="mdui-icon material-icons" tag="a">ondemand_video</i>
            <label>mp4(unknow)</label>
        </router-link>
        <router-link to="/video1"  class="mdui-ripple ">
            <i class="mdui-icon material-icons" tag="a">ondemand_video</i>
            <label>videojs(ok)</label>
        </router-link>
        <router-link to="/video2" class="mdui-ripple">
            <i class="mdui-icon material-icons" tag="a">ondemand_video</i>
            <label>dplayer(ok)</label>
        </router-link>
        <router-link to="/video3" href="javascript:;" class="mdui-ripple">
            <i class="mdui-icon material-icons" tag="a">ondemand_video</i>
            <label>test(false)</label>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped>

</style>