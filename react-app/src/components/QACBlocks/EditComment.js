import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editComment } from "../../store/comment";

const EditComment = ({commentData}) => {
  const { id, body, Commenter } = commentData;
  const [editedBody, setEditedBody] = useState(body);
  const [serverErrors, setServerErrors] = useState([]);
  const [localErrors, setLocalErrors] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editedBody.length < 1) {
      setLocalErrors(["Comment body cannot be empty"]);
      return;
    }

    const payload = {
      body: editedBody,
    };

    dispatch(editComment(payload, id))
      .then(() => {history.push(`/comments/${id}`)})
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
      {serverErrors.map((error, index) => <li key={index}>{error}</li>)}
      {localErrors.map((error, index) => <li key={index}>{error}</li>)}
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
