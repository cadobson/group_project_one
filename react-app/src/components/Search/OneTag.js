import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { loadQuestionsByTag } from "../../store/questions"
import OneQuestion from "../Questions/OneQuestion"


const OneTag = () => {
  const {tagName} = useParams()
  const questionsData = useSelector(state => state.questions)
  const [isLoaded, setIsLoaded] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadQuestionsByTag(tagName))
    .then(() => console.log("questionsData: ", questionsData))
    .then(() => {setIsLoaded(true)})

  }, [dispatch, tagName])

  return (
    <div className="thread-holder">
      <div className="question-top-of-page">
        <h1>Questions with tag: {tagName}</h1>
      </div>
      <div className="border-bar" />
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

export default OneTag
