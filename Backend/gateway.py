from nameko.standalone.rpc import ClusterRpcProxy
from flask import Flask, request, jsonify, make_response,render_template,redirect,url_for,session,send_from_directory
from flask_cors import CORS
import jwt
import os
from bson.json_util import dumps

app = Flask(__name__)
secret_key = "your_jwt_secret_key"
CORS(app, origins=['http://localhost:3000'],supports_credentials=True)
CONFIG = {"AMQP_URI": "pyamqp://guest:guest@localhost"}

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')


@app.route('/app/api/auth/signup', methods=['POST'])
def signup():
    data = request.get_json()
    try:
        if not data or 'email' not in data or 'password' not in data:
            return make_response(jsonify({"message": "Please fill in all fields."}), 400)

        with ClusterRpcProxy(CONFIG) as rpc:
            response, status_code = rpc.user_service.create_user(data)
            print(f"Signup response: {response}, status code: {status_code}")
            return make_response(jsonify(response)), status_code
    except Exception as e:
        print(f"An error occurred: {e}")
        return make_response(jsonify({"message": "Internal Server Error"}), 500)
    
    

@app.route('/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    try:
        if not data or 'email' not in data or 'password' not in data:
            return make_response(jsonify({"message": "Please fill in all fields."}), 400)

        with ClusterRpcProxy(CONFIG) as rpc:
            response, status_code = rpc.user_service.login_user(data)
            print(f"Login response: {response}, status code: {status_code}")
            resp = make_response(jsonify(response), status_code)

            if status_code == 200:
                resp.set_cookie(response['token'],
                               httponly=True,
                               samesite='None',
                               secure=True)

            return resp
    except Exception as e:
        print(f"An error occurred: {e}")
        return make_response(jsonify({"message": "Internal Server Error"}), 500)


    



@app.route('/auth/verify_token', methods=['POST'])
def verify_token():
    token = request.headers.get('Authorization').split()[1]

    try:
        decoded = jwt.decode(token, secret_key, algorithms=['HS256'])
        return jsonify({'message': 'Token is valid', 'user_id': decoded['user_id']}), 200
    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Token has expired'}), 401
    except jwt.InvalidTokenError:
        return make_response(jsonify({'message': 'Invalid token'})), 401

@app.route('/auth/logout', methods=['POST'])
def logout():
    token = request.headers.get('Cookie')
    token = token.split('=')[0]
    print(token)
    if not token:
        return make_response(jsonify({'message': 'No token found'}), 400)

    with ClusterRpcProxy(CONFIG) as rpc:
        response, status_code = rpc.user_service.logout_user(token)

    resp = make_response(jsonify(response), status_code)
    if status_code == 200:
        resp.set_cookie('token', '', expires=0, httponly=True, samesite='None', secure=True)
    return resp

#projects
@app.route('/api/projects', methods=['POST','GET'])
def handle_projects():
    with ClusterRpcProxy(CONFIG) as rpc:
        if request.method == 'POST':
            data = request.json
            project, status = rpc.project_service.create_project(data)
            return make_response(jsonify(project)), status
        elif request.method == 'GET':
            projects, status = rpc.project_service.get_project()
            return make_response(jsonify(projects)), status
        
@app.route('/api/projects/<projectId>', methods=['PUT', 'DELETE'])
def update_delete_project(projectId):
    with ClusterRpcProxy(CONFIG) as rpc:
        if request.method == 'PUT':
            data = request.json
            updated_project_name, status = rpc.project_service.update_project_name(projectId, data)
            return make_response(jsonify(updated_project_name)), status
        elif request.method == 'DELETE':
            result, status = rpc.project_service.delete_project(projectId)
            return make_response(dumps(result)), status


@app.route('/api/project_tasks', methods=['POST'])
def handle_project_tasks():
    data = request.json
    with ClusterRpcProxy(CONFIG) as rpc:
        task,status = rpc.project_task_service.create_project_tasks(data)

    return make_response(jsonify(task)),status


@app.route('/api/project_tasks/<projectId>', methods=['GET'])
def get_tasks(projectId):
    with ClusterRpcProxy(CONFIG) as rpc:
        task,status = rpc.project_task_service.get_project_tasks(projectId=projectId)

    return make_response(jsonify(task)),status

@app.route('/api/project_tasks/<taskId>', methods=['PUT'])
def update_task(taskId):
    data = request.json
    print(f"Received data: {data}")  # Debug statement
    if not data:
        return make_response(jsonify({'error': 'Invalid data'}), 400)

    with ClusterRpcProxy(CONFIG) as rpc:
        response, status = rpc.project_task_service.update_task(taskId, data)

    return make_response(jsonify(response), status)


@app.route('/api/project_tasks/<taskId>', methods=['DELETE'])
def delete_task(taskId):
    try:
        with ClusterRpcProxy(CONFIG) as rpc:
            response, status = rpc.project_task_service.delete_task(taskId)

        return make_response(jsonify(response), status)
    except Exception as e:
        return make_response(jsonify({'error': str(e)}), 500)


@app.route('/api/project_subtasks/', methods=['POST'])
def handle_project_Subtasks():
    data = request.json
    taskId = data.get('taskId')  # Extract taskId from the request data
    with ClusterRpcProxy(CONFIG) as rpc:
        subtask, status = rpc.project_Subtask_service.create_project_Subtasks(data, taskId)  # Pass taskId to the RPC method

    return make_response(jsonify(subtask)), status

@app.route('/api/project_subtasks/<taskId>', methods=['GET'])
def get_subtasks(taskId):
    with ClusterRpcProxy(CONFIG) as rpc:
        task, status = rpc.project_Subtask_service.get_project_subtasks(taskId)

    return make_response(jsonify(task)), status

@app.route('/api/project_subtasks/<subtask_id>', methods=['PUT'])
def update_subtask(subtask_id):
    data = request.json
    with ClusterRpcProxy(CONFIG) as rpc:
        updated_subtask, status = rpc.project_Subtask_service.update_project_Subtask(subtask_id, data)

    return make_response(jsonify(updated_subtask)), status

@app.route('/api/project_subtasks/<subtask_id>', methods=['DELETE'])
def delete_subtask(subtask_id):
    with ClusterRpcProxy(CONFIG) as rpc:
        result, status = rpc.project_Subtask_service.delete_project_Subtask(subtask_id)

    return make_response(jsonify(result)), status


#bid


@app.route('/api/bids', methods=['POST', 'GET'])
def handle_bids():
    with ClusterRpcProxy(CONFIG) as rpc:
        if request.method == 'POST':
            data = request.json
            bids, status = rpc.bid_service.create_bid(data)
            return make_response(jsonify(bids)), status
        elif request.method == 'GET':
            bids, status = rpc.bid_service.get_bid()
            return make_response(jsonify(bids)), status



@app.route('/api/bids/<bid_id>', methods=['DELETE'])
def delete_bid(bid_id):
    with ClusterRpcProxy(CONFIG) as rpc:
        bids,status = rpc.bid_service.delete_bids(bid_id=bid_id)
    return make_response(jsonify(bids)),status



@app.route('/api/bids/request', methods=['POST'])#requested bids added to the requested bid database
def request_bid():
    data = request.json
    with ClusterRpcProxy(CONFIG) as rpc:
        bid,status = rpc.bid_service.bid_req(data)

    return make_response(jsonify(bid)),status


@app.route('/api/bids/requested', methods=['GET'])
def get_requested_bid():
    with ClusterRpcProxy(CONFIG) as rpc:
        bids,status = rpc.bid_service.get_requested_bid()

    return make_response(jsonify(bids)),status


#delete approved bids
@app.route('/api/delete_bids_approved/<bid_id>', methods=['DELETE'])
def delete_approved_bid(bid_id):
    with ClusterRpcProxy(CONFIG) as rpc:
        bids,status = rpc.bid_service.delete_approved_bid(bid_id)

    return make_response(jsonify(bids)),status


#invite

@app.route('/api/invite', methods=['POST'])
def send_invitation():
    data = request.json
    with ClusterRpcProxy(CONFIG) as rpc:
        bid,status = rpc.invite_service.invite_mail(data)
        return make_response(jsonify(bid)),status

# sprinttasks

@app.route('/api/sprinttask', methods=['POST', 'GET'])
def handle_sprinttask():
    with ClusterRpcProxy(CONFIG) as rpc:
        if request.method == 'POST':
            data = request.json
            sprinttask,status = rpc.sprinttask_service.create_sprinttask(data)
            return make_response(jsonify(sprinttask)),status

        elif request.method == 'GET':
            sprintId = request.args.get('sprintId')
            search = request.args.get('search', '')
            sprinttask,status = rpc.sprinttask_service.get_sprinttask(sprintId,search)
            return make_response(jsonify(sprinttask)),status

@app.route('/api/sprinttask/<task_id>', methods=['PUT','DELETE'])
def update_delete_sprinttask(task_id):
    with ClusterRpcProxy(CONFIG) as rpc:
        if request.method == 'PUT':
            data = request.json
            updated_task, status = rpc.sprinttask_service.update_sprinttask(task_id, data)
            return make_response(jsonify(updated_task)), status
        elif request.method == 'DELETE':
            result, status = rpc.sprinttask_service.delete_sprinttask(task_id)
            return make_response(jsonify(result)), status
        
@app.route('/api/sprinttask/<task_id>', methods=['PUT'])
def update_sprinttasksstatus(task_id):
    data = request.json
    with ClusterRpcProxy(CONFIG) as rpc:
        updated_task_status, status = rpc.sprinttask_service.update_sprinttaskstatus(task_id,data)
        return make_response(jsonify(updated_task_status)), status

#newuserstory

@app.route('/api/newuserstory', methods=['POST', 'GET'])
def handle_newuserstory():
    with ClusterRpcProxy(CONFIG) as rpc:
        if request.method == 'POST':
            data = request.json
            newuserstory, status = rpc.userstory_service.create_newuserstory(data)
            return make_response(jsonify(newuserstory)), status
        elif request.method == 'GET':
            project_id = request.args.get('project_id')
            newuserstories, status = rpc.userstory_service.get_newuserstory(project_id)
            return make_response(jsonify(newuserstories)), status

@app.route('/api/newuserstory/<user_id>', methods=['PUT', 'DELETE'])
def update_delete_newuserstory(user_id):
    with ClusterRpcProxy(CONFIG) as rpc:
        if request.method == 'PUT':
            data = request.json
            newuserstory, status = rpc.userstory_service.update_newuserstory(user_id, data)
            return make_response(jsonify(newuserstory)), status
        elif request.method == 'DELETE':
            newuserstory, status = rpc.userstory_service.delete_newuserstory(user_id)  # Ensure user_id is used
            return make_response(jsonify(newuserstory)), status


#userstorysubtask

@app.route('/api/userstory_subtasks/', methods=['POST'])
def handle_newuserstorysubtask():
    with ClusterRpcProxy(CONFIG) as rpc:
        if request.method == 'POST':
            data = request.json
            user_id = data.get('user_id')
            print("id",id )  # Log the received data
            newuserstorysubtask, status = rpc.userstorysubtask_service.create_newuserstorysubtask(data,user_id)
            return make_response(jsonify(newuserstorysubtask)), status
        
@app.route('/api/userstory_subtasks/<user_id>', methods=['GET'])
def get_userstorysubtasks(user_id):
    with ClusterRpcProxy(CONFIG) as rpc:
        subtasks, status = rpc.userstorysubtask_service.get_userstory_subtasks(user_id)
    return make_response(jsonify(subtasks)), status

@app.route('/api/userstory_subtasks/<subtask_id>', methods=['PUT'])
def update_userstorysubtask(subtask_id):
    with ClusterRpcProxy(CONFIG) as rpc:
        if request.method == 'PUT':
            data = request.json
            updated_subtask, status = rpc.userstorysubtask_service.update_userstorysubtask(subtask_id, data)
            return make_response(jsonify(updated_subtask)), status

@app.route('/api/userstory_subtasks/<subtask_id>', methods=['DELETE'])
def delete_userstorysubtask(subtask_id):
    with ClusterRpcProxy(CONFIG) as rpc:
        if request.method == 'DELETE':
            response, status = rpc.userstorysubtask_service.delete_userstorysubtask(subtask_id)
            return make_response(jsonify(response)), status

#newsprint

@app.route('/api/newsprint', methods=['POST', 'GET'])
def handle_newsprint():
    with ClusterRpcProxy(CONFIG) as rpc:
        if request.method == 'POST':
            data = request.json#here the data passing from front end to the data variable
            newsprint, status = rpc.sprint_service.create_newsprint(data)
            return make_response(jsonify(newsprint)), status
        elif request.method == 'GET':
            newsprint, status = rpc.sprint_service.get_newsprint()
            return make_response(jsonify(newsprint)), status
        
@app.route('/api/newsprint/<sprint_id>', methods=['PUT','DELETE'])
def update_delete_sprint(sprint_id):
    with ClusterRpcProxy(CONFIG) as rpc:
        if request.method == 'PUT':
            data = request.json
            newsprint, status = rpc.sprint_service.update_newsprint(sprint_id, data)
            return make_response(jsonify(newsprint)), status
        elif request.method == 'DELETE':
            sprint,status = rpc.sprint_service.delete_sprint(sprint_id=sprint_id)
            return make_response(jsonify(sprint)),status
        


if __name__ == '__main__':
    app.run(port=5000,debug=True)
