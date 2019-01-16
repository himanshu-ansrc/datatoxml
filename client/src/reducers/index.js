import { combineReducers } from 'redux'

const rootReducer = combineReducers({
      jsondata: ()=>{
          return {
            ques_type : null,
            meta: {},
            question: {},
            answer: {},
            guide: {}
          }
      }
});

export default rootReducer;
