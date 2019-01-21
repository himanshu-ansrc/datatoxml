import {AUTH_USERS, AUTH_ERROR, CREATE_USERS, CREATE_RESUME, LOGOUT_USERS, LIST_PRODUCTS, DATA_TO_XML} from './types'
import axios from 'axios'


export const dataToXml = (dataList, callback)=>{
       delete dataList['loadtypeofdata'];
       return async (dispatch)=>{
            try {
              const request = await axios.post('http://localhost:3000/api/data-to-xml',{
                 dataList
              });
              dispatch({
                 type: DATA_TO_XML,
                 payload: request.data
              })
              callback(request.data);
            }catch(e) {

            }
       }
}

// export const signin = ({email, password}, callback)=>{
//     return async (dispatch)=>{
//        try{
//          const request = await axios.post('http://localhost:3000/api/signin', {
//                email: email,
//                password: password
//          });
//          dispatch({
//              type: AUTH_USERS,
//              payload: request.data.data
//          })
//          callback();
//        }catch(error){
//          dispatch({
//              type: AUTH_ERROR,
//              payload: error
//          })
//        }
//     }
// }
//
// export const signup = ({email, password}, callback)=>{
//     return async (dispatch)=>{
//         try{
//           const request = await axios.post('http://localhost:3000/api/users', {
//                 email: email,
//                 password: password
//           });
//           console.log(request);
//           dispatch({
//               type: CREATE_USERS,
//               payload: request.data.data
//           })
//           callback();
//           console.log(request);
//         }catch(error) {
//
//         }
//     }
// }
//
// export const verifyOTP = (email, otp, callback)=>{
//     return async (dispatch)=>{
//        try {
//          const request = await axios.post('http://localhost:3000/api/verify-otp', {email, otp});
//          dispatch({
//              type: AUTH_USERS,
//              payload: request.data.data
//          })
//          callback();
//        }catch(error){
//          dispatch({
//              type: AUTH_ERROR,
//              payload: error
//          })
//        }
//     }
// }
//
// export const list3DObjects = (offset, limit, callback)=>{
//     return async (dispatch)=>{
//        try {
//          const request = await axios(`http://localhost:3000/api/list-products?offset=${offset}&limit=${limit}`);
//          console.log(request.data);
//          dispatch({
//              type: LIST_PRODUCTS,
//              payload: request.data
//          });
//          callback();
//        }catch(error){
//          dispatch({
//              type: AUTH_ERROR,
//              payload: error
//          })
//        }
//     }
// }
//
// export const logoutUser = ()=>{
//    return (dispatch)=>{
//        dispatch({
//          type: LOGOUT_USERS,
//          payload: false
//        });
//    }
// }
//
//
//
// export const createResume = (userData, callback)=>{
//       return async (dispatch)=>{
//           try{
//             // const request = await axios.post(
//             //                             'http://localhost:3000/api/create-resume',
//             //
//             console.log(userData);
//             const request = await axios({
//                method: "post",
//                url: 'http://localhost:3000/api/create-resume',
//                data: userData,
//                config: { headers: {'Content-Type': 'application/json' }}
//             });
//             dispatch({
//                 type: CREATE_RESUME,
//                 payload: request.data
//             })
//             callback();
//           }catch(error){
//             dispatch({
//                 type: CREATE_RESUME,
//                 payload: error
//             })
//           }
//       }
// }

// export function authUsers(){
//    const url = `https://jsonplaceholder.typicode.com/comments`;
//    const response = axios.get(url);
//    return{
//       type: AUTH_USERS,
//       payload: response
//    }
// }
