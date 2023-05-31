const serverAddress =
  "http://localhost:3005/" ||
  "https://hosted-backend.onrender.com/" ||
  "https://www.hosteddomain.xyz/";
if (process.env.REACT_APP_API_URL) {
  serverAddress = process.env.REACT_APP_API_URL;
}

const NetworkService = {
  getResource: function (url) {
    var promise = new Promise((resolve, reject) => {
      let request = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      fetch(serverAddress + url, request)
        .then((response) => {
          return NetworkService.handleJsonResponse(response);
        })
        .then((responseJson) => {
          resolve(responseJson);
        })
        .catch((error) => {
          reject(error);
        });
    });
    return promise;
  },
  getResourceWithAuth: function (url, jwt) {
    var promise = new Promise((resolve, reject) => {
      let request = {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + jwt,
          "Content-Type": "application/json",
        },
      };

      fetch(serverAddress + url, request)
        .then((response) => {
          return NetworkService.handleJsonResponse(response);
        })
        .then((responseJson) => {
          resolve(responseJson);
        })
        .catch((error) => {
          reject(error);
        });
    });
    return promise;
  },
  putResourceWithAuth: function (url, data, jwt) {
    var promise = new Promise((resolve, reject) => {
      var headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      if (jwt) {
        headers["Authorization"] = "Bearer " + jwt;
      }

      let request = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(data),
      };

      fetch(serverAddress + url, request)
        .then((response) => {
          return NetworkService.handleJsonResponse(response);
        })
        .then((responseJson) => {
          resolve(responseJson);
        })
        .catch((error) => {
          reject(error);
        });
    });
    return promise;
  },

  postResourceWithAuth: function (url, data, jwt) {
    var promise = new Promise((resolve, reject) => {
      var headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      if (jwt) {
        headers["Authorization"] = "Bearer " + jwt;
      }

      let request = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      };

      fetch(serverAddress + url, request)
        .then((response) => {
          return NetworkService.handleJsonResponse(response);
        })
        .then((responseJson) => {
          resolve(responseJson);
        })
        .catch((error) => {
          reject(error);
        });
    });
    return promise;
  },

  handleJsonResponse: function (response) {
    var promise = new Promise((resolve, reject) => {
      response
        .json()
        .then((responseJson) => {
          if (response.ok) {
            resolve(responseJson);
          } else {
            reject(responseJson);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
    return promise;
  },
  handleEmptyResponse: function (response) {
    var promise = new Promise((resolve, reject) => {
      if (response.ok) {
        resolve({});
      } else {
        reject({});
      }
    });
    return promise;
  },
  deleteResourceWithAuth: function (url, jwt) {
    var promise = new Promise((resolve, reject) => {
      var headers = {
        Accept: "application/json",
        Authorization: "Bearer " + jwt,
        "Content-Type": "application/json",
      };

      if (jwt) {
        headers["Authorization"] = "Bearer " + jwt;
      }
      let request = {
        method: "DELETE",
        headers: headers,
        // body: JSON.stringify(data)
      };

      fetch(serverAddress + url, request)
        .then((response) => {
          return NetworkService.handleJsonResponse(response);
        })
        .then((responseJson) => {
          resolve(responseJson);
        })
        .catch((error) => {
          reject(error);
        });
    });
    return promise;
  },
  deleteArrayResourceWithAuth: function (url, data, session) {
    var promise = new Promise((resolve, reject) => {
      var headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      if (session) {
        headers["x-session"] = session.guid;
      }
      let request = {
        method: "DELETE",
        headers: headers,
        body: JSON.stringify(data),
      };
      fetch(serverAddress + url, request)
        .then((response) => {
          return NetworkService.handleJsonResponse(response);
        })
        .then((responseJson) => {
          resolve(responseJson);
        })
        .catch((error) => {
          reject(error);
        });
    });
    return promise;
  },
};

export default NetworkService;
