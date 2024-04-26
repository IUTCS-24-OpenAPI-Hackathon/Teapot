import { User, UserRepository } from "../data/entity/user.entity";

const verifyUserCombo = async (
  userData: User,
  userRepository: UserRepository
) => {
  const foundUser = await userRepository.findUserWithId(userData.id);

  return foundUser;
};
