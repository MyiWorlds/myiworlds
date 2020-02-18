import getUserById from '../queries/getUserById/getCircleById';

const isSystemAdmin = async (userId: string | null) => {
  if (!userId) {
    return false;
  }

  const user = await getUserById(userId);

  if (user && user.isSystemAdmin) {
    return true;
  }

  return false;
};

export default isSystemAdmin;
