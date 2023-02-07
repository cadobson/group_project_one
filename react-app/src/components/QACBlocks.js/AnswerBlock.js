import CommentBlock from "./CommentBlock"


const AnswerBlock = ({answerData}) => {
  const {body, Answerer, Comments} = answerData
  const {answererName, answererProfileImg} = Answerer

  return (
    <div className="answer-block">
      Answer:
      <div className="answer-block-author">
        {answererName}
      </div>
      <div className="answer-block-body">
        Answer:
        {body}
      </div>

      {Comments && Comments.map(answer => {
        return (
          <CommentBlock commentData={Comments}/>
        )
      })}

    </div>
    )
}

export default AnswerBlock
