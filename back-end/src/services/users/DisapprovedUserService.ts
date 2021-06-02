import { getRepository } from 'typeorm';

import AppError from '../../errors/AppError';

import User from '../../models/User';

interface IRequest {
  user_id: string;
}

class DisapprovedUserService {
  public async execute({ user_id }: IRequest): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { id: user_id }});

    if (!user) {
      throw new AppError('User does not exist.');
    }

    await userRepository.remove(user);

    return user;
  }
}

export default DisapprovedUserService;
