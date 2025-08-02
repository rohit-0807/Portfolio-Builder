import React from 'react'
import { useState } from 'react'

const SignupForm = () => {
    
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [fromData, setFromData] = useState ({
        name : '',
        email : '',
        password : ''
    });

    const handleChange = (e) => {
        setFromData({
            ...fromData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
       try{
         const response = await fetch('http://localhost:7777/signup', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(fromData),
        });

        const data = await response.json();
        console.log(data);

        if(response.ok) {
            setMessage('signup successfully');
            setError('');
            setFromData({name:'',email:'',password:''});
        } else {
            setError(data.message , 'signup failed');
            setMessage('');
        }

       } catch (error) {
        console.error("dignup failed ", error);
        setError('Signup failed. Please try again later.');
        setMessage('');
       }
        
    }

  
    
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input 
            type='text'
            name = 'name'
            placeholder= 'Name'
            value = {fromData.name}
            onChange = {handleChange}
            />
            <br />
            <input 
            type= 'email'
            name= 'email'
            placeholder='Email'
            value = {fromData.email}
            onChange = {handleChange}
             />
             <br />
             <input 
             type= 'password'
             name='password'
             placeholder='Password'
             value={fromData.password}
             onChange={handleChange}
              />
              <br />
              <button type='submit'>Sign up</button>
        </form>

        {message && <p style={{ color: 'green'}} > {message} </p>}
        {error && <p style={{ color: 'red'}}> {error} </p>}

    </div>
  )
}

export default SignupForm