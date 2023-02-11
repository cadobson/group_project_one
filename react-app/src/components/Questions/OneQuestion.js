import { Link } from "react-router-dom"
import QuestionBlock from "../QACBlocks/QuestionBlock"
import UserBlock from "../QACBlocks/UserBlock"
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

  const questionStructure = {
    title, body, id,
    Asker: askers,
    Answers: []
  }

  return (
    <>
      <div className="card-for-one-question">
        <div className="question-block">
          <div className="question-block-author">
            <UserBlock userData={questionStructure.Asker}/>
          </div>
          <Link to={`questions/${questionStructure.id}`}>
            <div className="question-block-title">
              <h1>
                {title}
              </h1>
            </div>
            <div className="question-block-body">
              {body}
            </div>
          </Link>
        </div>
      </div>
      <div className="border-bar" />
    </>




  )
}

export default OneQuestion
// <>
    //   <div className="card-for-one-question">
    //     <div className="question-card-user">
    //       {name}
    //     </div>
    //     <div className="question-card-title-holder">
    //       <Link to={`questions/${id}`}>
    //         <h2 className="question-card-title">{title}</h2>
    //       </Link>

    //     </div>
    //     <div className="question-card-body">
    //       {body}
    //     </div>
    //     <div className="tags">
    //       One day #tags will be right here.
    //     </div>
    //   </div>

    //   <div className="border-bar" />
    // </>
