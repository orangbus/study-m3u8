import Vue from "vue"
import VueRouter from "vue-router";
import Video1 from "./Video1";
import Video2 from "./Video2";
import Video3 from "./Video3";
import Mp4Demo from "./Mp4Demo";

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        component: Mp4Demo
    },
    {
        path: '/video1',
        component: Video1
    },
    {
        path: '/video2',
        component: Video2
    },
    {
        path: '/video3',
        component: Video3
    }
];

export default  new VueRouter( {routes} )