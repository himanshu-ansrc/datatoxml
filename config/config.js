import {Pool} from 'pg';
const config = {
    pool : new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'scapic',
    password: '123456',
    port: 5432,
  }),
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || "YOUR_secret_key",
  DB_URL: process.env.MONGODB_URI || 'mongodb://scarpic:scarpic123@ds129904.mlab.com:29904/scapic',
  LOGIN_TYPE: {
       DEFAULT: 0,
       GOOGLE: 1,
       FACEBOOK: 2
  },
  VERIFY: {
      DEFAULT: false,
      VERIFIED: true
  },
  EMAIL: {
     OWNER : "sunnysavita18@gmail.com"
  }
}

export default config
