import { Link } from "react-router-dom";


const TagBlock = ({ tags }) => {
  return (
    <div className="tag-block">
      Tags:
      {tags.map((tag, i) => (
        <div key={i} className="tag">
          <Link to={`/tags/${tag}`}>
            {tag}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default TagBlock;
