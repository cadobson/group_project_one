import CommentBlock from "./CommentBlock"


const AnswerBlock = ({answerData}) => {
  const {body, Answerer, Comments} = answerData
  const {answererName, answererProfileImg} = Answerer

  return (
    <div className="answer-block">
      
      <div className="answer-block-author">
        {answererName}
      </div>
      <div className="answer-block-body">
        Answer:
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
