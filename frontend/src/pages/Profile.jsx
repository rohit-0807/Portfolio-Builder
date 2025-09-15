import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchprofile = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await axios.get('http://localhost:7777/profile',{
          headers: { // Changed 'Headers' to 'headers'
            Authorization: `zoro ${token}`,
          },
        });
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchprofile();
  }, [])
  return (
   <div>
      <h2>Profile Page</h2>
      {user ? (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
  
}

export default Profile