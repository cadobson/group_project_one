import AnswerBlock from "./AnswerBlock"
import UserBlock from "./UserBlock"


const QuestionBlock = ({ questionData }) => {
  const {title, body, Asker, Answers} = questionData

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

      {Answers && Answers.map(answer => {
        return (
          <AnswerBlock key={answer.id} answerData={answer}/>
        )
      })}

    </div>
  )
}

export default QuestionBlock
