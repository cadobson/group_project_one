import CommentBlock from "./CommentBlock"
import UserBlock from "./UserBlock"


const AnswerBlock = ({answerData}) => {
  const {body, Answerer, Comments} = answerData
  const {answererName, answererProfileImg} = Answerer

  return (
    <div className="answer-block">

      <div className="question-block-author">
        <UserBlock userData={Answerer}/>
      </div>
      <div className="answer-block-body">
        {body}
      </div>

      {Comments.length && Comments.map(comment => {
        return (
          <CommentBlock commentData={comment}/>
        )
      })}

    </div>
    )
}


export default AnswerBlock
