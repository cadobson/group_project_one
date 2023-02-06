import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Questions from './components/Questions';

import "./overall-style.css"
import Question from './components/Question';
import Answer from './components/Answer/Answer';
import Comment from './components/Comment/Comment'
import { AddComment } from './components/Comment/AddComment';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar loaded={loaded} />
      <div className='central-column'>
        <Switch>
          <Route path='/questions/:id' exact={true}>
            <Question />
          </Route>
          <Route path='/answers/:id' exact={true}>
            <Answer />
          </Route>
          <Route path='/login' exact={true}>
            <LoginForm />
          </Route>
          <Route path='/sign-up' exact={true}>
            <SignUpForm />
          </Route>
          <ProtectedRoute path='/users' exact={true} >
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute path='/users/:userId' exact={true} >
            <User />
          </ProtectedRoute>
          <Route path='/' exact={true} >
            <Questions />
          </Route>

          <Route exact path='/comments/:commentId'>
            <Comment />
          </Route>

          <Route exact path='/answers/:answerId/comments/new'>
            <AddComment />
          </Route>

        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
