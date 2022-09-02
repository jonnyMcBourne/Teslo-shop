import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { db } from '../../../database';
import { User } from '../../../models';
import { jwt, validations } from '../../../utils';
type Data =
  | { message: string }
  | { user: { email: string; role: string; name: string }; token: string };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      console.log('POST-LOGIN');
      return registerUser(req, res);

    default:
      res.status(400).json({ message: 'Bad Request' });
  }
}

const registerUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    email = '',
    password = '',
    name = '',
  } = req.body as { email: string; password: string; name: string };
  //validations
  if (password.length < 6) {
    return res.json({ message: 'password must be at leat 6 characters ' });
  }
  if (!name.length) {
    return res.json({ message: "name can't be empty" });
  }
  if(!validations.isValidEmail(email)){
    return res.status(400).json({message: `${ email}  is not a valid email`})
  }
  const newUser = new User({
    email: email.toLocaleLowerCase(),
    password: bcrypt.hashSync(password),
    role: 'client',
    name,
  });
  await db.connect();
  const user = await User.findOne({ email });
  if (user) {
    db.disconnect();
    return res
      .status(400)
      .json({ message: 'User already exists in our database' });
  }
  const token = jwt.signToken(newUser._id,newUser.email);
  try {
    await newUser.save({ validateBeforeSave: true });
    return res.status(201).json({
        token,
        user:newUser
    })
  } catch (error) {
    console.log('Error:-', error);
    res.json({ message: 'check server logs' });
  }
};
