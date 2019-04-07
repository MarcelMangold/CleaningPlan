
require('dotenv').config();//instatiate environment variables

let CONFIG = {} //Make this global to use all over the application

CONFIG.app          = process.env.APP   || 'dev';
CONFIG.port         = process.env.PORT  || '3000';

CONFIG.db_dialect   = process.env.DB_DIALECT    || 'mysql';
CONFIG.db_user      = process.env.DB_USER;
CONFIG.db_password  = process.env.DB_PASSWORD;
CONFIG.db_name      =  process.env.DB_NAME;
CONFIG.CONNECTION_STRING = 'localhost:3306/cleaningplandb'


CONFIG.jwt_encryption  = process.env.JWT_ENCRYPTION || 'jwt_please_change';
CONFIG.jwt_expiration  = process.env.JWT_EXPIRATION || '10000';

CONFIG.signOptions = { expiresIn:  60*60*60 }

module.exports = CONFIG;