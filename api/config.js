module.exports = {

    database: {
        user: 'user',
        password: 'passwortDBas',
        connectString: 'localhost:3306/cleaningplandb',
        databaseName: 'cleaningplandb'
    },
    jwtSecretKey: "jmvhDdDBMvqb=M@6h&QVA7x",
    signOptions: {
        expiresIn:  60*60*60
       }

};