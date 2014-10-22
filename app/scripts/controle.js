var Controle = (function () {
    return {
        Login: (function () {
            return {
                logout: function () {
                    var revokeUrl = 'https://accounts.google.com/o/oauth2/revoke?token=' + localStorage['userToken'];
                    $.ajax({
                        type: 'GET',
                        url: revokeUrl,
                        async: false,
                        contentType: "application/json",
                        dataType: 'jsonp',
                        success: function (nullResponse) {
                            location.href = "login.html";
                            delete localStorage.userToken;
                        },
                        error: function (e) {
                            location.href = "login.html";
                            delete localStorage.userToken;
                        }
                    });
                }
            }
        })()
    }
})();