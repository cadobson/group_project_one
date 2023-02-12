import { useState } from "react"
import { useDispatch } from "react-redux"
import { loadQuestionFromBackend, sendTagAdditionRequest, sendTagRemovalRequest } from "../../store/question"


const EditTags = ({tagList, questionId}) => {
  const [newTag, setNewTag] = useState('')
  const [tagToDelete, setTagToDelete] = useState([])
  const [localErrors, setLocalErrors] = useState([])
  const [serverErrors, setServerErrors] = useState([])

  const dispatch = useDispatch()

  const handleSubmitNewTag = (e) => {
    e.preventDefault()

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
  }

  const handleSubmitDeleteTag = (e) => {
    e.preventDefault()
    const newLocalErrors = []
    if (tagToDelete.length === 0) newLocalErrors.push("You can't delete a tag if there isn't any text!")
    if (newLocalErrors.length) {
      setLocalErrors(newLocalErrors)
      return
    }

    dispatch(sendTagRemovalRequest(tagToDelete, questionId))
      //TODO: Handle Errors


  }

  return (
    <div className="edit-tags">
      <div className="add-tag">
      {localErrors.map((error, index) => <li key={index}>{error}</li>)}
        <form onSubmit={handleSubmitNewTag}>
          <input type="text" value={newTag} onChange={(e) => setNewTag(e.target.value)}/>
          <button type="submit" value="Add Tag">New Tag</button>
        </form>
      </div>
      <div className="remove-tag">
      <form onSubmit={handleSubmitDeleteTag}>
          <input type="text" value={tagToDelete} onChange={(e) => setTagToDelete(e.target.value)}/>
          <button type="submit" value="Remove Tag">Remove Tag</button>
        </form>
      </div>
    </div>
  )
}

export default EditTags
