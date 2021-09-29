// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../lib/mongodb';
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
  methods: ['PUT','GET'],
  origin: whitelist,
  credentials: true,
})

export default async function userFavoritesPleo(
  req: NextApiRequest,
  res: NextApiResponse
) {

  await runMiddleware(req, res, cors)

  await dbConnect();

  if (req.method ==='GET') {
    console.log(req.query.username);
   user.findOne({name: req.query.username}, {}, null, function (err: any, doc) {
     console.log(doc.favorites);
        if (err) {
          res.status(500).json({message:'Database Error'})
        } else res.status(200).json({favorites: doc.favorites, message: 'Favorites fetched' });
    })
  }
  else if (req.method === 'PUT') {
    user.updateOne({name: req.body.username}, {
      favorites: req.body.favorites
    }, null, function (err: any, doc) {
        if (err) {
          res.status(500).json({message:'Database Error'})
        } else res.status(200).json({message: 'Favorites updated for' +req.body.username});
    })

  } else res.status(405).json({message: 'Unsupported request method'})
}
