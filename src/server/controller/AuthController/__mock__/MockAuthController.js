const MockAuthController = () => {
  return {
    signup: jest.fn(),
    login: jest.fn(),
    logout: jest.fn().mockImplementation((req, res, next) => {
      res.cookie("jwt", req.queue, {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
      });

      res.status(200).json({ status: "SUCCESS" });
    }),
    isLoggedIn: jest.fn(),
    protect: jest.fn(),
    restrictTo: jest.fn().mockImplementation(() => {
      return (req, res, next) => {
        next();
      };
    }),
    forgotPassword: jest.fn(),
    resetPassword: jest.fn(),
    updatePassword: jest.fn(),
    signToken: jest.fn(),
    createAndSendToken: jest.fn(),
  };
};

export default MockAuthController;
