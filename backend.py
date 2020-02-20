from flask import Flask, escape, request, render_template, url_for
import json

import utils.tao as tao
import pdb 
import os

app = Flask(__name__)

with open('utils/panoptic_coco_categories_cat.json') as file:
	data = json.load(file)


tao = tao.Tao('utils/annotations_lvis_categories_only.json')

@app.route('/')
def explore():

    return render_template('explore.html', data=data)


@app.route('/fetchVideos/', methods=['POST'])
def fetchVideos():

	# pdb.set_trace()
	data = request.get_json(force=True)

	index = data['index']
	filters = data['data']


	thumbnailsPath = os.listdir('static/dataset/airplane')

	catid = [i['id'] for i in data['categories'] if i['name']=='chair']
	videoid = [i['video_id'] for i in data['tracks'] if i['category_id']==catid[0]]
	videoPath = [i['name'] for i in data['videos'] if i['id'] in videoid]

	data = json.dumps({'thumbnailsPath': thumbnailsPath, 'videoPath': videoPath})

	return data



if __name__ == '__main__':
	app.run(debug=True)