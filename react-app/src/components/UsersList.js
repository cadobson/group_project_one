import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/user/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const userComponents = users.map((user) => {
    return (
      <li key={user.id}>
        <NavLink to={`/users/${user.id}`}>{user.username}</NavLink>
      </li>
    );
  });

  return (
    <div className='user-list'>
      <div className='card-for-one-question'>
        <h1>User List: </h1>
        <div>This is a list of all users. This is for development and demonstration purposes only, and would be removed for a website in production.</div>
        <ul>{userComponents}</ul>
      </div>
    </div>
  );
}

export default UsersList;
