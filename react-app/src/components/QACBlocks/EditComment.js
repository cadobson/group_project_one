import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editComment } from "../../store/comment";
import { loadQuestionFromBackend } from "../../store/question";

const EditComment = ({commentData}) => {
  const { id, body } = commentData;
  const [editedBody, setEditedBody] = useState(body);
  const [serverErrors, setServerErrors] = useState([]);
  const [localErrors, setLocalErrors] = useState([]);

  const dispatch = useDispatch();
  const questionId = useParams()

  const handleSubmit = (e) => {
    e.preventDefault();

    setLocalErrors([]);
    setServerErrors([]);
    if (editedBody.length < 1) {
      setLocalErrors(["Comment body cannot be empty"]);
      return;
    }
    if (editedBody.length > 9999) {
      setLocalErrors(["Comment body cannot be longer than 10000 characters."]);
      return;
    }

    const payload = {
      body: editedBody,
    };

    dispatch(editComment(payload, id))
    .then(() => {dispatch(loadQuestionFromBackend(questionId.id))})
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          const serverErrorsArray = Object.values(data.errors);
          setServerErrors(serverErrorsArray)
        };
      }
    );
  }

  return (
    <div className="edit-comment-form">
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

export default EditComment;
