from flask import Flask, escape, request, render_template, url_for
import json

# import utils.tao as tao
import pdb 
import os

app = Flask(__name__)

with open('utils/tao_categories.json') as file:
	taoCat = json.load(file)

# with open('utils/panoptic_coco_categories_cat.json') as file:
# 	taoCat = json.load(file)



# tao = tao.Tao('utils/annotations_lvis_categories_only.json')

with open('utils/annotations_lvis_categories_only.json') as file:
	tao = json.load(file)


@app.route('/')
def explore():
    return render_template('explore.html', data=taoCat)


@app.route('/fetchVideos/', methods=['POST'])
def fetchVideos():

	data = request.get_json(force=True)
	filters = data['filters']

	response = []

	for filter in filters:
		catId = [i['id'] for i in tao['categories'] if i['name']==filter]
		videoId = [i['video_id'] for i in tao['tracks'] if i['category_id']==catId[0]]
		videoName = [i['name'] for i in tao['videos'] if i['id'] in videoId]
		response = list(set(response) | set(videoName))
	# print(videoName)
	response = json.dumps({'videoName': response})

	return response



if __name__ == '__main__':
	app.run(host="0.0.0.0", port="23012", debug=True)