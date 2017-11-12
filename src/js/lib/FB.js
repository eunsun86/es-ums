(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v2.10&appId=1973069446306076";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

window.IS_LOGGEDIN = false;

window.onlogin = function () {
  FB.getLoginStatus(function (response) {
    if (window.IS_LOGGEDIN) {
      return;
    }

    if (response.status === 'connected') {
      window.IS_LOGGEDIN = true;
      messenger.publish('LOGIN');
      FB.api(
        "/me?fields=picture.width(160).height(160).type(square) ",
        function (response) {
          if (response && !response.error) {
            messenger.publish('PICTURE_FB_GET', response.picture.data.url);
          }
        }
      );
      FB.api(
        "/me",
        function (response) {
          if (response && !response.error) {
            messenger.publish('NAME_FB_GET', response.name);
          }
        }
      );
      FB.api(
        "/me/friends",
        function (response) {
          if (response && !response.error) {
            messenger.publish('FRIENDS_FB_GET', response);
          }
        }
      );
    }
  });

  FB.Event.subscribe('auth.logout', function (response) {
    if (!window.IS_LOGGEDIN) {
      return;
    }

    window.IS_LOGGEDIN = false;
    messenger.publish('LOGOUT');
  });
};

window.fbAsyncInit = window.onlogin;
