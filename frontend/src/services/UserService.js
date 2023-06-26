import NetworkService from "./NetworkService";

const UserService = {
  createUser: async function (userObject, jwt) {
    return NetworkService.postResourceWithAuth("/v1/user/", userObject, jwt);
  },

  getUserByUserId: async function (userId, jwt) {
    return NetworkService.getResourceWithAuth("/v1/user/" + userId, jwt);
  },

  getGameByUserId: async function (userId, artist_number_id, jwt) {
    let url = `/v1/games/${userId}`;
    if (artist_number_id) {
      url = `${url}/${artist_number_id}`
    }
    return NetworkService.getResourceWithAuth(
      url,
      jwt
    );
  },

  createGame: async function (gameObject, jwt) {
    return NetworkService.postResourceWithAuth("/v1/game/", gameObject, jwt);
  },

  updateGame: async function (gameObject, jwt) {
    return NetworkService.putResourceWithAuth("/v1/game/", gameObject, jwt);
  },

  getLeaderboardData: async function (gameID, jwt) {
    return NetworkService.getResourceWithAuth(
      "/v1/game/leaderboard/" + gameID,
      jwt
    );
  },

  getLevelSettings: async function (jwt) {
    const settings = await NetworkService.getResourceWithAuth(
      "/v1/level-settings",
      jwt
    );
    return (settings || []).reduce((accum, curr) => {
      accum[curr.level] = curr;
      return accum;
    }, {});
  },

  loginUser: async function (userEmail) {
    return NetworkService.getResourceWithAuth("/v1/user/login/" + userEmail);
  },
};
export default UserService;
