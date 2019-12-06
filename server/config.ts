import path from 'path'
import session from 'express-session'
const MongoStore = require('connect-mongo')(session)

// import .env variables
require('dotenv-safe').load({
  path: path.join(__dirname, '../../.env'),
  sample: path.join(__dirname, '../../.env.example'),
  allowEmptyValues: true
})

const config = {
  email: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  },
  /**
   * Used by winston logger
   * @TODO Wait for it...
   */
  logs: {
    level: process.env.LOG_LEVEL,
  },

  CLOUDINARY_CONFIG: {
    cloud_name: process.env.CLOUDINARY_NAME || 'sample',
    api_key: process.env.CLOUDINARY_KRY || '874837483274837',
    api_secret:
      process.env.CLOUDINARY_SECRET || 'a676b67565c6767a6767d6767f676fe1'
  },
  caching: {
    memory: {
      max: 100,
      ttl: 60
    }
  },
  compression: {
    precompressedAssets: {
      brotli: true,
      gzip: true
    },
    threshold: '1kb'
  },
  hsts: {
    maxAge: '90 days'
  },
  rateLimiter: {
    enabled: true,
    delay: 500,
    headers: false,
    prefix: 'rate-limiter'
  },
  
  appKey: {
    name: process.env.APP_NAME,
    port: process.env.PORT || 4001,
    host: process.env.HOST || 'localhost',
    env: process.env.NODE_ENV || 'production',
    jwtSecret: process.env.JWT_SECRET,
    jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES
  },
  mongo: {
    uri:
      process.env.NODE_ENV === 'test'
        ? process.env.MONGO_URI_TESTS
        : process.env.MONGO_URI,

    options: {
      useCreateIndex: true,
      keepAlive: 1,
      reconnectTries: 3600, // Never stop trying to reconnect
      reconnectInterval: 500, // Reconnect every 500ms
      useFindAndModify: false,
      autoIndex: false, // Don't build indexes
      poolSize: 10, // Maintain up to 10 socket connections
      // If not connected, return errors immediately rather than waiting for reconnect
      bufferMaxEntries: 0,
      connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4 // Use IPv4, skip trying IPv6
    }
  },
  appLog: {
    logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev'
  },

  // url to uploads
  categoriesUploadUrl: '/images/categories',
  productsUploadUrl: '/images/products',
  filesUploadUrl: '',
  themeAssetsUploadUrl: '/assets/images',

  facebook: {
    clientID: process.env.FACEBOOK_ID || 'id',
    clientSecret: process.env.FACEBOOK_SECRET || 'secret',
    callbackURL: (process.env.DOMAIN || '') + '/auth/facebook/callback'
  },

  twitter: {
    clientID: process.env.TWITTER_ID || 'id',
    clientSecret: process.env.TWITTER_SECRET || 'secret',
    callbackURL: (process.env.DOMAIN || '') + '/auth/twitter/callback'
  },

  google: {
    clientID: process.env.GOOGLE_ID || 'id',
    clientSecret: process.env.GOOGLE_SECRET || 'secret',
    callbackURL: (process.env.DOMAIN || '') + '/auth/google/callback'
  },
  googleAnalytics: {
    enabled: false,
    trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID, // Development Property
    options: {
      debug: true
    }
  },
  awsaccess: {
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    accessKeyId: process.env.ACCESS_KEY_ID,
    region: process.env.REGION
  },
  bucket: process.env.BUCKET,
  sms: {
    api_key: process.env.SMS_KEY,
    username: process.env.SMS_USERNAME,
    format: 'json'
  },
  crypto: {
    cipherKey: 'sensitiveKey',
    algorithm: 'aes256',
    saltRounds: 10
  },

  session: {
    // Re-use our existing mongoose connection to mongodb.
    store: new MongoStore({
      url: process.env.MONGO_URI,
      autoReconnect: true
    }),
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
      // eslint-disable-next-line no-unneeded-ternary
      secure: process.env.NODE_ENV === 'production' ? true : false,
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  },
  // Access-Control-Allow-Origin
  frontend_url: `http://localhost:42331`,
  sendVerificationMail: true,
  sendResetPasswordMail: true,
  sendVerificationSms: true,
  MAX_LOGIN_ATTEMPTS: 5,
  LOCK_TIME: 2 * 60 * 60 * 1000,
};

export default config;
