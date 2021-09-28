// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/mongodb';
import user from '../../../models/user-pleo-space';
import { hash } from 'bcrypt';
import Cors from 'cors';



function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}


var whitelist = ['http://localhost:3000', 'https://pleo-spc.vercel.app']

const cors = Cors({
  methods: ['POST'],
  origin: whitelist,
  credentials: true,
})


export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {

  await runMiddleware(req, res, cors)
  
  if (req.method === 'POST') {
    
    if(req.body.username.toLowerCase() === 'guest') { 
      res.status(409).json({message: 'You are the guest already - Easter Egg found!'})
    } else  {
        hash(req.body.password, 10, async function(err, hash) {
          await dbConnect();
          try {
            const data = await user.create({
              name: req.body.username,
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
    }
    
  } else res.status(405).json({message: 'Unsupported request method'})
}

