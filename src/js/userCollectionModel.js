var userCollectionModel = (function () {
  var userIDCount = 0;
  var userCollection = [];

  return {
    selectedUser: null,
    isBose: function () {
      for (var i = 0; i < userCollection.length; i++) {
        if(userCollection[i].type === 4) {
          return 1;
        }
      }
    },
    createUser: function (userData) {
      var user = {
        id: userIDCount
      };

      userCollection[user.id] = user;
      this.updateUser(user.id, userData);
      userIDCount++;

      return userCollection[user.id];
    },
    getUser: function (userID) {
      return userCollection[userID];
    },
    updateUser: function (userID, newUserData) {
      var targetUser = userCollection[userID];

      for (var prop in newUserData) { 
        if (newUserData.hasOwnProperty(prop)) {
          targetUser[prop] = newUserData[prop];
        } 
      }
    }
  };
})();

window.userCollectionModel = userCollectionModel;
