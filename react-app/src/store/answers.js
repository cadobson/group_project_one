const SET_ANSWERS = "answers/SET_ANSWERS"

const setAnswers = (answers) => ({
  type: SET_ANSWERS,
  answers
})

export const loadAnswersFromBackend = () => async dispatch => {
  const answersDataRes = await fetch("/api/answers")
  if (answersDataRes.ok) {
    const answersData = await answersDataRes.json()
    dispatch(setAnswers(answersData))
  }
  return answersDataRes
}

const answersReducer = (state = {}, action) => {
  switch (action.type) {
    case (SET_ANSWERS): {
      return action.answers.Answers
    }
    default: {
      return state
    }
  }
}

export default answersReducer
