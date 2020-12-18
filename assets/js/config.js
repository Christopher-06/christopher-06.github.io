NODE_ADRESS = "http://192.168.178.20:8000";
API_ADRESS = "http://192.168.178.20:4999";

// Load navbar
$.get("./assets/templates/navbar.html", function (data) {
  $("#nav-placeholder").replaceWith(data);

  checkLoginState();
});

// Load sidebar
$.get("./assets/templates/sidebar.html", function (data) {
  $("#sidebar-placeholder").replaceWith(data);

  var path = window.location.pathname;
  if (path.indexOf("profile.html") > -1)
    $("#sidebar-profile-li").addClass("active");
  if (path.indexOf("send.html") > -1) $("#sidebar-send-li").addClass("active");
  if (path.indexOf("friends.html") > -1)
    $("#sidebar-friends-li").addClass("active");
});

// Load footer
$.get("./assets/templates/footer.html", function (data) {
  $("#footer-placeholder").replaceWith(data);

  $("#year-placeholder").replaceWith(new Date().getFullYear())
});
