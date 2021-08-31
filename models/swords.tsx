import mongoose from 'mongoose';

const SwordsSchema = new mongoose.Schema({
    name:{
        type:String
    }, 
    material : {
        type: String
    },
    type : {
        type: String
    },
    quality : {
        type: String
    }
  
  }, {collection: 'swords'});


  export default mongoose.models.Swords || mongoose.model('Swords', SwordsSchema);