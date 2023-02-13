import { useState } from "react"
import { useDispatch } from "react-redux"
import { sendAnswerCreationRequest } from "../../store/answer"
import { loadQuestionFromBackend } from "../../store/question"


const NewAnswer = ({questionId, setShowNewAnswer}) => {
  const [body, setBody] = useState('')
  const [errors, setErrors] = useState([])
  const [serverErrors, setServerErrors] = useState([])

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()

    setErrors([])
    setServerErrors([])
    if (body.length < 1) {
      setErrors(['Answer body cannot be empty'])
      return
    }
    if (body.length > 9999) {
      setErrors(['Answer body cannot be longer than 10000 characters.'])
      return
    }

    const payload = {
      body,
    }

    dispatch(sendAnswerCreationRequest(questionId, payload))
      .then(() => {dispatch(loadQuestionFromBackend(questionId))})
      .then(() => {setShowNewAnswer(false)})
      .catch(async (res) => {
        const data = await res.json()
        if (data && data.errors) {
          const serverErrorsArray = Object.values(data.errors)
          setServerErrors(serverErrorsArray)
        }
      })
  }


  return (
    <div className="edit-answer-form">
      {serverErrors.map((error, index) => <li  className='error-line' key={index}>{error}</li>)}
      {errors.map((error, index) => <li  className='error-line' key={index}>{error}</li>)}
      <form onSubmit={handleSubmit}>
        <textarea
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default NewAnswer
