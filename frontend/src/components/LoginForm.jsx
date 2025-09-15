import React from 'react'
import { useState } from 'react'

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,

    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:7777/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);

      if(response.ok) {
        localStorage.setItem('token',data.token);
        setMessage('Login successful');
        console.log('Login successful');
        setError('');
      } else {
        console.error('login failed', data.message);
        setError('login failed');
        setMessage('');
      }

    } catch (error) {
      console.error("login failed", error);
      setError('Login failed. Please try again later.');
      setMessage('');
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
        type='email'
        name='email'
        placeholder='Email'
        value={formData.email}
        onChange={handleChange}
        />
        <br />
        <input 
         type='password'
         name='password'
         placeholder='Password'
         value={formData.password}
         onChange={handleChange}
        />
        <br />

        <button type='submit'>LogIn</button>
      </form>

      {message && <p style={{ color: 'green'}}>{message}</p>}
      {error && <p style={{ color: 'red'}}>{error}</p>}
    </div>
  )
}

export default LoginForm