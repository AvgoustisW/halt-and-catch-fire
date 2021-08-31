// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/mongodb';
import mongoose from 'mongoose';
import user from '../../../models/user';
import { hash } from 'bcrypt';

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method === 'POST') {
    hash(req.body.password, 10, async function(err, hash) {
      await dbConnect();
      const data = await user.create({
        name: req.body.name,
        email: req.body.email,
        password: hash
      })
      res.status(200).json({message: 'User created successfully'});
    });  
  } else res.status(405).json({message: 'Unsupported request method'})
}

