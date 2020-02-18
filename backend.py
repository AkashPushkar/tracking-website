from flask import Flask, escape, request, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('explore.html')




if __name__ == '__main__':
	app.run(debug=True)