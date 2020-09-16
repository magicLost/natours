const MockUserController = () => {
  return {
    getAll: jest.fn(),
    updateOne: jest.fn(),
    deleteOne: jest.fn(),
    getUserById: jest.fn(),
    getMe: jest.fn(),
    updateMe: jest.fn(),
    deleteMe: jest.fn(),
    createUser: jest.fn(),
    filterObj: jest.fn(),
  };
};

export default MockUserController;
