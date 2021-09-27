// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/mongodb';
import mongoose from 'mongoose';
import user from '../../../models/user-pleo-space';
import { hash } from 'bcrypt';

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method === 'POST') {
    hash(req.body.password, 10, async function(err, hash) {
      await dbConnect();
      try {
        const data = await user.create({
          name: req.body.name,
          favorites: JSON.parse(req.body.favorites),
          password: hash
        })
        res.status(200).json({message: 'User created successfully'});
      } catch(error:any) {
          if(error.code === 11000){
            res.status(409).json({message: 'User already exists'});
          } else {
            res.status(500).json({message: 'Something went wrong with the service'});
          }
      } 
      
    });  
  } else res.status(405).json({message: 'Unsupported request method'})
}

