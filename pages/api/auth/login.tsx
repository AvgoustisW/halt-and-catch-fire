// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/mongodb';
import { compare } from 'bcrypt';
import userModel from '../../../models/user';
import { sign } from 'jsonwebtoken';
import cookie from 'cookie';

const secret = process.env.JWT_SECRET

export default async function login(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === 'POST') {
    await dbConnect();
    const user  = await userModel.findOne({name: new RegExp('^'+req.body.name+'$', "i")});
    if(!user) {
      res.status(401).json({message: 'Incorrect Credentials'});
      return; 
    }

    compare(req.body.password, user.password, function(err, result) {
      if(!err && result) {
        const c = {sub: user._id, name: user.name};
        const jwt = sign(c, secret, {expiresIn: '1h'})
        res.setHeader("Set-Cookie", cookie.serialize("authToken", jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60*60*1000,
          expires: new Date().setHours( new Date().getTime() + 60*60*1000),
          path: '/',

        })),
        res.status(200).json({message: 'Logged in Successfully'}); 
      } else res.status(401).json({message: 'Incorrect Credentials'});
     
    });

    
    } else res.status(405).json({message: 'Unsupported request method'})
}
