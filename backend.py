from flask import Flask, escape, request, render_template, url_for
import json

app = Flask(__name__)

with open('utils/panoptic_coco_categories_cat.json') as file:
	data = json.load(file)


@app.route('/')
def explore():

    return render_template('explore.html', data=data)




if __name__ == '__main__':
	app.run(debug=True)