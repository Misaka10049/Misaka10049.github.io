'''
@name 钉钉机器人发送消息
@author myh
@version 1.0.1
@description 使用钉钉自定义机器人接口发送消息
'''

# 签名所需库
import time
import hmac
import hashlib
import base64
import urllib.parse

# 请求所需库
import requests

# 调用system("pause")
import os

# 签名
timestamp=str(round(time.time()*1000))
secret="SEC494fde51cc5efc0cf940ed9774375a7719b1b20e719c43c56050c327dd62d3f6" # 加签的秘钥
string_to_sign='{}\n{}'.format(timestamp, secret)
string_to_sign=string_to_sign.encode('utf-8')
secret=secret.encode('utf-8')
hmac_code=hmac.new(secret,string_to_sign,digestmod=hashlib.sha256).digest()
sign=urllib.parse.quote_plus(base64.b64encode(hmac_code))

# 请求头
head={
	"method":"POST",
	"Content-Type":"application/json"
}

# 消息体
# 文字型消息
'''
data="现在是北京时间 22:00"
body={
	"msgtype":"text",
	"text":{
		"content":"" # 消息内容
	}
}
body['text']['content']=data
'''
# 链接型消息
'''
body={
    "msgtype": "link", 
    "link": {
        "title": "百度翻译-200种语言互译、沟通全世界！",# 标题
        "text": "百度翻译提供即时免费200+语言翻译服务，拥有网页、APP、API产品，支持文本翻译、文档翻译、图片翻译等特色功能，满足用户查词翻译、文献翻译、合同翻译等需求，随时随地沟通全世界",# 描述
        "picUrl": "", 
        "messageUrl": "https://fanyi.baidu.com/"# 跳转链接
    }
}
'''
# markdown型消息
'''
body={
     "msgtype": "markdown",
     "markdown": {
         "title":"名人名言",# 标题
         "text": "> 书籍是人类进步的阶梯"# markdown内容，只支持部分语法，详见https://open.dingtalk.com/document/robots/custom-robot-access
     }
}
'''
# 整体跳转ActionCard
'''
body={
    "actionCard": {
        "title": "百度搜索“书籍是人类进步的阶梯”", # 标题
        "text": "### 书籍是人类进步的阶梯", # 描述，可使用markdown语法
        "btnOrientation": "0", # 按钮排列方式，0为竖直，1为横向
        "singleTitle" : "前往", # 跳转链接描述
        "singleURL" : "https://www.baidu.com/baidu?tn=monline_4_dg&ie=utf-8&wd=书籍是人类进步的阶梯" # 跳转链接
    }, 
    "msgtype": "actionCard"
}
'''
# 独立跳转ActionCard
'''
body={
    "msgtype": "actionCard",
    "actionCard": {
        "title": "搜索“书籍是人类进步的阶梯”", 
        "text": "### 书籍是人类进步的阶梯", 
        "btnOrientation": "1", 
        "btns": [# 多按钮列表
            {
                "title": "bilibili搜索",# 跳转链接描述
                "actionURL": "https://search.bilibili.com/all?keyword=书籍是人类进步的阶梯"# 跳转链接
            }, 
            {
                "title": "百度搜索", 
                "actionURL": "https://www.baidu.com/baidu?tn=monline_4_dg&ie=utf-8&wd=书籍是人类进步的阶梯"
            }
        ]
    }
}
'''
# FeedCard
'''
body={
    "msgtype":"feedCard",
    "feedCard": {
        "links": [
            {
                "title": "百度翻译", 
                "messageURL": "https://fanyi.baidu.com/", # 跳转的链接
                "picURL": "https://fanyi-cdn.cdn.bcebos.com/webStatic/translation/img/favicon/favicon.ico"# 描述图片的链接
            },
            {
                "title": "必应翻译", 
                "messageURL": "https://cn.bing.com/translator/?h_text=msn_ctxt&setlang=zh-cn", 
                "picURL": "https://cn.bing.com/th?id=OTT.7A274AA188550691D09FA80F322A58D2&pid=Trans"
            }
        ]
    }
}
'''
body=str(body).encode("utf-8")


# 发送请求
session=requests.session()
access_token="1325e5b7425b9a9376755d67f221b268a5b23a7bd3eb43934b938b7241695607" # 请求的token
url="https://oapi.dingtalk.com/robot/send?"
url+="access_token={}&timestamp={}&sign={}".format(access_token,timestamp,sign) # 计算最终链接
while(True):# 反复请求
	try:
		result=session.post(url,body,headers=head)
		result.encoding="utf-8"
		break
	except Exception as e:# 抛出错误
		print(e)
result=result.text
print(result)
os.system("pause")
