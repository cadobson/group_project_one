

const QuestionAtPageTop = ({ questionData }) => {
  const {title, body, Asker, Answers, Comments} = questionData
  const {askerName, askerProfileImg} = Asker

  return (
    <div className="question-top-of-page">
      <div className="question-top-of-page-author">
        {askerName}
      </div>
      <div className="question-top-of-page-title">
        <h1>
          {title}
        </h1>
      </div>
      <div className="question-top-of-page-body">
        {body}
      </div>

    </div>
  )
}

export default QuestionAtPageTop
