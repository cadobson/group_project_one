import OneQuestion from "./OneQuestion"


const Questions = () => {

  const dummy = {
    title: "dummy title",
    body: "dummy body"
  }
  return (
    <div className="all-questions">
      <OneQuestion question={dummy} />
    </div>
  )
}

export default Questions
