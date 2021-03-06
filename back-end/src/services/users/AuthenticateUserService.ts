import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import authConfig from '../../config/auth';

import AppError from '../../errors/AppError';

import User from '../../models/User';

interface Request {
  username: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AutenticateUserService {
  public async execute({ username, password }: Request): Promise<Response>{
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({where: { username }}); 

    if (!user) {
      throw new AppError('Incorrect username/password combination.', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect username/password combination.', 401);
    }

    if (!user.approved) {
      throw new AppError('User does not have approved.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({  }, secret, { subject: user.id, expiresIn });

    return { user, token };

  }
}

export default AutenticateUserService;