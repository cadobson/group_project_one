import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { loadQuestionFromBackend, sendQuestionEditRequest } from "../../store/question"



const EditQuestion = ({questionData}) => {
  const {body, id} = questionData
  const [editedBody, setEditedBody] = useState(body)
  const [localErrors, setLocalErrors] = useState([])
  const [serverErrors, setServerErrors] = useState([])

  const dispatch = useDispatch()
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (editedBody.length < 1) {
      setLocalErrors(["Answer body cannot be empty after creation."]);
      return;
    }
    if (editedBody.length > 9999) {
      setLocalErrors(["Answer body cannot be longer than 10000 characters."]);
      return;
    }

    const payload = {
      body: editedBody,
      title: questionData.title
    };

    dispatch(sendQuestionEditRequest(payload, id))
      .then(() => {dispatch(loadQuestionFromBackend(id))})
      // .catch(async (res) => {
      //   const data = await res.json();
      //   if (data && data.errors) {
      //     const serverErrorsArray = Object.values(data.errors);
      //     setServerErrors(serverErrorsArray)
      //   };
      // });
  }

  return (
    <div className="edit-answer-form">
      {serverErrors.map((error, index) => <li  className='error-line' key={index}>{error}</li>)}
      {localErrors.map((error, index) => <li  className='error-line' key={index}>{error}</li>)}
      <form onSubmit={handleSubmit}>
        <textarea
          type="text"
          value={editedBody}
          onChange={(e) => setEditedBody(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default EditQuestion
