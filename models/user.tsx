import mongoose from 'mongoose';

const UsersSchema = new mongoose.Schema({
    name:{
        type:String
    }, 
    email : {
        type: String
    },
    password : {
        type: String
    }
  
  }, {collection: 'users'});


  export default mongoose.models.Users || mongoose.model('Users', UsersSchema);