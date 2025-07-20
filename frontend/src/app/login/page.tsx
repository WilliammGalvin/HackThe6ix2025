
'use client';
import React from 'react';



export default function LoginPage() {
    const handleGithubSignIn = () => {
        // Replace with your backend or auth provider URL
        window.location.href = "https://dev-877imlccjsw0uj8x.us.auth0.com/authorize?audience=https://rh206api/&scope=openid%20profile%20email&response_type=token&client_id=Y8BCK6wsCPmdDvrNmI0BUSqZ8dNmMXvM&redirect_uri=http://localhost:3000/auth&connection=github";
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10vh' }}>
            <h1>Sign In</h1>
            <button
                onClick={handleGithubSignIn}
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    borderRadius: '5px',
                    border: 'none',
                    backgroundColor: '#24292f',
                    color: '#fff',
                    cursor: 'pointer',
                    marginTop: '20px'
                }}
            >
                Sign in with GitHub
            </button>
        </div>
    );
}