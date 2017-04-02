"use strict";
var AuthInfo = (function () {
    function AuthInfo($uid) {
        this.$uid = $uid;
    }
    AuthInfo.prototype.isLoggedIn = function () {
        return !!this.$uid;
    };
    return AuthInfo;
}());
exports.AuthInfo = AuthInfo;
