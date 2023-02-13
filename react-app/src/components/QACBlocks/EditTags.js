import { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { loadQuestionFromBackend, sendTagAdditionRequest, sendTagRemovalRequest } from "../../store/question"


const EditTags = ({tagList, questionId}) => {
  const [newTag, setNewTag] = useState('')
  const [tagToDelete, setTagToDelete] = useState([])
  const [localErrors, setLocalErrors] = useState([])
  const [serverErrors, setServerErrors] = useState([])

  const dispatch = useDispatch()
  const history = useHistory()

  const handleSubmitNewTag = (e) => {
    e.preventDefault()

    setLocalErrors([])
    setServerErrors([])

    const newLocalErrors = []
    if (newTag.length === 0) newLocalErrors.push("You can't add a tag if there isn't any text!")
    if (newTag.includes(" ")) newLocalErrors.push("Tags can't have spaces!")
    if (newLocalErrors.length) {
      setLocalErrors(newLocalErrors)
      return
    }

    const payload = {
      tagName: newTag
    }

    dispatch(sendTagAdditionRequest(payload, questionId))
    .catch(async (error) => {
      console.log(error)
      setServerErrors([error.message])
    })
  }

  const handleSubmitDeleteTag = (e) => {
    e.preventDefault()

    setLocalErrors([])
    setServerErrors([])

    const newLocalErrors = []
    if (tagToDelete.length === 0) newLocalErrors.push("You can't delete a tag if there isn't any text!")
    if (newLocalErrors.length) {
      setLocalErrors(newLocalErrors)
      return
    }

    dispatch(sendTagRemovalRequest(tagToDelete, questionId))
      .catch(async (error) => {
        console.log(error)
        setServerErrors([error.message])
      })

      //TODO: Handle Errors more gracefully


  }

  return (
    <div className="edit-tags">
      <div className="add-tag">
      {localErrors.map((error, index) => <li  className='error-line' key={index}>{error}</li>)}
      {serverErrors.map((error, index) => <li  className='error-line' key={index}>{error}</li>)}
        <form onSubmit={handleSubmitNewTag}>
          <input type="text" placeholder="Type in your new tag here" value={newTag} onChange={(e) => setNewTag(e.target.value)}/>
          <button type="submit" value="Add Tag">New Tag</button>
        </form>
      </div>
      <div className="remove-tag">
      <form onSubmit={handleSubmitDeleteTag}>
          <input type="text" placeholder="Type in the tag to delete here" value={tagToDelete} onChange={(e) => setTagToDelete(e.target.value)}/>
          <button type="submit" value="Remove Tag">Remove Tag</button>
        </form>
      </div>
    </div>
  )
}

export default EditTags
