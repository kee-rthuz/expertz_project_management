from nameko.rpc import rpc
from pymongo import MongoClient
from bson import ObjectId
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import bcrypt
import datetime
import jwt


class BaseService:
    name = "base_service"
    mongo_uri = 'mongodb+srv://alwin:root@cluster0.ltavrxh.mongodb.net/'
    client = MongoClient(mongo_uri)
    db = client.get_database('Dashboard')

class UserService(BaseService):
    name = "user_service"
    user_collection = BaseService.db.get_collection('users')
    secret_key = "your_jwt_secret_key"
    users_token_collection = BaseService.db.get_collection('users_token')  # Assuming you have defined this collection

    @rpc
    def create_user(self, data):
        try:
            first_name = data.get('firstName')
            last_name = data.get('lastName')
            email = data.get('email')
            password = data.get('password')

            if not first_name or not last_name or not email or not password:
                return {'message': 'Please fill in all fields.'}, 400

            if len(password) < 6:
                return {'message': 'Password must be at least 6 characters long.'}, 400

            if self.user_collection.find_one({'email': email}):
                return {'message': 'User already exists.'}, 400

            hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
            hashed_password_str = hashed_password.decode('utf-8')  # Convert to string

            new_user = {
                'firstName': first_name,
                'lastName': last_name,
                'email': email,
                'password': hashed_password_str,  # Store the string version
                'created_at': datetime.datetime.utcnow()
            }

            result = self.user_collection.insert_one(new_user)
            inserted_user = self.user_collection.find_one({'_id': result.inserted_id})
            inserted_user['_id'] = str(inserted_user['_id'])
            del inserted_user['password']

            token = jwt.encode(
                {'user_id': str(inserted_user['_id']), 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)},
                self.secret_key,
                algorithm='HS256'
            )
            token_str = token.decode('utf-8')  # Ensure the token is a string

            return {'message': 'Signup successful', 'user': inserted_user, 'token': token_str}, 201
        except Exception as e:
            print(f"Signup error: {e}")
            return {'message': 'Internal Server Error'}, 500


    @rpc
    def login_user(self, data):
        try:
            email = data.get('email')
            password = data.get('password')

            if not email or not password:
                return {'message': 'Please fill in all fields.'}, 400

            user = self.user_collection.find_one({'email': email})
            if not user:
                return {'message': 'Invalid email or password.'}, 401

            # Ensure both the input password and the stored hashed password are byte strings
            if not bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
                return {'message': 'Invalid email or password.'}, 401

            user['_id'] = str(user['_id'])
            del user['password']

            token = jwt.encode(
                {'user_id': str(user['_id']), 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)},
                self.secret_key,
                algorithm='HS256'
            )
            token_str = token.decode('utf-8')  # Ensure the token is a string

            token_data = {
                'token': token_str,
                'user_id': str(user['_id']),
                'created_at': datetime.datetime.utcnow()
            }
            result = self.users_token_collection.insert_one(token_data)
            token_data['_id'] = str(result.inserted_id)

            # Ensure email is included in the response
            return {'message': 'Login successful', 'user': user, 'token': token_str, 'email': email}, 200
        except Exception as e:
            print(f"Login error: {e}")
            return {'message': 'Internal Server Error'}, 500





    @rpc
    def logout_user(self, token):
        try:
            print(f"Attempting to delete token: {token}")
            result = self.users_token_collection.delete_one({'token': token})
            if result.deleted_count == 0:
                print("Token not found or already deleted.")
                return {'message': 'Invalid token or user already logged out.'}, 400
            print("Token deleted successfully.")
            return {'message': 'Logout successful'}, 200
        except Exception as e:
            print(f"Error during token deletion: {e}")
            return {'message': 'Internal Server Error'}, 500



class ProjectService(BaseService):
    name = "project_service"
    project_collection = BaseService.db.get_collection('projects')
    
    task_collection = BaseService.db.get_collection('tasks')
    subtask_collection = BaseService.db.get_collection('Subtasks')

    @rpc
    def create_project(self, data):
        try:
            new_project = {
                'projectName': data.get('projectName', ''),
                'projectDescription': data.get('projectDescription', ''),
            }

            result = self.project_collection.insert_one(new_project)
            inserted_project = self.project_collection.find_one({'_id': result.inserted_id})
            inserted_project['_id'] = str(inserted_project['_id'])

            print(f"Inserted project: {inserted_project}")

            return inserted_project,200
        except Exception as e:
            print(e)
            return {'error': 'Internal Server Error'},500
    
    
    @rpc
    def get_project(self):
        try:
            projects = list(self.project_collection.find())
            for project in projects:
                project['_id'] = str(project['_id'])
                print(project)
            return projects, 200
        except Exception as e:
            print(e)
            return {'error': 'Internal Server Error'},500
    
    @rpc
    def update_project_name(self, projectId, data):
        try:
            if not ObjectId.is_valid(projectId):
                # print(editingSprint_id)
                return {'error': 'Invalid ObjectId'}, 400

            project_id = ObjectId(projectId)

            update_fields = {
                'projectName': data.get('projectName', ''),
            }

            result = self.project_collection.update_one({'_id': project_id}, {'$set': update_fields})

            if result.matched_count > 0:
                return {'message': 'Project name Updated successfully'}, 200
            else:
                return {'error': 'Project not found'}, 404
        except Exception as e:
            print(e)
            return {'error': 'Internal Server Error'}, 500
    @rpc
    def delete_project(self, projectId):
        try:
            project_id = ObjectId(projectId)

            # Find and delete associated tasks and subtasks
            tasks = self.task_collection.find({'projectId': str(project_id)})
            for task in tasks:
                task_id = task['_id']
                print(f"Deleting task {task_id} for project {project_id}")
                # Delete subtasks associated with each task
                subtasks_result = self.subtask_collection.delete_many({'taskId': str(task_id)})
                print(f"Deleted {subtasks_result.deleted_count} subtasks for task {task_id}")
                # Delete the task itself
                task_result = self.task_collection.delete_one({'_id': task_id})
                print(f"Deleted task {task_id}: {task_result.deleted_count}")

            # Finally, delete the project
            result = self.project_collection.delete_one({'_id': project_id})
            print(f"Deleted project {project_id}: {result.deleted_count}")

            if result.deleted_count > 0:
                return {'message': 'Project and associated tasks and subtasks deleted successfully'}, 200
            else:
                return {'error': 'Project not found'}, 404
        except Exception as e:
            print(e)
            return {'error': 'Internal Server Error'}, 500




class Project_Task_Service(BaseService):
    name = "project_task_service"
    task_collection = BaseService.db.get_collection('tasks')
    @rpc
    def create_project_tasks(self, data):
        try:
            new_task = {
                'projectId': data.get('projectId', ''),
                'title': data.get('title', ''),
                'assignedTo': data.get('assignedTo', ''),
                'startDate': data.get('startDate',''),
                'dueDate': data.get('dueDate', ''),
                'status':data.get('status',''),
                'statusIcon': data.get('statusIcon', ''),  
                'statusColor': data.get('statusColor', '')
                # Add other task properties
            }

            result = self.task_collection.insert_one(new_task)
            inserted_task = self.task_collection.find_one({'_id': result.inserted_id})
            inserted_task['_id'] = str(inserted_task['_id'])

            # print(f"Inserted task: {inserted_task}")

            return inserted_task,200
        except Exception as e:
            print(e)
            return {'error': 'Internal Server Error'},500

    
    @rpc
    def get_project_tasks(self, projectId):
        try:
            tasks = list(self.task_collection.find({'projectId': projectId}))
            for task in tasks:
                task['_id'] = str(task['_id'])  # Convert ObjectId to string
            print(f"projectID {projectId} and task {tasks}")
            return tasks, 200
        except Exception as e:
            print(e)
            return {'error': 'Internal Server Error'}, 500
    
    @rpc
    def update_task(self, taskId, data):
        print(f"Data received for taskId {taskId}: {data}")  # Log the incoming data
        try:
            update_fields = {}

            # Collect fields to update
            if 'status' in data:
                update_fields['status'] = data['status']
            if 'statusIcon' in data:
                update_fields['statusIcon'] = data['statusIcon']
            if 'statusColor' in data:
                update_fields['statusColor'] = data['statusColor']
            if 'title' in data:
                update_fields['title'] = data['title']
            if 'assignedTo' in data:
                update_fields['assignedTo'] = data['assignedTo']
            if 'startDate' in data:
                update_fields['startDate'] = data['startDate']
            if 'dueDate' in data:
                update_fields['dueDate'] = data['dueDate']

            if update_fields:
                print(f"Update fields: {update_fields}")  # Log fields to update
                query = {'_id': ObjectId(taskId)}
                print(f"Update query: {query}")  # Log the query
                # Update only the task that matches _id
                result = self.task_collection.update_one(
                    query,
                    {'$set': update_fields}
                )
                print(f"Update result: {result.modified_count}")  # Log the result
                if result.modified_count > 0:
                    return {'message': 'ProjectTask updated successfully'}, 200
                else:
                    return {'error': 'ProjectTask not found or no changes made'}, 404
            else:
                return {'error': 'No fields to update'}, 400

        except Exception as e:
            print(f"Error during update: {e}")  # Log the exception
            return {'error': 'Internal Server Error'}, 500

        
    @rpc
    def delete_task(self, taskId):
        try:
            result = self.task_collection.delete_one({'_id': ObjectId(taskId)})
            if result.deleted_count > 0:
                return {'message': 'Task deleted successfully'}, 200
            else:
                return {'error': 'Task not found'}, 404
        except Exception as e:
            print(f"Error during delete: {e}")  # Log the exception
            return {'error': 'Internal Server Error'}, 500
    
class Project_Subtask_Service(BaseService):
    name = "project_Subtask_service"
    subtask_collection = BaseService.db.get_collection('Subtasks')
    
    @rpc
    def create_project_Subtasks(self, data, taskId):  # Accept taskId parameter
        try:
            new_subtask = {
                'title': data.get('title', ''),
                'taskId': taskId,  # Store taskId with the subtask data
            }

            result = self.subtask_collection.insert_one(new_subtask)
            inserted_subtask = self.subtask_collection.find_one({'_id': result.inserted_id})
            inserted_subtask['_id'] = str(inserted_subtask['_id'])
            print(new_subtask)

            return inserted_subtask, 200
        except Exception as e:
            print(e)
            return {'error': 'Internal Server Error'}, 500
        
    @rpc
    def get_project_subtasks(self, taskId):
        print("taskId", taskId)
        try:
            subtasks = list(self.subtask_collection.find({'taskId': taskId}))
            for subtask in subtasks:
                subtask['_id'] = str(subtask['_id'])  # Convert ObjectId to string
            print(f"task {subtasks}")
            return subtasks, 200
        except Exception as e:
            print(e)
            return {'error': 'Internal Server Error'}, 500
        
        
    @rpc
    def update_project_Subtask(self, subtask_id, data):
        try:
            updated_subtask = {
                'title': data.get('title', ''),
                'taskId': data.get('taskId', '')
            }

            result = self.subtask_collection.update_one(
                {'_id': ObjectId(subtask_id)},
                {'$set': updated_subtask}
            )

            if result.matched_count == 0:
                return {'error': 'Subtask not found'}, 404

            updated_subtask = self.subtask_collection.find_one({'_id': ObjectId(subtask_id)})
            updated_subtask['_id'] = str(updated_subtask['_id'])

            return updated_subtask, 200
        except Exception as e:
            print(e)
            return {'error': 'Internal Server Error'}, 500
        
    @rpc
    def delete_project_Subtask(self, subtask_id):
        try:
            result = self.subtask_collection.delete_one({'_id': ObjectId(subtask_id)})

            if result.deleted_count == 0:
                return {'error': 'Subtask not found'}, 404

            return {'message': 'Subtask deleted successfully'}, 200
        except Exception as e:
            print(e)
            return {'error': 'Internal Server Error'}, 500
        
class Bid_Service(BaseService):
    name = "bid_service"
    bid_collection = BaseService.db.get_collection('bids')
    bid_request_collection = BaseService.db.get_collection('bid_requests')
    @rpc
    def create_bid(self,data):
        try:
            bidder_name = data.get('bidderName', '')
            existing_bids_count = self.bid_collection.count_documents({'bidderName': bidder_name})
            if existing_bids_count >= 3:
                return {'error': 'You have reached the maximum limit of bids (3)'}, 400
            new_bid = {
                'bidProjectName': data.get('bidProjectName', ''),
                'bidderName': bidder_name,
                'bidAmount': data.get('bidAmount', ''),
                'bidHour': data.get('bidHour'),
                # Add other bid properties as needed
            }

            result = self.bid_collection.insert_one(new_bid)
            inserted_bid = self.bid_collection.find_one({'_id': result.inserted_id})
            inserted_bid['_id'] = str(inserted_bid['_id'])

            print(f"Inserted bid: {inserted_bid}")

            return inserted_bid, 201
        except Exception as e:
            print(e)
            return {'error': 'Internal Server Error'}, 500
        
    @rpc
    def get_bid(self):
        try:
            bids = list(self.bid_collection.find())
            for bid in bids:
                bid['_id'] = str(bid['_id'])
            return bids, 200
        except Exception as e:
            print(e)
            return {'error': 'Internal Server Error'}, 500
        
    @rpc
    def delete_bids(self,bid_id):
        try:
            result = self.bid_collection.delete_one({'_id':ObjectId(bid_id)})
            if result.deleted_count > 0:
                return {'message': 'Bid deleted successfully'}, 200
            else:
                return {'error': 'Bid not found'}, 404
        except Exception as e:
            print(e)
            return {'error': 'Internal Server Error'}, 500
    
    @rpc
    def bid_req(self,data):
        try:
            # Extract bid data from the request
            bidder_name = data.get('bidderName', '')
            bid_project_name = data.get('bidProjectName', '')
            bid_amount = data.get('bidAmount', '')

            # Check if the bid with the same bidder name, project name, and amount already exists
            existing_bid = self.bid_request_collection.find_one({
                'bidderName': bidder_name,
                'bidProjectName': bid_project_name,
                'bidAmount': bid_amount
            })

            if existing_bid:
                return {'error': 'Bid with the same details already exists'}, 400

            # Check the number of bids by the bidder
            existing_bids_count = self.bid_request_collection.count_documents({'bidderName': bidder_name})

            # Check if the bidder has exceeded the limit
            if existing_bids_count >= 3:
                return {'error': 'You have reached the maximum limit of bids (3)'}, 400

            # Insert the bid into the collection
            new_bid = {
                'bidProjectName': bid_project_name,
                'bidderName': bidder_name,
                'bidAmount': bid_amount,
                # Add other bid properties as needed
            }

            result = self.bid_request_collection.insert_one(new_bid)
            inserted_bid = self.bid_request_collection.find_one({'_id': result.inserted_id})
            inserted_bid['_id'] = str(inserted_bid['_id'])

            print(f"Inserted bid: {inserted_bid}")

            return inserted_bid, 201
        except Exception as e:
            print(e)
            return {'error': 'Internal Server Error'}, 500


    @rpc
    def get_requested_bid(self):
        try:
            bids = list(self.bid_request_collection.find())
            for bid in bids:
                bid['_id'] = str(bid['_id'])
                print(bid)
            return bids, 200
        except Exception as e:
            print(e)
            return {'error': 'Internal Server Error'},500



    @rpc
    def delete_approved_bid(self,bid_id):
        try:
            result = self.bid_request_collection.delete_one({'_id':ObjectId(bid_id)})
            if result.deleted_count > 0:
                return {'message': 'Bid deleted successfully'}, 200
            else:
                return {'error': 'Bid not found'}, 404
        except Exception as e:
            print(e)
            return {'error': 'Internal Server Error'}, 500

class Invite_Service(BaseService):
    name = "invite_service"
    @rpc    
    def invite_mail(self, data):
        try:
            for i in data["members"]:
                EMAIL = i["email"]
                NAME = i["name"]
                USERTYPE = i["userType"]
                PROJECT_NAME = "project management tool"
                HOST = "smtp.gmail.com"
                PORT = 587
                FROM_EMAIL = "managementproject12345678@gmail.com"
                TO_EMAIL = EMAIL
                print(TO_EMAIL)
                print(data)
                APP_PASSWORD = {PROJECT_NAME: 'hakq nurn humc alpo'}
                PROJECT_LINK = "http://localhost:3000/components/Home"

                SUBJECT = f"""Mail sent using Python to {NAME}"""

                BODY = f"""
                Hi all about python,
                This email is sent using a test account.
                thanks,
                Test Account

                Project link: {PROJECT_LINK}
                """

                message = MIMEMultipart()
                message['From'] = FROM_EMAIL
                message['To'] = TO_EMAIL
                message['Subject'] = SUBJECT

                message.attach(MIMEText(BODY, 'plain'))

                smtp = smtplib.SMTP(HOST, PORT)

                status_code, response = smtp.ehlo()
                print(f"[*]Starting TLS connection: {status_code} {response}")

                status_code, response = smtp.starttls()
                print(f"[*]Starting TLS connection: {status_code} {response}")

                status_code, response = smtp.login(FROM_EMAIL, APP_PASSWORD.get(PROJECT_NAME))
                print(f"[*]Starting TLS connection: {status_code} {response}")

                smtp.sendmail(FROM_EMAIL, TO_EMAIL, message.as_string())
                print("Email sent to : " + str(NAME) + " the email is " + str(EMAIL) + " and usertype is " + USERTYPE)
                smtp.quit()
            return {'message': 'Invitation email sent successfully'},200

        except Exception as e:
            print(e)
            return {'error': 'Internal Server Error'}, 500
        
class UserStoryService(BaseService):
    name = "userstory_service"
    newuserstory_collection = BaseService.db.get_collection('new_user_story')

    @rpc
    def create_newuserstory(self, data):
        try:
            newuserstory = {
                'user_id': str(data.get('user_id', '')),
                'project_id': str(data.get('project_id', '')),  # Add project_id field
                'subject': data.get('subject', ''),
                'description': data.get('description', ''),
                'tags': data.get('tags', []),
                'assignedTo': data.get('assignedTo', ''),
                'status': data.get('status', 'New'),
                'points': data.get('points', '')
            }
            result = self.newuserstory_collection.insert_one(newuserstory)
            inserted_newuserstory = self.newuserstory_collection.find_one({'_id': result.inserted_id})
            inserted_newuserstory['_id'] = str(inserted_newuserstory['_id'])
            return inserted_newuserstory, 200
        except Exception as e:
            print(e)
            return {'error': 'Internal Server Error'}, 500

    @rpc
    def get_newuserstory(self, project_id):
        try:
            newuserstories = list(self.newuserstory_collection.find({'project_id': project_id}))
            for userstory in newuserstories:
                userstory['_id'] = str(userstory['_id'])
            return newuserstories, 200
        except Exception as e:
            print(e)
            return {'error': 'Internal Server Error'}, 500

    @rpc
    def update_newuserstory(self, user_id, data):
        try:
            update_fields = {}

            if 'subject' in data:
                update_fields['subject'] = data.get('subject', '')
            if 'status' in data:
                update_fields['status'] = data.get('status', '')

            if update_fields:
                result = self.newuserstory_collection.update_one({'user_id': user_id}, {'$set': update_fields})

                if result.matched_count > 0:
                    return {'message': 'Newuserstory updated successfully'}, 200
                else:
                    return {'error': 'Newuserstory not found'}, 404
            else:
                return {'error': 'No fields to update'}, 400

        except Exception as e:
            print(e)
            return {'error': 'Internal Server Error'}, 500

    @rpc
    def delete_newuserstory(self, user_id):
        try:
            result = self.newuserstory_collection.delete_one({'user_id': user_id})
            if result.deleted_count > 0:
                return {'message': 'Newuserstory deleted successfully'}, 200
            else:
                return {'error': 'Newuserstory not found'}, 404
        except Exception as e:
            print(f"Error deleting user story with user_id {user_id}: {e}")
            return {'error': 'Internal Server Error'}, 500
        
class TaskService(BaseService):
    name = "task_service"
    newtask_collection = BaseService.db.get_collection('task')

    @rpc
    def create_newtask(self, data, user_id):
        try:
            print("Received data:", data)  # Add this line
            newtask = {
                'user_id': user_id,
                'title': data.get('title', ''),
            }
            result = self.newtask_collection.insert_one(newtask)
            inserted_newtask = self.newtask_collection.find_one({'_id': result.inserted_id})
            inserted_newtask['_id'] = str(inserted_newtask['_id'])
            print("Inserted new task:", inserted_newtask)  # Add this line
            return inserted_newtask, 200
        except Exception as e:
            print("Exception occurred:", e)  # Add this line
            return {'error': 'Internal Server Error'}, 500

    @rpc
    def get_userstory_tasks(self, user_id):
        print("user_id", user_id)
        try:
            tasks = list(self.newtask_collection.find({'user_id': user_id}))
            for task in tasks:
                task['_id'] = str(task['_id'])  # Convert ObjectId to string
            print(f"tasks {tasks}")
            return tasks, 200
        except Exception as e:
            print(e)
            return {'error': 'Internal Server Error'}, 500

    @rpc
    def update_userstorytask(self, task_id, data):
        try:
            print("Received data for update:", data)  # Add this line
            update_result = self.newtask_collection.update_one(
                {'_id': ObjectId(task_id)},
                {'$set': data}
            )
            if update_result.modified_count > 0:
                updated_task = self.newtask_collection.find_one({'_id': ObjectId(task_id)})
                updated_task['_id'] = str(updated_task['_id'])
                print("Updated task:", updated_task)  # Add this line
                return updated_task, 200
            else:
                return {'error': 'Task not found'}, 404
        except Exception as e:
            print("Exception occurred:", e)  # Add this line
            return {'error': 'Internal Server Error'}, 500

    @rpc
    def delete_userstorytask(self, task_id):
        try:
            print("Received task_id for delete:", task_id)  # Add this line
            delete_result = self.newtask_collection.delete_one({'_id': ObjectId(task_id)})
            if delete_result.deleted_count > 0:
                print("Deleted task with ID:", task_id)  # Add this line
                return {'message': 'Task deleted successfully'}, 200
            else:
                return {'error': 'Task not found'}, 404
        except Exception as e:
            print("Exception occurred:", e)  # Add this line
            return {'error': 'Internal Server Error'}, 500

        
class SprintService(BaseService):
    name = "sprint_service"
    newsprint_collection = BaseService.db.get_collection('newsprint')
    @rpc
    def create_newsprint(self,data):
        try:
            newsprint = {
            'id': data.get('id',''),
            'name': data.get('name',''),
            'durationFrom': data.get('durationFrom',''),
            'durationTo': data.get('durationTo',''),        
            }

            result = self.newsprint_collection.insert_one(newsprint)
            inserted_newsprint = self.newsprint_collection.find_one({'_id': result.inserted_id})
            inserted_newsprint['_id'] = str(inserted_newsprint['_id'])

            print(f"Inserted task: {inserted_newsprint}")

            return inserted_newsprint,200
        except Exception as e:
            print(e)
            return {'error': 'Internal Server Error'},500
    
    @rpc
    def get_newsprint(self):
        try:
            newsprints = list(self.newsprint_collection.find())
            for newsprint in newsprints:
                newsprint['_id'] = str(newsprint['_id'])
            return newsprints, 200
        except Exception as e:
            print(e)
            return {'error': 'Internal Server Error'}, 500
        
    @rpc
    def update_newsprint(self, editingSprint_id, data):
        try:
            if not ObjectId.is_valid(editingSprint_id):
                print(editingSprint_id)
                return {'error': 'Invalid ObjectId'}, 400

            sprint_id = ObjectId(editingSprint_id)

            update_fields = {
                'name': data.get('name', ''),
                'durationFrom': data.get('durationFrom', ''),
                'durationTo': data.get('durationTo', '')
            }

            result = self.newsprint_collection.update_one({'_id': sprint_id}, {'$set': update_fields})

            if result.matched_count > 0:
                return {'message': 'Sprint Updated successfully'}, 200
            else:
                return {'error': 'Sprint not found'}, 404
        except Exception as e:
            print(e)
            return {'error': 'Internal Server Error'}, 500
    @rpc
    def delete_sprint(self,sprint_id):
        try:
            result = self.newsprint_collection.delete_one({'_id':ObjectId(sprint_id)})
            if result.deleted_count > 0:
                return {'message': 'Sprint deleted successfully'}, 200
            else:
                return {'error': 'Sprint not found'}, 404
        except Exception as e:
            print(e)
            return {'error': 'Internal Server Error'}, 500

        

class SprintTaskService(BaseService):
    name = "sprinttask_service"
    sprinttask_collection = BaseService.db.get_collection('sprinttasks')
    @rpc
    def create_sprinttask(self, data):
        try:
            new_sprinttask = {
                'id': data.get('id',''),
                'title': data.get('title', ''),
                'description': data.get('description', ''),
                'assignedTo': data.get('assignedTo', ''),
                'status': data.get('status', 'NEW'),
                'sprintId': data.get('sprintId','')
                
            }
            result = self.sprinttask_collection.insert_one(new_sprinttask)
            inserted_sprinttask = self.sprinttask_collection.find_one({'_id': result.inserted_id})
            inserted_sprinttask['_id'] = str(inserted_sprinttask['_id'])

            return inserted_sprinttask, 200
        except Exception as e:
            print(e)
            return {'error': 'Internal Server Error'}, 500

    @rpc
    def get_sprinttask(self, sprintId=None, search=None):
        try:
            query = {}
            if sprintId:
                query['sprintId'] = sprintId
            if search:
                query['title'] = {'$regex': search, '$options': 'i'}

            sprinttasks = list(self.sprinttask_collection.find(query))
            if sprinttasks:
                for task in sprinttasks:
                    task['_id'] = str(task['_id'])
                return sprinttasks, 200
            else:
                return {'error': 'Tasks not found'}, 404
        except Exception as e:
            print(e)
            return {'error': 'Internal Server Error'}, 500
    @rpc
    def update_sprinttask(self, task_id, data):
        try:
            updated_task = {
                'title': data.get('title', ''),
                'description': data.get('description', ''),
                'assignedTo': data.get('assignedTo', ''),
                'status': data.get('status', 'NEW'),
            }
            result = self.sprinttask_collection.update_one(
                {'_id': ObjectId(task_id)},
                {'$set': updated_task}
            )
            if result.matched_count:
                updated_task['_id'] = task_id
                return updated_task, 200
            else:
                return {'error': 'Task not found'}, 404
        except Exception as e:
            print(e)
            return {'error': 'Internal Server Error'}, 500

    @rpc
    def delete_sprinttask(self, task_id):
        try:
            result = self.sprinttask_collection.delete_one({'_id': ObjectId(task_id)})
            if result.deleted_count:
                return {'message': 'Task deleted successfully'}, 200
            else:
                return {'error': 'Task not found'}, 404
        except Exception as e:
            print(e)
            return {'error': 'Internal Server Error'}, 500
    @rpc
    def update_sprinttaskstatus(self, task_id, data):
        try:
            updated_task_status = {
                'status': data.get('status', 'NEW'),
            }
            result = self.sprinttask_collection.update_one(
                {'_id': ObjectId(task_id)},
                {'$set': updated_task_status}
            )
            if result.matched_count:
                updated_task_status['_id'] = task_id
                return updated_task_status, 200
            else:
                return {'error': 'Task not found'}, 404
        except Exception as e:
            print(e)
            return {'error': 'Internal Server Error'}, 500


    

        







    





    