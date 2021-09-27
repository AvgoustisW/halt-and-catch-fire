import mongoose from 'mongoose';

const UsersPleoSpaceSchema = new mongoose.Schema({
    name:{
        type:String
    }, 
    favorites : {
        type: Object
    },
    password : {
        type: String
    }
  
  }, {collection: 'usersPleoChallenge'});


  export default mongoose.models.usersPleoChallenge || mongoose.model('usersPleoChallenge', UsersPleoSpaceSchema);