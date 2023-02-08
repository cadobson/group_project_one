import AnswerBlock from "./AnswerBlock"


const QuestionBlock = ({ questionData }) => {
  const {title, body, Asker, Answers, Comments} = questionData
  const {askerName, askerProfileImg} = Asker

  return (
    <div className="question-block">
      <div className="question-block-author">
        {askerName}
      </div>
      <div className="question-block-title">
        Question:
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
