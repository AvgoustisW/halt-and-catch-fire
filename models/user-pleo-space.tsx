import mongoose from 'mongoose';

const UsersPleoSpaceSchema = new mongoose.Schema({
    name:{
        type:String
    }, 
    favorites : {
        type: Object, 
        default: {launches: {}, pads: {}}     
    },
    password : {
        type: String
    }
  
  }, {collection: 'usersPleoChallenge', minimize: false});


  export default mongoose.models.usersPleoChallenge || mongoose.model('usersPleoChallenge', UsersPleoSpaceSchema);