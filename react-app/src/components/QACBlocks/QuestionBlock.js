import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import AnswerBlock from "./AnswerBlock"
import EditQuestion from "./EditQuestion"
import NewAnswer from "./NewAnswer"
import UserBlock from "./UserBlock"


const QuestionBlock = ({ questionData }) => {
  const {id, title, body, Asker, Answers} = questionData


  const [showNewAnswer, setShowNewAnswer] = useState(false)
  const [showEdit, setShowEdit] = useState(false)

  const currentSessionUser = useSelector(state => state.session.user)
  const currentSessionUserId = currentSessionUser.id

  const questionId = useParams()
  const dispatch = useDispatch()

  const handleDelete = (e) => {

  }

  return (
    <div className="question-block">
      <div className="question-block-author">
        <UserBlock userData={Asker}/>
      </div>
      <div className="question-block-title">
        <h1>
          {title}
        </h1>
      </div>
      <div className="question-block-body">
        {body}
      </div>

      <div className="interactions">
        {currentSessionUser && (
          <div className="new-comment-button-controls">
            <button className="new-comment-button" onClick={() => setShowNewAnswer(!showNewAnswer)}>New Answer</button>

          </div>
        )}


        {currentSessionUserId === Asker.askerId && (
        <div className="answer-block-owner-controls">
          <button className="edit-delete-qac" onClick={() => setShowEdit(!showEdit)}>Edit</button>
          <button className="edit-delete-qac" onClick={handleDelete}>Delete</button>

        </div>
        )}
      </div>
      <div className="edit-and-new-forms">
        {showNewAnswer && (
          <div>
            <NewAnswer questionId={id} setShowNewAnswer={setShowNewAnswer} />
          </div>
        )}
        {showEdit && (
          <div>
            <EditQuestion questionData={questionData}/>
          </div>
        )}
      </div>


      {Answers && Answers.map(answer => {
        return (
          <AnswerBlock key={answer.id} answerData={answer}/>
        )
      })}

    </div>
  )
}

export default QuestionBlock
