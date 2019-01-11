import mongoose from 'mongoose'
import config from '../../config/config'
import crypto from 'crypto';

const UserSchema = new mongoose.Schema({
      email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Not a valid Email'],
        required: 'Email is required'
      },
      password_hash:{
        type: String,
        required: 'Password is required'
      },
      password_salt:{
        type: String
      },
      login_type:{
        type: String,
        default: config.LOGIN_TYPE.DEFAULT
      },
      login_id:{
        type: String,
        default: 0
      },
      authId: String,
      verified: {
         type: Boolean,
         default: config.VERIFY.DEFAULT
      },
      updated: Date,
      created:{
         type: Date,
         default: Date.now
      }
})

UserSchema.virtual('password')
          .set(function(password){
               this._passoword = password;
               this.password_salt = this.makeSalt();
               this.password_hash = this.encryptPassword(password);
          })
          .get(function(){
               return this._password;
          })

UserSchema.methods = {
      authenticate: function(password){
           return this.encryptPassword(password) === this.password_hash
      },
      encryptPassword : function(password){
        return crypto.pbkdf2Sync(password, this.password_salt, 1000, 64, `sha512`).toString(`hex`);
      },
      makeSalt : function(){
        return crypto.randomBytes(16).toString('hex');
      }
}


export default mongoose.model('users', UserSchema);
