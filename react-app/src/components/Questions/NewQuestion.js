import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { sendQuestionCreationRequest } from "../../store/question"


const NewQuestion = () => {
  const [title, setTitle] = useState("What do you want to ask?")
  const [body, setBody] = useState("")
  const [showBody, setShowBody] = useState(false)
  const [localErrors, setLocalErrors] = useState([])

  const dispatch = useDispatch()
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()

    const newLocalErrors = []
    if (!title.length || !showBody) newLocalErrors.push("You can't ask a question if there isn't any text!")
    if (newLocalErrors.length) {
      setLocalErrors(newLocalErrors)
      return
    }
    const newQuestionData = {title, body}
    dispatch(sendQuestionCreationRequest(newQuestionData))
      .then((data) => {history.push(`/questions/${data.id}`)})
      .catch(async (res) => {//TODO: Implement error storage and display
        console.log("ERRORS:")
        console.log(res)
      })
  }

  const handleFocus = (e) => {
    setTitle("")
    setShowBody(true)
  }

  const bodyForm = (
    <label>
      Optional body:
      <textarea
        value={body}
        onChange={e => setBody(e.target.value)}
      />
    </label>
  )

  return (
    <>
      <div className="card-for-new-question">
        <form onSubmit={handleSubmit}>
          {localErrors.map((error, index) => <li key={index}>{error}</li>)}
          <label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              onFocus={handleFocus}
              />
          </label>
          {showBody && bodyForm}

          <label>
            <input type="submit" value="Post" />
          </label>
        </form>
      </div>
      <div className="border-bar" />
    </>
  )
}

export default NewQuestion
