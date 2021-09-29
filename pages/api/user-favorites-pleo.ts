// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../lib/mongodb';
import swordsModel from '../../models/swords';
import user from '../../models/user-pleo-space';
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

const secret = process.env.JWT_SECRET

export default async function userFavoritesPleo(
  req: NextApiRequest,
  res: NextApiResponse
) {

  await runMiddleware(req, res, cors)
  await dbConnect();

  if (req.method ==='POST') {
    user.create( 
        req.body, 
        function (err: any, doc) { // callback
            if (err) {
                err.code===11000 ? res.status(409).json({message:'Duplicate Sword'}) : res.status(500).json({message:'Database Error'})
              } else res.status(200).json({message: 'Sword created'});
        });
    }
  else if (req.method === 'PUT') {
    user.updateOne({_id: req.body.id}, {
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
    user.findByIdAndDelete({_id: req.body.id}, {}, function (err, doc) { // callback
          if (err) {
              res.status(500).json({message:'Database Error'});
          } else {
              res.status(200).json({message: 'Favorite removed'});
          }
          return;
    });
  } else res.status(405).json({message: 'Unsupported request method'})
}
