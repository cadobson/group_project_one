import { Link } from "react-router-dom"
import "./Questions.css"

const OneQuestion = ({question}) => {
  let {title, body, askers, id} = question
  let name
  if (askers) {
    name = askers.first_name + " " + askers.last_name
  }
  else {
    name = "No name provided"
  }

  return (
    <>
      <div className="card-for-one-question">
        <div className="question-card-user">
          {name}
        </div>
        <div className="question-card-title-holder">
          <Link to={`questions/${id}`}>
            <h2 className="question-card-title">{title}</h2>
          </Link>

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
