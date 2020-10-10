import json
import re
import urllib.parse
import urllib.request

from flask import Flask, render_template, request

app = Flask(__name__)


def get_url(keys):
	keys = urllib.parse.quote(keys)
	url = 'https://v.qq.com/x/search/?q=%s' % keys
	thml = get_html(url)
	global vImg, vid, vtxt, vtitle, vlei, vurl
	vurl = re.search(
		r'<h2 class="result_title">\s+<a href="(.*?)" target="_blank" _stat="video:poster_tle">\s+<em class="hl',
		thml)[1]
	vlei = re.search(r'<span class="type">(.*?)</span>', thml)[1]
	vtitle = re.search(r'class="hl">(.*?)</em>', thml)[1]
	vid = re.search(r'href="https://v.qq.com/detail/.*?/(.*?).html', thml)[1]
	vtxt = re.search(r'desc_text">(.*?)<a class', thml, re.S)[1]
	vImg = re.search(r'<img class="figure_pic" src="(.*?)"', thml)[1]
	return vid


def get_html(url):
	head = {
		"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 \
		(KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36 Edg/85.0.564.68"
	}
	f = urllib.request.Request(url=url, headers=head)
	html = urllib.request.urlopen(f).read().decode()
	return html


def get_data(vid):
	lss = []
	url = 'https://s.video.qq.com/get_playsource?id={}&range=1-200&plat=2&type=4&&video_type=1&otype=json'.format(vid)
	html = get_html(url)
	data = re.search(r'videoPlayList":(.*?)},"error":0,"msg":""};', html)[1]
	data = json.loads(data)
	for i in range(len(data)):
		title = data[i]["title"]
		playUrl = data[i]["playUrl"]
		uid = data[i]["id"]
		ls = [title, playUrl, uid]
		lss.append(ls)
	return lss


@app.route('/')
def hello_world():
	return render_template('index.html')


@app.route('/index.html')
def index():
	return render_template('index.html')


@app.route('/vqq', methods=['POST', 'GET'])
def vqq():
	global key, vid, wukey, lss, wuvid
	if request.method == 'POST':
		wukey = request.form['sos']
		wuvid = get_url(wukey)
		lss = get_data(wuvid)
		return render_template(
			'vqq.html',
			vid=wuvid,
			lss=lss,
			vimg=vImg,
			vtxt=vtxt,
			wukey=wukey,
			vtitle=vtitle,
			vlei=vlei,
		)
	else:
		return render_template('index.html')


if __name__ == '__main__':
	app.run()
