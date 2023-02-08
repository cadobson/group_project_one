

const CommentBlock = ({ commentData }) => {
  console.log("commentData",commentData)
  const { body, Commenter } = commentData
  const { first_name,last_name, commenterProfileImg } = Commenter
  const commenterName = first_name+' '+last_name
  return (
    <div className="comment-block">
      <div className="comment-block-author">
        {commenterName}
      </div>
      <div className="comment-block-body">
        Comment:
        {body}
      </div>
    </div>
  )
}

export default CommentBlock
