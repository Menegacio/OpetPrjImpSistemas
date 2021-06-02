import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../../errors/AppError';

import User from '../../models/User';

interface Request {
  name: string;
  username: string;
  email: string;
  password: string;
  birth_date: string;
  course_id: string;
}

class CreateUserService {
  public async execute({ name, email, username, password, birth_date, course_id }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const checkUserExists = await userRepository.findOne({ where: { email } });

    if (checkUserExists) {
      throw new AppError('Email addres alredy used');
    }

    const CheckUsernameExists = await userRepository.findOne({ where: {username} });

    if (CheckUsernameExists) {
      throw new AppError('Username address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const userDate = new Date(birth_date);

    const user = userRepository.create({
      name,
      email,
      username,
      password: hashedPassword,
      birth_date: userDate,
      course_id,
      approved: false
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;