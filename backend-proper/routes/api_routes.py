from flask import Blueprint, jsonify,g
from auth import jwt_required
from db import db  # import db instance from db.py

api_blueprint = Blueprint('api', __name__)

@api_blueprint.route('/')
def home():
    return 'Hello from Flask!'

@api_blueprint.route('/petitions/verify-auth', methods=['GET'])
@jwt_required
def verify_auth():
    user = g.current_user
    return jsonify({
        "authorized": True,
        "user_id": user.get("sub"),
        "email": user.get("email"),
        "already_signed": False  # Or whatever logic you're using
    })


@api_blueprint.route('/authorized')
@jwt_required
def authorized():
    return jsonify(authorized=True)

@api_blueprint.route('/test-write')
def test_write():
    try:
        result = db.ht7.insert_one({  # change 'test_collection' to your actual collection name
            "message": "Hello, Hack The 6ix!",
            "success": True
        })
        return {
            "status": "success",
            "inserted_id": str(result.inserted_id)
        }
    except Exception as e:
        return {
            "status": "error",
            "error": str(e)
        }, 500
