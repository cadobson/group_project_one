import AnswerBlock from "./AnswerBlock"
import UserBlock from "./UserBlock"


const QuestionBlock = ({ questionData }) => {
  const {title, body, Asker, Answers, Comments} = questionData
  const {askerName, askerProfileImg} = Asker

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
          <AnswerBlock answerData={answer}/>
        )
      })}

    </div>
  )
}

export default QuestionBlock
