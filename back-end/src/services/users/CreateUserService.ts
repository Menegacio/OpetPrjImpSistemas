import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../../errors/AppError';

import User from '../../models/User';

interface Request {
  name: string;
  email: string;
  username: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, username, password }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const checkUserExists = await userRepository.findOne({ where: { email } });

    if (checkUserExists) {
      throw new AppError('Email addres alredy used');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({ name, email, username, password: hashedPassword });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;