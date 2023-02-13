/**
 * Reducer, actions, and thunks for single questions
 * To get all questions, see questions.js
 */

import { loadQuestionsFromBackend } from "./questions"

const SET_QUESTION = "question/SET_QUESTION"
const DELETE_QUESTION = "question/DELETE_QUESTION"

const setQuestion = (question) => ({
  type: SET_QUESTION,
  question
})

const deleteQuestion = () => ({
  type: DELETE_QUESTION
})

export const loadQuestionFromBackend = (questionId) => async dispatch => {
  const questionDataRes = await fetch(`/api/questions/${questionId}`)
  if (questionDataRes.ok) {
    const questionData = await questionDataRes.json();

    dispatch(setQuestion(questionData))
  }
  console.log(questionDataRes)
  return questionDataRes
}

export const sendQuestionCreationRequest = (questionToCreate) => async dispatch => {
  const reqObj = {
    method: "POST",
    body: JSON.stringify(questionToCreate)
  }
  const createQuestionRes = await fetch(`/api/questions/`, reqObj)
  if (createQuestionRes.ok) {
    const newQuestionData = await createQuestionRes.json();
    dispatch(setQuestion(newQuestionData))
    return newQuestionData
  }
  return createQuestionRes
}

export const sendQuestionEditRequest = (questionToEdit, questionId) => async dispatch => {
  const reqObj = {
    method: "PUT",
    body: JSON.stringify(questionToEdit),
    headers: {
      "Content-Type": "application/json"
    }
  }
  const editQuestionRes = await fetch(`/api/questions/${questionId}`, reqObj)
  if (editQuestionRes.ok) {
    const updatedQuestionData = await editQuestionRes.json();
    dispatch(setQuestion(updatedQuestionData))
  }
  return editQuestionRes
}

export const sendQuestionDeleteRequest = (questionId) => async dispatch => {
  const reqObj = {
    method: "DELETE"
  }
  const deleteQuestionRes = await fetch(`/api/questions/${questionId}`, reqObj)
  if (deleteQuestionRes.ok) {
    // dispatch(deleteQuestion())
    // dispatch(loadQuestionsFromBackend)
  }
  return deleteQuestionRes
}

export const sendTagAdditionRequest = (tagToAdd, questionId) => async dispatch => {
  const reqObj = {
    method: "POST",
    body: JSON.stringify(tagToAdd),
    headers: {
      "Content-Type": "application/json"
    }
  }
  const addTagRes = await fetch(`/api/questions/${questionId}/tags`, reqObj)
  if (addTagRes.ok) {
    // const updatedQuestionData = await addTagRes.json();
    // dispatch(setQuestion(updatedQuestionData))
    // Now that we know the tag creation went through, we can update request a the udpatd question data from the backend
    dispatch(loadQuestionFromBackend(questionId))
  } else {
    throw new Error("You may not create a duplicate tag");
  }
  return addTagRes
}

export const sendTagRemovalRequest = (tagToRemove, questionId) => async dispatch => {
  const reqObj = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  }

  const removeTagRes = await fetch(`/api/questions/${questionId}/${tagToRemove}`, reqObj)
  if (removeTagRes.ok) {
    dispatch(loadQuestionFromBackend(questionId))
  } else {
    throw new Error("No such tag was found");
  }
  // console.log("response object: ", removeTagRes)
  return removeTagRes
}

const questionReducer = (state = {}, action) => {
  switch (action.type) {
    case (SET_QUESTION): {
      return {...action.question}
    }
    case (DELETE_QUESTION): {
      return {}
    }
    default: {
      return state
    }
  }
}

export default questionReducer
