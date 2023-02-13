import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { sendQuestionDeleteRequest } from "../../store/question"
import AnswerBlock from "./AnswerBlock"
import EditQuestion from "./EditQuestion"
import EditTags from "./EditTags"
import NewAnswer from "./NewAnswer"
import TagBlock from "./Tags"
import UserBlock from "./UserBlock"


const QuestionBlock = ({ questionData }) => {
  const {id, title, body, Asker, Answers, Tags} = questionData
  // console.log("Tags: ", Tags)


  const [showNewAnswer, setShowNewAnswer] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showTagEdit, setShowTagEdit] = useState(false)

  const currentSessionUser = useSelector(state => state.session.user) || {id: 0}
  const currentSessionUserId = currentSessionUser.id

  const dispatch = useDispatch()
  const history = useHistory();

  const handleDelete = (e) => {
    e.preventDefault()
    dispatch(sendQuestionDeleteRequest(id))
      .then(() => {history.push("/")})
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
      <div className="question-block-tags">
        {Tags && (
          <TagBlock tags={Tags}/>
        )}
      </div>

      <div className="interactions">
        {currentSessionUser.id > 0 && (
          <div className="new-comment-button-controls">
            <button className="new-comment-button" onClick={() => setShowNewAnswer(!showNewAnswer)}>New Answer</button>

          </div>
        )}


        {currentSessionUserId === Asker.askerId && (
        <div className="answer-block-owner-controls">
          <button className="edit-delete-qac" onClick={() => setShowEdit(!showEdit)}>Edit Body</button>
          <button className="edit-delete-qac" onClick={handleDelete}>Delete</button>
          <button className="edit-delete-qac" onClick={() => setShowTagEdit(!showTagEdit)}>Edit Tags</button>
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
      {showTagEdit && (
        <div>
          <EditTags tagList={Tags} questionId={id} />
        </div>
      )}


      {Answers && Answers.map(answer => {
        return (
          <AnswerBlock key={answer.id} answerData={answer}/>
        )
      })}

    </div>
  )
}

export default QuestionBlock
