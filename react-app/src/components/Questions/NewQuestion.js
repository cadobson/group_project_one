import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"


const NewQuestion = () => {
  const [title, setTitle] = useState("What do you want to ask?")
  const [body, setBody] = useState("")
  const [showBody, setShowBody] = useState(false)

  const dispatch = useDispatch()
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()

    alert("You clicked submit.")
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
        New Question
        <form onSubmit={handleSubmit}>
          <label>
            Title:
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
