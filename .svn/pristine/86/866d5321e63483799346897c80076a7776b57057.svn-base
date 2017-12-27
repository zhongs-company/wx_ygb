import config from '../../utils/config'


//初始化
export let checkStatus = (channelCode, programCode, cb) => {
    wx.request({
        url: `${config.https_url}/mini/checkStatus`,
        data: {
            channelCode,
            programCode
        },
        success: (res) => {
            var { data } = res.data;
            cb && cb(data, res.data.errCode)
        },
        fail: res => {
            console.log('mini/checkStatus fail:', res);
        }
    });
}