import * as api from '../myPrize/api';
import * as utils from '../../utils/util';
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   var { entityId } = options;
        if (!entityId) {
            console.log('实物id不存在');
            return;
        }
        app.getWatermark((watermark) => {
            api.getUserEntityDetail(watermark, entityId,(res) => {
                var {logisticsName,logisticsCode, advertiserName, advertiserIcon, entityIcon, entityName, userName, userPhone, userAddresss } = res.data;
                //少商品数量字段

                advertiserIcon = utils.getUrl(advertiserIcon);
                entityIcon = utils.getUrl(entityIcon);

                this.setData({logisticsName,logisticsCode, advertiserName, advertiserIcon, entityIcon, entityName, userName, userPhone, userAddresss });
            });
        });
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
  
  }
})