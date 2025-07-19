from flask import request, jsonify, g
from functools import wraps
import jwt
import requests

AUTH0_DOMAIN = "dev-877imlccjsw0uj8x.us.auth0.com"
API_AUDIENCE = "https://rh206api/"
ALGORITHMS = ["RS256"]
JWKS_URL = f"https://{AUTH0_DOMAIN}/.well-known/jwks.json"

jwks = requests.get(JWKS_URL).json()

def get_signing_key(token):
    headers = jwt.get_unverified_header(token)
    kid = headers["kid"]

    for key in jwks["keys"]:
        if key["kid"] == kid:
            return jwt.algorithms.RSAAlgorithm.from_jwk(key)

    raise Exception("Signing key not found.")

def jwt_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization", None)
        if not auth_header or not auth_header.startswith("Bearer "):
            return jsonify({"msg": "Missing or invalid token"}), 401

        token = auth_header.split()[1]
        try:
            key = get_signing_key(token)
            payload = jwt.decode(
                token,
                key=key,
                algorithms=ALGORITHMS,
                audience=API_AUDIENCE,
                issuer=f"https://{AUTH0_DOMAIN}/"
            )
            g.current_user = payload  # ✅ THIS IS CRITICAL
        except Exception as e:
            return jsonify({"msg": "Token validation failed", "error": str(e)}), 401

        return f(*args, **kwargs)
    return decorated
