

const QuestionAtPageTop = ({ questionData }) => {
  const {title, body, Asker, Answers, Comments} = questionData
  const {firstName, lastName, askerProfileImg} = Asker
  const fullName = `${firstName} ${lastName}`

  return (
    <div className="question-top-of-page">
      <div className="question-top-of-page-title">
        {title}
      </div>
      <div className="question-top-of-page-body">
        {body}
      </div>
      <div className="question-top-of-page-author">
        {fullName}
      </div>
    </div>
  )
}

export default QuestionAtPageTop
