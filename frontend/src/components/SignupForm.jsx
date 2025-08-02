import React from 'react'
import { useState } from 'react'

const SignupForm = () => {
    
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
       } catch (error) {
        console.error("dignup failed ", error);
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
    </div>
  )
}

export default SignupForm