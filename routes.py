from flask import Flask, url_for, render_template, jsonify, request
import pymongo
app = Flask(__name__)
db = pymongo.MongoClient().wedding

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

@app.route('/table')
def table():
    return render_template('table.html');

@app.route('/_name_search')
def add_numbers():
    name = request.args.get('name', '', type=str)
    results = list(db.table_assignments.find({'name': {'$regex': '^' + name, '$options':
        'i'}}, {'name': 1, 'table': 1, '_id': 0}).limit(10))
    return jsonify(results=results)

@app.route('/table_group')
def table_group():
    table = request.args.get('table', 1, type=int)
    results = list(db.table_assignments.find({'table': table}, {'name': 1, '_id': 0}))
    return render_template('table_group.html', table=table, results=results);

