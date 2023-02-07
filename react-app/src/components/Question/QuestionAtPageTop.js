

const QuestionAtPageTop = ({ question }) => {
  return (
    <div className="question-top-of-page">
      <div className="question-top-of-page-title">
        {question.title}
      </div>
      <div className="question-top-of-page-body">
        {question.body}
      </div>
      <div className="question-top-of-page-author">
        {question.User.username}
      </div>
    </div>
  )
}

export default QuestionAtPageTop
