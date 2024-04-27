import Navbar from 'components/Navbar';
import Login from 'components/auth/login';
import React from 'react';

const LoginPage = () => {
  return (
    <div>
       <Navbar></Navbar> 
      <Login/>
    </div>
  );
}

export default LoginPage;
