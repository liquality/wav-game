import NetworkService from "./NetworkService";

const UserService = {
  createUser: async function (userObject, jwt) {
    return NetworkService.postResourceWithAuth("v1/user/", userObject, jwt);
  },

  getGameByUserId: async function (userId, jwt) {
    return NetworkService.getResourceWithAuth("v1/game/" + userId, jwt);
  },
};
export default UserService;
