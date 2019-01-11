import mongoose from 'mongoose';

const Resume = new mongoose.Schema({
      personal_details:{
          name : String,
          email: String,
          phone: String,
          websites: [{type: String}],
          address: String,
          city: String,
          state: String
      },
      projects: [
        {
           name: String,
           role: String,
           websites:[{type: String}],
           start_date: Date,
           end_date: Date,
           summary: String
        }
      ],
      educational_details:[
        {
           type: String,
           institute: String,
           current: {type: Boolean, default: false},
           location : {
               state: String,
               city: String
           },
           period: {
              from : Date,
              to: Date
           },
           brief_description:{
              type: String
           },
           marks: Number
        }
      ],
      employment_history:[
        {
          title: String,
          company_name: String,
          location : {
              state: String,
              city: String
          },
          period: {
             from : Date,
             to: Date
          },
          salary: {
             amount: String,
             type :String
          },
          brief_description:{
             type: String
          }
        }
      ],
      professional_skills:[
        {
          name : String,
          period: {
             from : Date,
             to: Date
          },
          level: String
        }
      ],
      professional_summary:{
         type: String
      },
      languages: [
        {
           name: String,
           level: String
        }
      ],
      references:[
        {
          name: String,
          company: String,
          email: String,
          designation: String
        }
      ],
      additional_information:{
         type: String
      },
      updated: Date,
      created:{
         type: Date,
         default: Date.now
      },
      comments: String
});

export default mongoose.model('resume', Resume);
