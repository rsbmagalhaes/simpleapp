'use strict';

$(document).ready(()=>{
  var $authInfo = $("#authInfo");
  var $idToken = $("#idTokenPayload");
  var $logoutButton = $("#logout");
  $logoutButton.click(logout);

  $.ajax("/api/userinfo",{
    headers: {
    //  authorization: "Bearer {token}"
    }
  }).done((resp)=>{
    var name = resp.i && resp.i.name ? resp.i.name : "not reported by OIDC provider";
    var email = resp.i && resp.i.email ? resp.i.email : "not reported by OIDC provider";
    var authProvider = "unknown auth provider";
    if (resp.i && resp.i.iss.indexOf("appid")>=0) authProvider = "IBM Cloud App ID";
    if (resp.i && resp.i.iss.indexOf("auth0")>=0) authProvider = "Auth0";
    if (resp.i && resp.i.iss.indexOf("ice.ibmcloud.com")>=0) authProvider = "IBM Cloud Identity";

    var amr = resp.i && resp.i.amr ? resp.i.amr : "unreported auth method";

    var text = "You're authenticated!<br/>";
    text+="Your name is <b>" + name + "</b><br/>"
    text+="Your email is <b>" + email + "</b><br/>";
    text+="You're authenticated with <b>" + authProvider + "</b> via <b>" + amr + "</b>";
    $authInfo.html(text);
    $logoutButton.show();
  }).fail(() =>{
    $authInfo.html("You're not authenticated!");
  });

  function logout(){
    document.location = './appid_logout';
    // var cookies = document.cookie.split(";");
    // for (var i=0;i<cookies.length; i++){
    //   if (cookies[i].indexOf("appid-") >= 0){
    //     var cookieName = cookies[i].split("=")[0];
    //     document.cookie = cookieName + "=";
    //   }
    // }
    // location.reload();
  }
});