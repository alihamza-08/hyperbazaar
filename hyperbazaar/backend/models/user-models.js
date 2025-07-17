var bcrypt = require('bcryptjs');
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
    username: {
        type : String,
        require : true,
    },
    email : {
        type : String,
        trim:true,
        require : true,
    },
    phone : {
        type: String,
        require : true,
    },
    address : {
        type: String,
        
    },
    photoURL:String,
    password : {
        type : String,
        require : true,
    },
    role: {
        type: String,
        enum: ['admin', 'retailer', 'user'],
        deafult:"user"
    }
});

userSchema.pre('save', async function(next){
     console.log("pre method", this);
     const user = this;
     if(!user.isModified("password"))
     {
        next();
     }
    console.log("save this method")
     try { 
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;
       console.log(user.password);
    }
      catch (error) {
        next(error);
     }
});

userSchema.methods.comparePassword= async function (password) {
    return bcrypt.compare(password,this.password);
}
userSchema.methods.generateToken = async function (){
 try {
    return jwt.sign({
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
    },
    process.env.JWT_SECRET_KEY,
    {
        expiresIn: "5d",
    }

    )
 } catch (error) {
    console.error(error);
 }
}

// define the module or the collection name 
const User = new mongoose.model("User",userSchema );

module.exports =User;