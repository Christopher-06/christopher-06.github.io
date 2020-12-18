last_notifications = null

function get_notifications() {
  if (USER_LOGGED_IN == undefined)
   setTimeout(get_notifications, 200);

  if (USER_LOGGED_IN == false)
   return;

  $.ajax({
    url: API_ADRESS + "/check-notifications?identifier=" + getCookie("identifier"),
    data: JSON.stringify({}),
    contentType: "application/json;charset=UTF-8",
    type: "GET",
    success: function (response) {
      if (response.status == "ok") {

        // CHeck if new notification
        if(last_notifications == null | JSON.stringify(last_notifications) != JSON.stringify(response.notifications)){
          if(last_notifications != null){ 
            // When null --> first round (dismiss)
            $.notify({
              icon: "tim-icons icon-bell-55",
              message: "Sie haben eine neue Nachricht!"
          }, {

              autoHideDelay: 2500,
              style: 'bootstrap',
              placement: {
                  from: "bottom",
                  align: "right"
              }
          });
          console.log("NEW");
          }

          console.log(last_notifications);
          // Make notification
          var container = document.createElement("div");
          for (var i = response.notifications.length - 1; i >= 0; i--) {
            var li = document.createElement("li");
            li.classList = "nav-link";

            var a = document.createElement("a");
            a.classList = "nav-item dropdown-item";

            if (response.notifications[i].operation == "transfer") {
              a.innerHTML = "Sie haben $ " + (parseInt(response.notifications[i].amount * 10000)/10000).toString() + " erhalten. Nachricht: <br/>" +
                              response.notifications[i].message;
              a.href = "./profile.html?pub_key=" + response.notifications[i].sender;
            }
            if (response.notifications[i].operation == "account_setting") {
              a.innerHTML = "Ihre Account Einstellungen wurden erfolgreich gespeichert.";
              a.href = "./profile.html";
            }

            li.appendChild(a);
            container.appendChild(li);
          }

        document.getElementById("container_notifications").innerHTML = container.innerHTML;
        last_notifications = Array.from(response.notifications);
      }
      }
      setTimeout(get_notifications, 1500);
    },
    error: function (error) {
      console.log(error);
      setTimeout(get_notifications, 5000);
    },
  });
}

get_notifications();