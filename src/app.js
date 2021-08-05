import "./stylesheets/style.scss";

var app = (function () {
   var s;
   var app = {
      settings: {
         header: document.querySelector(".header"),
         navTab: document.querySelector(".header__nav"),
         scrollDown: document.getElementById("scrollDown"),
         contentTop: document.querySelector(".content"),
         navLine: document.querySelector(".navigation-line"),
         triggerMenu: document.getElementById("triggerMenu"),
         projectItems: document.querySelectorAll(".content__overlay"),
         year: document.getElementById("year"),
         mobileBreakPoint: 768,
      },

      init: function () {
         s = this.settings;
         s.year.innerHTML = new Date().getFullYear();
         this.bindUIActions();
      },

      closeProjectDetails: function () {
         document
            .querySelector(".project-details")
            .classList.remove("is-active");
         document.querySelector(".overlay").classList.remove("is-active");
         document
            .querySelector(".content__overlay.is-active")
            .classList.remove("is-active");
      },

      sendEmailByAJAX: function () {
         const xhttp = new XMLHttpRequest();
         xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
               document.getElementById("emailMessage").innerHTML =
                  this.responseText;
            }
         };
         xhttp.open("POST", "/send", true);
         xhttp.send();
      },

      validateContactForm: function () {
         let inputName = document.querySelector(".input-name"),
            inputEmail = document.querySelector(".input-email"),
            inputMessage = document.querySelector(".input-message"),
            validName = false,
            validEmail = false,
            validMessage = false;

         inputName.addEventListener("change", function (e) {
            if (e.keyCode !== 9 && e.keyCode !== 16) {
               validName = app.validInput(app.validName, inputName);
               app.handleSubmitButtonAccess(
                  validName,
                  validEmail,
                  validMessage
               );
            }
         });

         inputEmail.addEventListener("change", function (e) {
            if (e.keyCode !== 9 && e.keyCode !== 16) {
               validEmail = app.validInput(app.validEmail, inputEmail);
               app.handleSubmitButtonAccess(
                  validName,
                  validEmail,
                  validMessage
               );
            }
         });

         inputMessage.addEventListener("input", function (e) {
            if (e.keyCode !== 9 && e.keyCode !== 16) {
               validMessage = app.validMessage(inputMessage);
               app.handleSubmitButtonAccess(
                  validName,
                  validEmail,
                  validMessage
               );
            }
         });
      },

      handleSubmitButtonAccess: function (validName, validEmail, validMessage) {
         if (validName && validEmail && validMessage) {
            document.getElementById("submitButton").removeAttribute("disabled");
         } else {
            document
               .getElementById("submitButton")
               .setAttribute("disabled", "disabled");
         }
      },

      validInput: function (valid, input) {
         if (!valid(input.value)) {
            //this.displayErrorMark(input);
            return false;
         } else {
            //this.displaySuccessMark(input);
         }
         return true;
      },

      validName: function (name) {
         return name !== "";
      },

      validEmail: function (email) {
         return /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(
            email
         );
      },

      validMessage: function (message) {
         if (
            message.value !== "" &&
            message.value.length >= 10 &&
            message.value.length <= 400
         ) {
            //message.removeClass('error').addClass('success');
            //message.next('.contact-form__error').addClass('hide');
            return true;
         } else {
            //message.removeClass('success').addClass('error');
            //message.next('.contact-form__error').removeClass('hide');
         }
         return false;
      },

      bindUIActions: function () {
         window.addEventListener("DOMContentLoaded", function () {
            document.body.classList.remove("preload");
         });

         window.addEventListener("scroll", function (e) {
            let height =
               document.documentElement.scrollHeight -
               document.documentElement.clientHeight;
            let winScroll =
               document.body.scrollTop || document.documentElement.scrollTop;
            s.navLine.style.width = (winScroll / height) * 100 + "%";

            if (
               this.window.scrollY <
               document.getElementById("scrollDown").offsetTop +
                  document.getElementById("scrollDown").offsetHeight
            ) {
               s.header.classList.add("hide");
            } else {
               s.header.classList.remove("hide");
            }
         });

         s.scrollDown.addEventListener("click", function () {
            document.querySelector("[data-content='work']").scrollIntoView();
         });

         s.triggerMenu.addEventListener("click", function () {
            this.classList.toggle("is-active");
            s.navTab.classList.toggle("is-active");
         });

         let tabs = document.querySelectorAll(".header__navtab");
         for (let i = 0; i < tabs.length; i++) {
            tabs[i].addEventListener("click", function () {
               let dataTab = this.getAttribute("data-tab");
               let element = document.querySelector(
                  "[data-content='" + dataTab + "']"
               );
               let offset = s.header.offsetHeight - s.navTab.offsetHeight;
               s.navTab.classList.remove("is-active");
               s.triggerMenu.classList.remove("is-active");

               const bodyRect = document.body.getBoundingClientRect().top;
               const elementRect = element.getBoundingClientRect().top;
               const elementPosition = elementRect - bodyRect;
               let offsetPosition = elementPosition - offset;

               if (window.innerWidth >= s.mobileBreakPoint) {
                  offsetPosition = elementPosition - s.header.offsetHeight;
               }

               window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth",
               });
            });
         }

         for (let i = 0; i < s.projectItems.length; i++) {
            s.projectItems[i].addEventListener("click", function () {
               this.classList.add("is-active");
               document
                  .querySelector(".project-details")
                  .classList.add("is-active");
               document.querySelector(".overlay").classList.add("is-active");
               document.querySelector(".project-details__text").innerHTML =
                  this.nextSibling.nextSibling.innerHTML;
            });
         }

         document
            .getElementById("closeDetails")
            .addEventListener("click", function () {
               app.closeProjectDetails();
            });

         document
            .querySelector(".overlay")
            .addEventListener("click", function () {
               app.closeProjectDetails();
            });

         //app.validateContactForm();
      },
   };

   return app;
})();

app.init();
