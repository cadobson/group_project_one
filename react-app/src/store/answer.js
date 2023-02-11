import { loadAnswersFromBackend } from "./answers"

const SET_ANSWER = "answer/SET_ANSWER"
const DELETE_ANSWER = "answer/DELETE_ANSWER"

const setAnswer = (answer) => ({
  type: SET_ANSWER,
  answer
})

const deleteAnswer = (answer) => ({
  type: DELETE_ANSWER
})

export const loadAnswerFromBackend = (answerId) => async dispatch => {
  const answerDataRes = await fetch(`/api/answers/${answerId}`)
  if (answerDataRes.ok) {
    const answerData = await answerDataRes.json();

    dispatch(setAnswer(answerData))
  }
  return answerDataRes
}

export const sendAnswerCreationRequest = (questionId, answerToCreate) => async dispatch => {
  const reqObj = {
    method: "POST",
    body: JSON.stringify(answerToCreate)
  }
  reqObj.headers = { "Content-Type": "application/json" };
  const createAnswerRes = await fetch(`/api/questions/${questionId}`, reqObj)
  if (createAnswerRes.ok) {
    const newAnswerData = await createAnswerRes.json();
    dispatch(setAnswer(newAnswerData))
  }
  return createAnswerRes
}

export const sendAnswerEditRequest = (answerToEdit, answerId) => async dispatch => {
  const reqObj = {
    method: "PUT",
    body: JSON.stringify(answerToEdit)
  }
  reqObj.headers = { "Content-Type": "application/json" };
  const editAnswerRes = await fetch(`/api/answers/${answerId}`, reqObj)
  if (editAnswerRes.ok) {
    const updatedAnswerData = await editAnswerRes.json();
    dispatch(setAnswer(updatedAnswerData))
  }
  return editAnswerRes
}

export const sendAnswerDeleteRequest = (answerId) => async dispatch => {
  const reqObj = {
    method: "DELETE"
  }
  const deleteAnswerRes = await fetch(`/api/answers/${answerId}`, reqObj)
  if (deleteAnswerRes.ok) {
    dispatch(deleteAnswer())
    dispatch(loadAnswersFromBackend)
  }
  return deleteAnswerRes
}

const answerReducer = (state = {}, action) => {
  switch (action.type) {
    case (SET_ANSWER): {
      return {...action.answer}
    }
    case (DELETE_ANSWER): {
      return {}
    }
    default: {
      return state
    }
  }
}

export default answerReducer
