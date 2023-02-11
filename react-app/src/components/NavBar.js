
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import "./navbar.css"
import { SearchDb } from './Search/SearchDb';

const NavBar = ({ loaded }) => {
  const sessionUser = useSelector(state => state.session.user)

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <LogoutButton />
    )
  } else {
    sessionLinks = (
      <>
        <NavLink to='/login' exact={true} activeClassName='active'>Login</NavLink>
        <NavLink to='/sign-up' exact={true} activeClassName='active'>Sign Up</NavLink>
      </>

    )
  }

  return (
    
      <nav className="navigation-holder">

        <NavLink to='/' exact={true} activeClassName='active'><span id="home-logo">Boura</span></NavLink>

        <NavLink to='/users' exact={true} activeClassName='active'>
          Users
        </NavLink>

        {loaded && sessionLinks }
        <SearchDb />

      </nav>

    




  );
}

export default NavBar;
