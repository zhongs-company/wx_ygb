import config from '../../utils/config'
import * as utils from '../../utils/util'
import * as api from './api'
import WebSocket from '../../utils/WebSocket'
import { checkStatus } from './api';

var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    //连接socket
    linkSocket(watermark, cb) {
        var websocket_url = `${config.websocket_url}/${app.channel_code}/${app.program_code}/user/ws?id=${watermark}`;
        //console.log('socket 链接:', websocket_url);
        this.webSocket = new WebSocket({
            url: websocket_url,
            onMessage: res => {
                var data = JSON.parse(res.data);
                console.log('onMessage', data);
                //开播
                if (data.type == 3) {
                    this.toMain();
                }
            },
            debug: true
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.hideLoading();
        var { banner, title } = options;
        banner = 'http://tmp.s.weshaketv.com/sam-service3/upload/broatcast/imgs/20171214/a517d182-f044-4e62-ba43-b8852572eaa7.png'
        this.setData({ banner, title });
        utils.setPageTile(title);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        api.checkStatus(app.channel_code, app.program_code, (data, errorCode) => {
            if (errorCode == 0) {
                this.toMain();
            } else {
                if (this.webSocket && this.webSocket.isOpen) return;
                console.log("mainEnd", "onshow")
                app.getWatermark((watermark) => {
                    this.linkSocket(watermark, () => { });
                });
            }
        });
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        if (this.webSocket && this.webSocket.isOpen) {
            this.webSocket.closeSocket();
        }
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            title: '经济之声那些年',
            path: '/pages/main/main',
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }
        }
    },
    toIndex() {

    },
    toMy() {
        wx.navigateTo({
            url: `/pages/mainUserCenter/index?title=${this.data.title}`
        })
    },
    toMain() {
        wx.reLaunch({
            url: `/pages/main/main`,
            success: () => { }
        });
    }
})