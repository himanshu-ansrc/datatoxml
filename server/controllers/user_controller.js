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

const dataToXml = (req, res)=>{
            const xmlToSave = crypto.randomBytes(16).toString('hex')+'.xml';
            let questionselementjson = req.body['dataList'];
            let arr = [];
            console.log(questionselementjson);
            for(let x in questionselementjson){
                let questionElemnet = replaceAll(questionselementjson[x], '\n', '<\\n>');//questionselementjson[x].replaceAll("\n", "<br/>")
                arr.push({ name : x, text: questionElemnet })
            }
            const xml = jsontoxml({ record:arr});
            fs.writeFile(`temp/${xmlToSave}`, xml, function (err){
                       if(err) throw err;
                       res.send({url : `/${xmlToSave}`})
            });
}

export default {dataToXml}
