import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import answerReducer from './answer';
import answersReducer from './answers';
import commentReducer from './comment';
import commentsReducer from './comments';
import questionReducer from './question';
import questionsReducer from './questions';
import searchReducer from './search';
import session from './session'
import tagsReducer from './tags';

const rootReducer = combineReducers({
  session,
  questions: questionsReducer,
  question: questionReducer,
  answers: answersReducer,
  answer: answerReducer,
  comment: commentReducer,
  comments:commentsReducer,
  search:searchReducer,
  tags :tagsReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
