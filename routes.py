from flask import Flask, url_for, render_template
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html');

@app.route('/meeting')
def meeting():
    return render_template('meeting.html');

@app.route('/wedding')
def wedding():
    return render_template('wedding.html');

@app.route('/proposal')
def proposal():
    return render_template('proposal.html');

@app.route('/bridal_party')
def bridal_party():
    return render_template('bridal_party.html');

@app.route('/things_todo')
def things_todo():
    return render_template('things_todo.html');
