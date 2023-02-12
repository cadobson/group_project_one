import './user.css'
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CommentsUser } from './Comments/CommentsUser';
import { UseridQuestions } from './Questions/UseridQuestions';
import { AnswersByUserId } from './Answers/AnswersByUserId';

function User() {
  const [user, setUser] = useState({});
  const [showComments, setShowComments] = useState(false)
  const [showQuestions, setShowQuestions] = useState(false)
  const [showAnswers, setShowAnswers] = useState(false)

  const { userId } = useParams();

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/user/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  const activeComments = () =>{
     return <CommentsUser />
  }

  return (
    <div className='user-list'>
      <div className='card-for-one-question'>
        <ul>
          <li key="id">
            <strong>User Id</strong> {userId}
          </li>
          <li key="username">
            <strong>Username</strong> {user.username}
          </li>
          <li key="email">
            <strong>Email</strong> {user.email}
          </li>
        </ul>
        <div className='user-components' style = {{display:"flex", flexDirection:"column", justifyContent:"space-between"}}>

          <button onClick={()=>setShowQuestions(!showQuestions)}>Questions</button>
          {showQuestions && <UseridQuestions />}

          {/* <button onClick={()=>setShowAnswers(!showAnswers)}>answers</button>
          {showAnswers && <AnswersByUserId />}

          <button onClick={()=>setShowComments(!showComments)}>comments</button>
          {showComments && <CommentsUser />} */}

        </div>
      </div>
    </div>
  );
}
export default User;
