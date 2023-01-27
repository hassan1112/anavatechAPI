module.exports = {

    HOST: "localhost",
    PORT: "3306",
    USER: "root",
    PASSWORD: "",
    DB: "ansice",
    dialect: "mysql",
    jwtExpirySeconds: 3000,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  };
  


  