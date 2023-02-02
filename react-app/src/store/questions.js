const SET_QUESTIONS = "questions/SET_QUESTIONS"

const setQuestions = (questions) => ({
  type: SET_QUESTIONS,
  questions
})

export const loadQuestionsFromBackend = () => async dispatch => {
  const questionsDataRes = await fetch("/api/questions")
  if (questionsDataRes.ok) {
    const questionsData = await questionsDataRes.json()
    dispatch(setQuestions(questionsData))
  }
  return questionsDataRes
}

const questionsReducer = (state = {}, action) => {
  switch (action.type) {
    case (SET_QUESTIONS): {
      return action.questions
    }
    default: {
      return state
    }
  }
}

export default questionsReducer
