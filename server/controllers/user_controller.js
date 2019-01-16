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

const parentTagsForXML = `<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" elementFormDefault="qualified">`;

const closeParentTagsForXML = `</xs:schema>`;
const dataToXml = (req, res)=>{
            const xmlToSave = crypto.randomBytes(16).toString('hex')+'.xml';
            let questionselementjson = req.body['dataList'];
            console.log(questionselementjson);
            let questionType = questionselementjson['ques_type'];
            const parentTagsForXML = `<?xml version="1.0" encoding="UTF-8"?>
            <${questionType}-root xmlns:xs="http://www.w3.org/2001/XMLSchema" elementFormDefault="qualified">`;

            //ADD META TAGS
            let metaTags = questionselementjson['meta'], arrMeta = [];
            for(let x in metaTags){
                let metaTagElemnet = replaceAll(metaTags[x], '\n', '<\\n>');
                arrMeta.push({
                  name: x, text: metaTagElemnet
                });
            }
            let arr1 = [{name: `${questionType}-meta`, children: arrMeta}];
            //ADD QUESTION ELEMENTS
            let questionTags = questionselementjson['question'], arrQuestion = [];
            for(let x in questionTags){
                let questionTagElemnet = replaceAll(questionTags[x], '\n', '<\\n>');
                arrQuestion.push({
                  name: x, text: questionTagElemnet
                });
            }
            let arr2 = [{name: `${questionType}-question`, children: arrQuestion}];
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
            let xml = jsontoxml({
                 name : "dsdsdsdsd",
                 children: [arr1, arr2]
            });
            xml = `${parentTagsForXML}${xml}${closeParentTagsForXML}`;
            fs.writeFile(`temp/${xmlToSave}`, xml, function (err){
                       if(err) throw err;
                       res.send({url : `/${xmlToSave}`})
            });
}

export default {dataToXml}
