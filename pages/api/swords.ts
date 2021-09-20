// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../lib/mongodb';
import { compare } from 'bcrypt';
import swordsModel from '../../models/swords';
import { sign } from 'jsonwebtoken';
import cookie from 'cookie';
import { BiBody } from 'react-icons/bi';
import { requiredChakraThemeKeys } from '@chakra-ui/theme';

import { CallbackError, ObjectId } from 'mongoose';
const secret = process.env.JWT_SECRET

export default async function swords(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  if (req.method ==='POST') {
    swordsModel.create( 
        req.body, 
        function (err: any, doc) { // callback
            if (err) {
                err.code===11000 ? res.status(409).json({message:'Duplicate Sword'}) : res.status(500).json({message:'Database Error'})
              } else res.status(200).json({message: 'Sword created'});
        });
    }
  else if (req.method === 'PUT') {
    swordsModel.updateOne({_id: req.body.id}, {
       name: req.body.name,
       type: req.body.type,
       quality: req.body.quality,
       material: req.body.material
    }, null, function (err: any, doc) {
        if (err) {
          err.code===11000 ? res.status(409).json({message:'Duplicate Sword'}) : res.status(500).json({message:'Database Error'})
        } else res.status(200).json({message: 'Edited sword with id: ' +req.body.id});
    })

  } else if (req.method === 'DELETE') {
    swordsModel.findByIdAndDelete({_id: req.body.id}, {}, function (err, doc) { // callback
          if (err) {
              res.status(500).json({message:'Database Error'});
          } else {
              res.status(200).json({message: 'Sword Deleted'});
          }
          
          return;
    });
  } else res.status(405).json({message: 'Unsupported request method'})
}
