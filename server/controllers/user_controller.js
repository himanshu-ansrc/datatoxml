import crypto from 'crypto'
import fs from 'fs'
import jsontoxml from 'jsontoxml'

const passportMechanism = {
  encryptPassword : (password, salt)=>{
    return crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
  },
  makeSalt: ()=>crypto.randomBytes(16).toString('hex')
}

function escapeRegExp(string){
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function replaceAll(str, term, replacement) {
  return str.replace(new RegExp(escapeRegExp(term), 'g'), replacement);
}

const parentTagsForXML = `<?xml version="1.0" encoding="UTF-8"?>`;
const dataToXml = (req, res)=>{
            const xmlToSave = crypto.randomBytes(16).toString('hex')+'.xml';
            let questionselementjson = req.body['dataList'];
            console.log(questionselementjson);
            let questionType = questionselementjson['ques_type'];
            //ADD META TAGS
            let metaTags = questionselementjson['meta'], arrMeta = [];
            for(let x in metaTags){
                let metaTagElemnet = replaceAll(metaTags[x], '\n', '<\\n>');
                arrMeta.push({
                  name: x, text: metaTagElemnet
                });
            }
            let arr1 = [{name: `${questionType}-meta`, children: arrMeta}];
            //ADD IMAGE TO QUESTION ELEMENTS
            let questionImage = questionselementjson['question-img'], arrQuestionImage = [];
            for(let x in questionImage){
              let questionTagElemnet = replaceAll(questionImage[x], '\n', '<\\n>');
              arrQuestionImage.push({
                name: x, text: questionTagElemnet
              });
            }
            arrQuestionImage = {
                name : 'question-img',
                children: arrQuestionImage
            };
            //ADD QUESTION ELEMENTS
            let questionTags = questionselementjson['question'], arrQuestion = [];
            for(let x in questionTags){
                let questionTagElemnet = replaceAll(questionTags[x], '\n', '<\\n>');
                arrQuestion.push({
                  name: x, text: questionTagElemnet
                });
            }
            arrQuestion.push(arrQuestionImage);
            let arr2 = [{name: `${questionType}-question`, children: arrQuestion}];

            //ADD ANSWER WITH FEEDBACK ELEMENTS
            let answerTags = questionselementjson['answer'], arrAnswer = [];
            let answerTagElemnet = replaceAll(answerTags['txt']['answer'], '\n', '<\\n>');
            arrAnswer.push(answerTagElemnet = {
               name: 'answer',
               text: answerTagElemnet
            });
            for(let x in questionselementjson['answer']['feedback']){
               arrAnswer.push(
                  questionselementjson['answer']['feedback'][x]
               )
            }
            let arr3 = [{name: `${questionType}-answer`, children: arrAnswer}];


            //ADD ANSWER WITH FEEDBACK ELEMENTS
            let guideTags = questionselementjson['guide'], arrGuide = [];
            let guideTagElemnet = replaceAll(guideTags['step-text'], '\n', '<\\n>');
            arrGuide.push(guideTagElemnet = {
               name: 'step-text',
               text: guideTagElemnet
            });
            //for(let x in questionselementjson['guide']['step-img']){
            arrGuide.push(
               {'step-img': guideTags['step-img']}
            )
          //  }
            let arr4 = [{name: `${questionType}-guide`, children: arrGuide}];
            // arrAnswer.push({
            //   name: 'guide', children: [answerTagElemnet, questionselementjson['answer']['feedback']['yes']]
            // });

            // for(let x in questionselementjson['answer']['feedback']){
            //       arrAnswer.push({
            //         name: x, children: [questionselementjson['answer']['feedback'][x]]
            //       });
            // }
            //     // let answerTagElemnet = replaceAll(answerTags[x], '\n', '<\\n>');
            //     // arrAnswer.push({
            //     //   name: x, text: answerTagElemnet
            //     // });
            //     if(x=="yes"){
            //
            //     }else{
            //
            //     }
            //     // if(x.indexOf('yes')!==-1){
            //     //    console.log(x);
            //     // }else{
            //     //
            //     // }
            // }
            //arrAnswer.push(arrAnswerImage);

            // for(let x in questionselementjson){
            //     let questionElemnet = replaceAll(questionselementjson[x], '\n', '<\\n>');//questionselementjson[x].replaceAll("\n", "<br/>")
            //     arr.push({ name : "xs:element", attrs: {
            //                name : x,
            //                type:"xs:string",
            //                minOccurs:"1",
            //                maxOccurs:"unbounded"
            //             }, text: questionElemnet }
            //     )
            // }
            //set question type
            // let xmlSchema = [
            //     {
            //       name : 'xs:complexType',
            //       children: [
            //           {
            //             name: 'xs:sequence',
            //             attr: {
            //                name: 'tf-schame'
            //             },
            //             children: arr
            //           }
            //       ]
            //    }
            // ]
            let xml = jsontoxml([
                {
                  name : `${questionType}-root`,
                  attrs: {
                      'xmlns:xs': 'http://www.w3.org/2001/XMLSchema',
                      elementFormDefault: 'qualified'
                  },
                  children: [arr1, arr2, arr3, arr4]
                }
            ]);
            xml = `${parentTagsForXML}${xml}`;
            fs.writeFile(`temp/${xmlToSave}`, xml, function (err){
                       if(err) throw err;
                       res.send({url : `/${xmlToSave}`})
            });
}

export default {dataToXml}
