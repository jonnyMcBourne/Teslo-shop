import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { User } from '../../../models';
import { jwt } from '../../../utils';

type Data =
  | { message: string }
  | { user: { email: string; role: string; name: string }; token: string };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      console.log('POST-VALIDATE-TOKEN');
      return checkJWT(req, res);

    default:
      res.status(400).json({ message: 'Bad Request' });
  }
}

const checkJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { token = '' } = req.cookies;
  let userId = '';
  try {
    userId = await jwt.isValidToken(token);
  } catch (error) {
    return res.status(201).json({ message: 'user not authorized' });
  }
  await db.connect();
  const user = await User.findById(userId).lean();
  await db.disconnect();
  if (!user) {
    return res.status(400).json({ message: 'There is not user with this id' });
  }

  return res.status(200).json({
    token: jwt.signToken(user._id, user.email),
    user: { email: user.email, name: user.name, role: user.role },
  });
};
