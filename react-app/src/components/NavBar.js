
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../store/session';
import LogoutButton from './auth/LogoutButton';
import "./navbar.css"
import { SearchDb } from './Search/SearchDb';

const NavBar = ({ loaded }) => {
  const sessionUser = useSelector(state => state.session.user)

  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      // <LogoutButton />
      // <NavLink to="/signup" exact={true} activeClassName='active'>
      //   Logout
      // </NavLink>
      <div className='logout-text' onClick={onLogout}>
        Logout
      </div>
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

        <NavLink to='/tags' exact={true} activeClassName='active'>
          Tags
        </NavLink>

        {loaded && sessionLinks }
        <SearchDb />

      </nav>






  );
}

export default NavBar;
