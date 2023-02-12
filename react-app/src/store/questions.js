/**
 * Reducer, actions, and thunks for getting all questions for the homepage
 * For individual question get/post/put/delete, see question.js
 */

const SET_QUESTIONS = "questions/SET_QUESTIONS"
const QUESTIONS_USER = 'questions/GET_USERID'

const setQuestions = (questions) => ({
  type: SET_QUESTIONS,
  questions
})

const questionsByUserId = (questions) => ({
  type: QUESTIONS_USER,
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

export const loadQuestionsByTag = (tag) => async dispatch =>{
  const res = await fetch(`/api/questions/tags/${tag}`)
  if(res.ok){
    const questions = await res.json();
    console.log("Questions to be placed into the store: ", questions)
    dispatch(setQuestions(questions))
  }
  return res
}

export const loadQuestionsByUserId = (userId) => async dispatch =>{
  const res = await fetch(`/api/user/${userId}/questions`)
  if(res.ok){
    const questions = await res.json();
    dispatch(questionsByUserId(questions))
  }
}

const questionsReducer = (state = {}, action) => {
  switch (action.type) {
    case (SET_QUESTIONS): {
      const newState = [...action.questions.Questions]
      return newState
    }
    case QUESTIONS_USER:{
      const newState = {...action.questions}
      return newState
    }

    default: {
      return state
    }
  }
}

export default questionsReducer
