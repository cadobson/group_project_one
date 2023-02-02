import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadQuestionsFromBackend } from "../../store/questions"
import NewQuestion from "./NewQuestion.js"
import OneQuestion from "./OneQuestion"


const Questions = () => {
  const questionsData = useSelector(state => state.questions)
  const [isLoaded, setIsLoaded] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadQuestionsFromBackend())
    .then(() => {setIsLoaded(true)})
  }, [dispatch])

  const dummy = {
    title: "dummy title",
    body: "dummy body"
  }
  return (
    <div className="all-questions">
      <NewQuestion />
      {isLoaded && (
        <>
          {questionsData.map((question) => {
            return <OneQuestion key={question.id} question={question} />
          })}
        </>
      )}
      {!isLoaded && (
        <p>Loading all questions...</p>
      )}
    </div>
  )
}

export default Questions
