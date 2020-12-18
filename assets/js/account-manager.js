USER_LOGGED_IN = undefined;

function checkLoginState() {
  if (
    (checkCookie("public_key") == true) &
    (checkCookie("identifier") == true)
  ) {
    document.getElementById("acc_drop_down").style = "display: none";
    document.getElementById("acc_drop_down_logged_in").style = "";

    USER_LOGGED_IN = true;

  } else {
    document.getElementById("acc_drop_down").style = "";
    document.getElementById("acc_drop_down_logged_in").style = "display: none";
    
    USER_LOGGED_IN = false;
  }
}

function LogOut() {
  deleteAllCookies();
  window.location.replace("index.html");
}
