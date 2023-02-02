import "./Questions.css"

const OneQuestion = ({question}) => {
  let {title, body, askers} = question
  let name = askers.first_name + " " + askers.last_name

  return (
    <>
      <div className="card-for-one-question">
        <div className="question-card-user">
          {name}
        </div>
        <div className="question-card-title-holder">
          <h2 className="question-card-title">{title}</h2>
        </div>
        <div className="question-card-body">
          {body}
        </div>
        <div className="tags">
          One day #tags will be right here.
        </div>
      </div>

      <div className="border-bar" />
    </>

  )
}

export default OneQuestion
