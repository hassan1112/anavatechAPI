module.exports = (sequelize, Sequelize) => {
    const SystemUser = sequelize.define('SystemUser', {
        systemUserId: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull:false
        },
        password: {
            type: Sequelize.STRING,
            minlength: 8,
            trim: true,
            required: [true, "Password is required"],
        },
        email: {
            type: Sequelize.STRING,
               
        },
         
         
        
        isActive: {
            type: Sequelize.BOOLEAN
        },
        
         
        //  accessToken :{
            
        //         type: Sequelize.BOOLEAN
        //     },

            // createdBy : {
            //     type: Sequelize.STRING

            // }
         
        // userPosition: {
        //     type: Sequelize.STRING,
        //     required: [true, "user position is required"],

        // },
    });
    return SystemUser;
    };
    
    
    
    