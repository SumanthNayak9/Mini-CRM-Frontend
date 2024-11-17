// src/components/LoginPage.js
import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';  // Replace useHistory with useNavigate

const LoginPage = () => {
  const navigate = useNavigate();  // Use useNavigate instead of useHistory

  const handleSuccess = (response) => {
    console.log('Login Successful:', response);

    if (response.credential) {
      // Redirect to the dashboard page after successful authentication
      navigate('/dashboard');  // Use navigate instead of history.push
    } else {
      console.error('Authentication failed, invalid credentials');
    }
  };

  const handleError = () => {
    console.error('Login Failed');
  };

  return (
    <GoogleOAuthProvider clientId="1032129588279-fjhfrlauc8s0d98ievv5v8o62tjm3u73.apps.googleusercontent.com">
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        backgroundColor: '#f4f4f9',
        flexDirection: 'column'
      }}>
        <h2 style={{ marginBottom: '20px' }}>Mini CRM & Campaign Management Application</h2>
        <div style={{
          padding: '30px', 
          borderRadius: '8px', 
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
          backgroundColor: '#fff',
          textAlign: 'center',
          width: '100%',
          maxWidth: '400px'
        }}>
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
          />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
