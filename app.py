import os

from flask import Flask, render_template, url_for

#from BackEnd import app as backend_app

app = Flask(__name__, static_folder='static')

@app.route("/")
@app.route("/home")
def main():
    #path = os.path.join(os.path.dirname(__file__), 'Front-End', 'main.html')
    return render_template('main.html')

@app.route('/page_1')
def page_1():
    return render_template('page1.html')

@app.route('/page_2')
def page_2():
    return render_template('page2.html')

@app.route('/page_3')
def page_3():
    return render_template('page3.html')

if __name__ == '__main__':
    app.run(debug=True)
   #backend_app.run(debug=True)