import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { loadTagsFromBackend } from "../../store/tags"


const AllTags = () => {
  const allTagData = useSelector(state => state.tags)
  const [isLoaded, setIsLoaded] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadTagsFromBackend())
    .then(() => {setIsLoaded(true)})
  }, [dispatch])

  return (
    <div className="thread-holder">
      <div className="all-tags-holder">
        <h1>All Tags:</h1>
        <div>Click on a tag to see all questions related to that tag.</div>
        {isLoaded && (
          <div className="tag-block">

            {allTagData.Tags.map((tag, index) => {
              return <Link to={`/tags/${tag}`}><div className="tag" key={index}>{tag}</div></Link>
            })}
          </div>
        )}
      </div>
    </div>
  )

}

export default AllTags
