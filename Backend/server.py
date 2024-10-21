# #   stored project , task , bid data & limit of bid 3 at a time & bid delete , bid request option ....wrking code now  3
# # from flask import Flask, request, jsonify
# # from flask_cors import CORS
# # from pymongo import MongoClient
# # from bson import ObjectId

# # app = Flask(__name__)
# # CORS(app, origins=['http://localhost:3000'])

# # mongo_uri = 'mongodb+srv://alwin:root@cluster0.ltavrxh.mongodb.net/'
# # client = MongoClient(mongo_uri)
# # db = client.get_database('Dashboard')
# # project_collection = db.get_collection('projects')
# # task_collection = db.get_collection('tasks')
# # bid_collection = db.get_collection('bids')  # Create a 'bids' collection
# # bid_request_collection = db.get_collection('bid_requests')  # Create a 'bid_requests' collection

# # @app.route('/api/projects', methods=['GET', 'POST', 'OPTIONS'])
# # def handle_projects():
# #     if request.method == 'OPTIONS':
# #         response = jsonify({})
# #         response.headers.add('Access-Control-Allow-Methods', 'GET, POST')
# #         return response

# #     if request.method == 'GET':
# #         try:
# #             projects = list(project_collection.find())
# #             for project in projects:
# #                 project['_id'] = str(project['_id'])
# #             return jsonify(projects), 200
# #         except Exception as e:
# #             print(e)
# #             return jsonify({'error': 'Internal Server Error'}), 500

# #     if request.method == 'POST':
# #         try:
# #             data = request.json

# #             new_project = {
# #                 'projectName': data.get('projectName', ''),
# #                 'projectDescription': data.get('projectDescription', ''),
# #                 'projectDuration': data.get('projectDuration', ''),
# #                 'beginDate': data.get('beginDate', ''),
# #             }

# #             result = project_collection.insert_one(new_project)
# #             inserted_project = project_collection.find_one({'_id': result.inserted_id})
# #             inserted_project['_id'] = str(inserted_project['_id'])

# #             print(f"Inserted project: {inserted_project}")

# #             return jsonify(inserted_project), 201
# #         except Exception as e:
# #             print(e)
# #             return jsonify({'error': 'Internal Server Error'}), 500

# # @app.route('/api/tasks', methods=['POST'])
# # def handle_tasks():
# #     try:
# #         data = request.json

# #         new_task = {
# #             'projectId': data.get('projectId', ''),
# #             'title': data.get('title', ''),
# #             'assignedTo': data.get('assignedTo', ''),
# #             'dueDate': data.get('dueDate', ''),
# #             'statusIcon': data.get('statusIcon', ''),
# #             'statusColor': data.get('statusColor', ''),
# #             # Add other task properties
# #         }

# #         result = task_collection.insert_one(new_task)
# #         inserted_task = task_collection.find_one({'_id': result.inserted_id})
# #         inserted_task['_id'] = str(inserted_task['_id'])

# #         print(f"Inserted task: {inserted_task}")

# #         return jsonify(inserted_task), 201
# #     except Exception as e:
# #         print(e)
# #         return jsonify({'error': 'Internal Server Error'}), 500

# # @app.route('/api/projects/<project_id>/tasks', methods=['GET'])
# # def get_tasks_for_project(project_id):
# #     try:
# #         tasks = list(task_collection.find({'projectId': project_id}))
# #         for task in tasks:
# #             task['_id'] = str(task['_id'])
# #         return jsonify(tasks), 200
# #     except Exception as e:
# #         print(e)
# #         return jsonify({'error': 'Internal Server Error'}), 500

# # @app.route('/api/bids', methods=['GET', 'POST'])
# # def handle_bids():
# #     if request.method == 'GET':
# #         try:
# #             bids = list(bid_collection.find())
# #             for bid in bids:
# #                 bid['_id'] = str(bid['_id'])
# #             return jsonify(bids), 200
# #         except Exception as e:
# #             print(e)
# #             return jsonify({'error': 'Internal Server Error'}), 500
    
# #     if request.method == 'POST':
# #         try:
# #             data = request.json

# #             # Check the number of bids by the bidder
# #             bidder_name = data.get('bidderName', '')
# #             existing_bids_count = bid_collection.count_documents({'bidderName': bidder_name})

# #             # Check if the bidder has exceeded the limit
# #             if existing_bids_count >= 3:
# #                 return jsonify({'error': 'You have reached the maximum limit of bids (3)'}), 400

# #             new_bid = {
# #                 'bidProjectName': data.get('bidProjectName', ''),
# #                 'bidderName': bidder_name,
# #                 'bidAmount': data.get('bidAmount', ''),
# #                 'bidHour': data.get('bidHour'),
# #                 # Add other bid properties as needed
# #             }

# #             result = bid_collection.insert_one(new_bid)
# #             inserted_bid = bid_collection.find_one({'_id': result.inserted_id})
# #             inserted_bid['_id'] = str(inserted_bid['_id'])

# #             print(f"Inserted bid: {inserted_bid}")

# #             return jsonify(inserted_bid), 201
# #         except Exception as e:
# #             print(e)
# #             return jsonify({'error': 'Internal Server Error'}), 500

# # # Add this route to handle DELETE requests for bids
# # @app.route('/api/bids/<bid_id>', methods=['DELETE'])
# # def delete_bid(bid_id):
# #     try:
# #         result = bid_collection.delete_one({'_id': ObjectId(bid_id)})
# #         if result.deleted_count > 0:
# #             return jsonify({'message': 'Bid deleted successfully'}), 200
# #         else:
# #             return jsonify({'error': 'Bid not found'}), 404
# #     except Exception as e:
# #         print(e)
# #         return jsonify({'error': 'Internal Server Error'}), 500
    

# # @app.route('/api/bids/request', methods=['POST'])
# # def request_bid():
# #     try:
# #         data = request.json

# #         # Extract bid data from the request
# #         bidder_name = data.get('bidderName', '')
# #         bid_project_name = data.get('bidProjectName', '')
# #         bid_amount = data.get('bidAmount', '')

# #         # Check if the bid with the same bidder name, project name, and amount already exists
# #         existing_bid = bid_request_collection.find_one({
# #             'bidderName': bidder_name,
# #             'bidProjectName': bid_project_name,
# #             'bidAmount': bid_amount
# #         })

# #         if existing_bid:
# #             return jsonify({'error': 'Bid with the same details already exists'}), 400

# #         # Check the number of bids by the bidder
# #         existing_bids_count = bid_request_collection.count_documents({'bidderName': bidder_name})

# #         # Check if the bidder has exceeded the limit
# #         if existing_bids_count >= 3:
# #             return jsonify({'error': 'You have reached the maximum limit of bids (3)'}), 400

# #         # Insert the bid into the collection
# #         new_bid = {
# #             'bidProjectName': bid_project_name,
# #             'bidderName': bidder_name,
# #             'bidAmount': bid_amount,
# #             # Add other bid properties as needed
# #         }

# #         result = bid_request_collection.insert_one(new_bid)
# #         inserted_bid = bid_request_collection.find_one({'_id': result.inserted_id})
# #         inserted_bid['_id'] = str(inserted_bid['_id'])

# #         print(f"Inserted bid: {inserted_bid}")

# #         return jsonify(inserted_bid), 201
# #     except Exception as e:
# #         print(e)
# #         return jsonify({'error': 'Internal Server Error'}), 500



# # if __name__ == '__main__':
# #     app.run(debug=True)


# # -------#   stored project , task , bid data & limit of bid 3 at a time & bid delete , bid request option , request bid show in admin page  ....wrking code now  4 --------
    


# # from flask import Flask, request, jsonify
# # from flask_cors import CORS
# # from pymongo import MongoClient
# # from bson import ObjectId

# app = Flask(__name__)
# CORS(app, origins=['http://localhost:3000'])

# mongo_uri = 'mongodb+srv://alwin:root@cluster0.ltavrxh.mongodb.net/'
# client = MongoClient(mongo_uri)
# db = client.get_database('Dashboard')
# project_collection = db.get_collection('projects')
# task_collection = db.get_collection('tasks')
# bid_collection = db.get_collection('bids')  # Create a 'bids' collection
# bid_request_collection = db.get_collection('bid_requests')  # Create a 'bid_requests' collection

# @app.route('/api/projects', methods=['GET', 'POST', 'OPTIONS'])
# def handle_projects():
#     if request.method == 'OPTIONS':
#         response = jsonify({})
#         response.headers.add('Access-Control-Allow-Methods', 'GET, POST')
#         return response

#     if request.method == 'GET':
#         try:
#             projects = list(project_collection.find())
#             for project in projects:
#                 project['_id'] = str(project['_id'])
#             return jsonify(projects), 200
#         except Exception as e:
#             print(e)
#             return jsonify({'error': 'Internal Server Error'}), 500

#     if request.method == 'POST':
#         try:
#             data = request.json

#             new_project = {
#                 'projectName': data.get('projectName', ''),
#                 'projectDescription': data.get('projectDescription', ''),
#                 'projectDuration': data.get('projectDuration', ''),
#                 'beginDate': data.get('beginDate', ''),
#             }

#             result = project_collection.insert_one(new_project)
#             inserted_project = project_collection.find_one({'_id': result.inserted_id})
#             inserted_project['_id'] = str(inserted_project['_id'])

#             print(f"Inserted project: {inserted_project}")

#             return jsonify(inserted_project), 201
#         except Exception as e:
#             print(e)
#             return jsonify({'error': 'Internal Server Error'}), 500

# @app.route('/api/tasks', methods=['POST'])
# def handle_tasks():
#     try:
#         data = request.json

#         new_task = {
#             'projectId': data.get('projectId', ''),
#             'title': data.get('title', ''),
#             'assignedTo': data.get('assignedTo', ''),
#             'dueDate': data.get('dueDate', ''),
#             'statusIcon': data.get('statusIcon', ''),
#             'statusColor': data.get('statusColor', ''),
#             # Add other task properties
#         }

#         result = task_collection.insert_one(new_task)
#         inserted_task = task_collection.find_one({'_id': result.inserted_id})
#         inserted_task['_id'] = str(inserted_task['_id'])

#         print(f"Inserted task: {inserted_task}")

#         return jsonify(inserted_task), 201
#     except Exception as e:
#         print(e)
#         return jsonify({'error': 'Internal Server Error'}), 500

# @app.route('/api/projects/<project_id>/tasks', methods=['GET'])
# def get_tasks_for_project(project_id):
#     try:
#         tasks = list(task_collection.find({'projectId': project_id}))
#         for task in tasks:
#             task['_id'] = str(task['_id'])
#         return jsonify(tasks), 200
#     except Exception as e:
#         print(e)
#         return jsonify({'error': 'Internal Server Error'}), 500

# @app.route('/api/bids', methods=['GET', 'POST'])
# def handle_bids():
#     if request.method == 'GET':
#         try:
#             bids = list(bid_collection.find())
#             for bid in bids:
#                 bid['_id'] = str(bid['_id'])
#             return jsonify(bids), 200
#         except Exception as e:
#             print(e)
#             return jsonify({'error': 'Internal Server Error'}), 500
    
#     if request.method == 'POST':
#         try:
#             data = request.json

#             # Check the number of bids by the bidder
#             bidder_name = data.get('bidderName', '')
#             existing_bids_count = bid_collection.count_documents({'bidderName': bidder_name})

#             # Check if the bidder has exceeded the limit
#             if existing_bids_count >= 3:
#                 return jsonify({'error': 'You have reached the maximum limit of bids (3)'}), 400

#             new_bid = {
#                 'bidProjectName': data.get('bidProjectName', ''),
#                 'bidderName': bidder_name,
#                 'bidAmount': data.get('bidAmount', ''),
#                 'bidHour': data.get('bidHour'),
#                 # Add other bid properties as needed
#             }

#             result = bid_collection.insert_one(new_bid)
#             inserted_bid = bid_collection.find_one({'_id': result.inserted_id})
#             inserted_bid['_id'] = str(inserted_bid['_id'])

#             print(f"Inserted bid: {inserted_bid}")

#             return jsonify(inserted_bid), 201
#         except Exception as e:
#             print(e)
#             return jsonify({'error': 'Internal Server Error'}), 500

# @app.route('/api/bids/<bid_id>', methods=['DELETE'])
# def delete_bid(bid_id):
#     try:
#         result = bid_collection.delete_one({'_id': ObjectId(bid_id)})
#         if result.deleted_count > 0:
#             return jsonify({'message': 'Bid deleted successfully'}), 200
#         else:
#             return jsonify({'error': 'Bid not found'}), 404
#     except Exception as e:
#         print(e)
#         return jsonify({'error': 'Internal Server Error'}), 500
    

# @app.route('/api/bids/request', methods=['POST'])
# def request_bid():
#     try:
#         data = request.json

#         # Extract bid data from the request
#         bidder_name = data.get('bidderName', '')
#         bid_project_name = data.get('bidProjectName', '')
#         bid_amount = data.get('bidAmount', '')

#         # Check if the bid with the same bidder name, project name, and amount already exists
#         existing_bid = bid_request_collection.find_one({
#             'bidderName': bidder_name,
#             'bidProjectName': bid_project_name,
#             'bidAmount': bid_amount
#         })

#         if existing_bid:
#             return jsonify({'error': 'Bid with the same details already exists'}), 400

#         # Check the number of bids by the bidder
#         existing_bids_count = bid_request_collection.count_documents({'bidderName': bidder_name})

#         # Check if the bidder has exceeded the limit
#         if existing_bids_count >= 3:
#             return jsonify({'error': 'You have reached the maximum limit of bids (3)'}), 400

#         # Insert the bid into the collection
#         new_bid = {
#             'bidProjectName': bid_project_name,
#             'bidderName': bidder_name,
#             'bidAmount': bid_amount,
#             # Add other bid properties as needed
#         }

#         result = bid_request_collection.insert_one(new_bid)
#         inserted_bid = bid_request_collection.find_one({'_id': result.inserted_id})
#         inserted_bid['_id'] = str(inserted_bid['_id'])

#         print(f"Inserted bid: {inserted_bid}")

#         return jsonify(inserted_bid), 201
#     except Exception as e:
#         print(e)
#         return jsonify({'error': 'Internal Server Error'}), 500

# @app.route('/api/bids/requested', methods=['GET'])
# def get_requested_bids():
#     try:
#         requested_bids = list(bid_request_collection.find())
#         for bid in requested_bids:
#             bid['_id'] = str(bid['_id'])
#         return jsonify(requested_bids), 200
#     except Exception as e:
#         print(e)
#         return jsonify({'error': 'Internal Server Error'}), 500


# if __name__ == '__main__':
#     app.run(debug=True)