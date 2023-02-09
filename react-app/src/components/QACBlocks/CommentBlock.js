import UserBlock from "./UserBlock"


const CommentBlock = ({ commentData }) => {
  console.log("commentData",commentData)
  const { body, Commenter } = commentData
  const { first_name,last_name, commenterProfileImg } = Commenter
  const commenterName = first_name+' '+last_name
  return (
    <div className="comment-block">
      <div className="question-block-author">
        <UserBlock userData={Commenter}/>
      </div>
      <div className="comment-block-body">
        {body}
      </div>
    </div>
  )
}

export default CommentBlock
