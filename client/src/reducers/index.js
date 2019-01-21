import { combineReducers } from 'redux'

const rootReducer = combineReducers({
      jsondata: ()=>{
          return {
            ques_type : null,
            meta: {},
            question: {},
            'question-img':{},
            answer: {
                txt: {},
                feedback: {
                    yes: {
                      'feedback-yes-img':{}
                    },
                    no:{
                      'feedback-no-img':{}
                    }
                }
            },
            guide: {
                'step-img':{}
            }
          }
      }
});

export default rootReducer;
