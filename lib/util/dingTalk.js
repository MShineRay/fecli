/**
 * https://developers.dingtalk.com/document/robots/call-robot-api-operations
 * [自定义机器人](https://open-doc.dingtalk.com/microapp/serverapi2/qf2nxq)
 * [https://developers.dingtalk.com/document/app/custom-robot-access?spm=ding_open_doc.document.0.0.6d9d28e1xmI6dc#topic-2026027](https://developers.dingtalk.com/document/app/custom-robot-access?spm=ding_open_doc.document.0.0.6d9d28e1xmI6dc#topic-2026027)
 * [钉钉相关测试](/engineering/dingtalk-test)
 * @type {function(*=, *=, *=): *}
 */
const request = require('request');

/**
 *
 * @param reqParamObj
 * @param callback
 */

function requestPost(reqParamObj, callback) {
  const requestOptions = {
    uri: "https://oapi.dingtalk.com/robot/send?access_token=xxx",
    method: 'post',
    json: true, // json格式上传
    ...reqParamObj
  };
  request(requestOptions, (error, response, body) => {
    console.log(body)
  });
}

// (function testSendText() {
//   requestPost({
//     body: {
//       "msgtype": "text",
//       "text": {
//         "content": "测试text，我就是我, 是不一样的烟火@156xxxx8827"
//       },
//       "at": {
//         "atMobiles": [
//           "156xxxx8827",
//           "189xxxx8325"
//         ],
//         "isAtAll": false
//       }
//     }
//   })
// })();
//
//
(function testSendLink() {
  requestPost({
    body: {
      "msgtype": "link",
      "link": {
        "text": '前端报错了',
        "title": "【前端报错】点击此处，查看详细报错日志",
        "picUrl": "",
        "messageUrl": "https://www.dingtalk.com"
      }
    }
  })
})();

(function testSendMarkdown() {
  requestPost({
    body: {
      "msgtype": "markdown",
      "markdown": {
        "title":"前端报错",
        "text": "【前端报错】#### 杭州天气 @150XXXXXXXX \n> 9度，西北风1级，空气良89，相对温度73%\n> ![screenshot](https://img.alicdn.com/tfs/TB1NwmBEL9TBuNjy1zbXXXpepXa-2400-1218.png)\n> ###### 10点20分发布 [天气](https://www.dingalk.com) \n"
      },
      "at": {
        "atMobiles": [
          "15075093920"
        ],
        "atUserIds": [
          "qinfei3"
        ],
        "isAtAll": false
      }
    }
  })
})();
