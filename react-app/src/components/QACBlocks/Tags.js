

const TagBlock = ({ tags }) => {
  return (
    <div className="tag-block">
      Tags: 
      {tags.map((tag, i) => (
        <div key={i} className="tag">
          {tag}
        </div>
      ))}
    </div>
  );
}

export default TagBlock;
