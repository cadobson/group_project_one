const SET_ANSWERS = "answers/SET_ANSWERS"
const ANSWERS_USER = 'answers/USER'

const setAnswers = (answers) => ({
  type: SET_ANSWERS,
  answers
})

const answersByUserId=(answers) => ({
  type:ANSWERS_USER,
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

export const loadAnswersByUserId = (userId) => async dispatch => {
  const res = await fetch(`/api/user/${userId}/answers`)
  if(res.ok){
    const answers = await res.json();
    dispatch(answersByUserId(answers))
  }
  return res
}

const answersReducer = (state = {}, action) => {
  switch (action.type) {
    case (SET_ANSWERS): {
      return action.answers.Answers
    }
    case (ANSWERS_USER): {
      console.log("Answer being put into the reducer 2: ", action.answers)
      return action.answers
    }
    default: {
      return state
    }
  }
}

export default answersReducer
