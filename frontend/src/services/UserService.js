import NetworkService from "./NetworkService";

const UserService = {
  createUser: async function (userObject, jwt) {
    return NetworkService.postResourceWithAuth("/v1/user/", userObject, jwt);
  },

  getUserByUserId: async function (userId, jwt) {
    return NetworkService.getResourceWithAuth("v1/user/" + userId, jwt);
  },

  getGameByUserId: async function (userId, jwt) {
    return NetworkService.getResourceWithAuth("/v1/game/" + userId, jwt);
  },

  createGame: async function (gameObject, jwt) {
    return NetworkService.postResourceWithAuth("/v1/game/", gameObject, jwt);
  },
};
export default UserService;
