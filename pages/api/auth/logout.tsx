// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/mongodb';
import { compare } from 'bcrypt';
import userModel from '../../../models/user';
import { sign } from 'jsonwebtoken';
import cookie from 'cookie';

const secret = process.env.JWT_SECRET

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.method === 'POST') {
        res.setHeader("Set-Cookie", cookie.serialize("authToken", "", {
            httpOnly: true,
            expires: new Date(0),
            secure: process.env.NODE_ENV !== "development",
            sameSite: 'strict',
            path: '/',
        })),
        res.status(200).json({message: "logged out"});   
    } else res.status(405).json({message: 'Unsupported request method'})
}
