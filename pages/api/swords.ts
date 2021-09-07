// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../lib/mongodb';
import { compare } from 'bcrypt';
import swordsModel from '../../models/swords';
import { sign } from 'jsonwebtoken';
import cookie from 'cookie';
import { BiBody } from 'react-icons/bi';
import { requiredChakraThemeKeys } from '@chakra-ui/theme';

const secret = process.env.JWT_SECRET

export default async function swords(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method ==='POST') {
    swordsModel.findOneAndUpdate({
        name: req.body.name}, 
        req.body, 
        {upsert: true, new: true, runValidators: true},
        function (err, doc) { // callback
            if (err) {
                console.log(err);
                res.status(500).json({message:'Database Errorzzz'});
            } else {
                console.log('Sword Created');
                res.status(200).json({message: 'Sword created'});
            }
        });
    }
  else if (req.method === 'PUT') {
    
    const sword  = await swordsModel.updateOne({_id: req.body.id}, {
        type: 'shortsword'
    });
    
    if(!sword) {
      res.status(500).json({message: 'Database Error'});
      return; 
    }

    res.status(200).json({message: 'Edited the ' +req.body.id}); 

    
    } else if (req.method === 'DELETE') {

        res.status(200).json({message: 'Deleted the ' +req.body.id});


    } else res.status(405).json({message: 'Unsupported request method'})
}
