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
import { EditComment } from './components/Comment/EditComment';
import { RemoveComment } from './components/Comment/RemoveComment';
import {CommentsCur} from './components/Comments/CommentsCur';
import { CommentsUser } from './components/Comments/CommentsUser';
import { SearchDb } from './components/Search/SearchDb';
import { SearchResult } from './components/Search/SearchResult';
import { UseridQuestions } from './components/Questions/UseridQuestions';
import { AnswersByUserId } from './components/Answers/AnswersByUserId';
import AllTags from './components/Tags/AllTags';
import OneTag from './components/Search/OneTag';


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
          <Route path='/questions/:id' exact>
            <Question />
          </Route>
          <Route path='/answers/:id' exact>
            <Answer />
          </Route>
          <Route path='/login' exact>
            <LoginForm />
          </Route>
          <Route path='/sign-up' exact>
            <SignUpForm />
          </Route>
          <ProtectedRoute path='/users' exact >
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute path='/users/:userId' exact >
            <User />
          </ProtectedRoute>
          <Route path='/' exact >
            <Questions />
          </Route>

          <Route exact path='/users/:userId/questions'>
            <UseridQuestions />
          </Route>

          <Route exact path='/users/:userId/comments'>
            <CommentsUser />
          </Route>
          <Route exact path='/users/:userId/answers'>
            <AnswersByUserId />
          </Route>





          <Route exact path='/comments/current'>
            <CommentsCur />
          </Route>

          <Route exact path='/comments/:commentId/edit'>
            <EditComment />
          </Route>

          <Route exact path='/comments/:commentId/delete'>
            <RemoveComment />
          </Route>

          <Route exact path='/comments/:commentId'>
            <Comment />
          </Route>

          <Route exact path='/answers/:answerId/comments/new'>
            <AddComment />
          </Route>

          <Route exact path='/search'>
            <SearchDb />
          </Route>
          <Route exact path='/search/result'>
            <SearchResult />
          </Route>

          <Route exact path='/tags'>
            <AllTags />
          </Route>
          <Route exact path='/tags/:tagName'>
            <OneTag />
          </Route>


        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
