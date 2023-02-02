/**
 * Reducer, actions, and thunks for single questions
 * To get all questions, see questions.js
 */

const SET_QUESTION = "question/SET_QUESTION"

const setQuestion = (question) => ({
  type: SET_QUESTION,
  question
})

export const loadQuestionsFromBackend = (questionId) => async dispatch => {
  const questionDataRes = await fetch(`api/questions/${questionId}`)
  if (questionDataRes.ok) {
    const questionData = await questionDataRes.json();
    dispatch(setQuestion(questionData))
  }
  return questionDataRes
}

export const sendQuestionCreationRequest = (questionToCreate) => async dispatch => {
  const reqObj = {
    method: "POST",
    body: JSON.stringify(questionToCreate)
  }
  const createQuestionRes = await fetch(`/api/questions`)
  if (createQuestionRes.ok) {
    const newQuestionData = await createQuestionRes.json();
    dispatch(setQuestion(newQuestionData))
  }
  return createQuestionRes
}

const questionReducer = (state = {}, action) => {
  switch (action.type) {
    case (SET_QUESTION): {
      return action.question.Question
    }
    default: {
      return state
    }
  }
}

export default questionReducer
