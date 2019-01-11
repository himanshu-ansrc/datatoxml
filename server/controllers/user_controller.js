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

            let arr = [];
            console.log(questionselementjson);
            for(let x in questionselementjson){
                let questionElemnet = replaceAll(questionselementjson[x], '\n', '<\\n>');//questionselementjson[x].replaceAll("\n", "<br/>")
                arr.push({ name : "", text: questionElemnet })
            }
            let xml = jsontoxml({
                  record : arr
            });
            xml = `${parentTagsForXML}${xml}${closeParentTagsForXML}`;
            fs.writeFile(`temp/${xmlToSave}`, xml, function (err){
                       if(err) throw err;
                       res.send({url : `/${xmlToSave}`})
            });
}

export default {dataToXml}
