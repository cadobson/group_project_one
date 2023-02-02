import "./Questions.css"

const OneQuestion = ({question}) => {
  let {title, body} = question

  return (
    <div className="card-for-one-question">
      This is a card for one question. There should be one of these for each question. If there is a title and body, it will show below. Title: {title}; Body: {body}
    </div>
  )
}

export default OneQuestion
