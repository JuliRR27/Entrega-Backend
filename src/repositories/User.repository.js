class UserRepositoriy {
  constructor(dao) {
    this.dao = dao;
  }

  getUsers = async () => {
    return await this.dao.getUsers();
  };

  getUser = async (id) => {
    return await this.dao.getUser(id);
  };

  getUserByEmail = async (email) => {
    return await this.dao.getUserByEmail(email);
  };

  createUser = async (userData) => {
    return await this.dao.createUser(userData);
  };

  updateUser = async (id, updateData) => {
    return await this.dao.updateUser(id, updateData);
  };

  deleteUser = async (id) => {
    return await this.dao.deleteUser(id);
  };
}

export default UserRepositoriy;
