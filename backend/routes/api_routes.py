from flask import Blueprint, jsonify,g
from auth import jwt_required
from db import db  # import db instance from db.py
from flask import request
import requests
api_blueprint = Blueprint('api', __name__)



def get_userinfo(token):
    resp = requests.get(
        f"https://dev-877imlccjsw0uj8x.us.auth0.com/userinfo",
        headers={"Authorization": f"Bearer {token}"}
    )
    if resp.ok:
        return resp.json()
    return {}



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



@api_blueprint.route("/petitions/sign", methods=["POST"])
@jwt_required
def sign_petition():
    data = request.get_json()
    name = data.get("name")

    if not name:
        return jsonify({"msg": "Name is required"}), 400

    # Get user info from Auth0 userinfo endpoint
    auth_header = request.headers.get("Authorization", "")
    token = auth_header.split(" ")[1] if auth_header else None

    userinfo = get_userinfo(token) if token else {}
    print(userinfo)
    nickname = userinfo.get("nickname")
    picture = userinfo.get("picture")

    db.signatures.insert_one({
        "name": name,
        "email": nickname,
        "picture": picture
    })

    return jsonify({"msg": "Petition signed successfully"}), 200




@api_blueprint.route("/petitions/signatures", methods=["GET"])
@jwt_required
def get_signatures():
    # Query all signatures from MongoDB
    all_signatures = list(db.signatures.find({}, {"_id": 0}))  # exclude MongoDB _id for simplicity
    return jsonify(all_signatures)