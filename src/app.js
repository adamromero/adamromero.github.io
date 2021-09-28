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
         form: document.getElementById("contactForm"),
         mobileBreakPoint: 768,
         scrollAboveIntro: false,
         scrollBelowIntro: false,
         previousScrollPosition: 0,
         previousActiveElement: null,
      },

      init: function () {
         s = this.settings;
         s.year.innerHTML = new Date().getFullYear();
         this.bindUIActions();
      },

      validateContactForm: function () {
         let inputName = document.getElementById("name"),
            inputEmail = document.getElementById("email"),
            inputMessage = document.getElementById("message"),
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

         s.form.addEventListener("submit", app.handleContactFormSubmission);
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

      handleContactFormSubmission: async function (event) {
         event.preventDefault();
         var status = document.getElementById("formStatus");
         var data = new FormData(event.target);

         fetch(event.target.action, {
            method: s.form.method,
            body: data,
            headers: {
               Accept: "application/json",
            },
         })
            .then((response) => {
               status.innerHTML = "Thanks for your submission!";
               s.form.reset();
            })
            .catch((error) => {
               status.innerHTML =
                  "Error! There was a problem submitting your form.";
            });
      },

      closeProjectDetails: function () {
         document
            .querySelector(".project-details")
            .classList.remove("is-active");
         document.querySelector(".overlay").classList.remove("is-active");
         document
            .querySelector(".content__overlay.is-active")
            .classList.remove("is-active");
         s.previousActiveElement.focus();
      },

      openProject: function (element) {
         element.classList.add("is-active");
         document.querySelector(".project-details").classList.add("is-active");
         document.querySelector(".overlay").classList.add("is-active");
         document.querySelector(".project-details__text").innerHTML =
            element.nextElementSibling.innerHTML;

         setTimeout(function () {
            app.trapFocusInModal();
         }, 0);
      },

      trapFocusInModal: function () {
         const indexForLastLink = document.querySelectorAll(
            ".project-details.is-active .project-details__link"
         ).length;
         const firstFocusableEl = document.getElementById("closeDetails"),
            lastFocusableEl = document.querySelectorAll(
               ".project-details.is-active .project-details__link"
            )[indexForLastLink - 1];
         firstFocusableEl.focus();

         function loopFocus(e) {
            if (e.key === "Tab" || e.keyCode === 9) {
               if (e.shiftKey && document.activeElement === firstFocusableEl) {
                  e.preventDefault();
                  lastFocusableEl.focus();
               } else if (
                  !e.shiftKey &&
                  document.activeElement === lastFocusableEl
               ) {
                  e.preventDefault();
                  firstFocusableEl.focus();
               }
            }
         }

         document
            .querySelector(".project-details")
            .addEventListener("keydown", loopFocus);
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
         });

         s.triggerMenu.addEventListener("click", function () {
            this.classList.toggle("is-active");
            s.navTab.classList.toggle("is-active");
         });

         let tabs = document.querySelectorAll(".navtab");
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
                  offsetPosition = elementPosition;
               }

               window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth",
               });
            });
         }

         function triggerProjectModal(e) {
            if (e.type === "click" || e.key === "Enter") {
               s.previousActiveElement = document.activeElement;
               app.openProject(this);
            }
         }

         for (let i = 0; i < s.projectItems.length; i++) {
            s.projectItems[i].addEventListener("click", triggerProjectModal);
            s.projectItems[i].addEventListener("keydown", triggerProjectModal);
         }

         document
            .getElementById("closeDetails")
            .addEventListener("click", function () {
               app.closeProjectDetails();
            });

         document.addEventListener("keydown", function (e) {
            if (
               document
                  .querySelector(".project-details")
                  .classList.contains("is-active") &&
               e.key === "Escape"
            ) {
               app.closeProjectDetails();
            }
         });

         document
            .querySelector(".overlay")
            .addEventListener("click", function () {
               app.closeProjectDetails();
            });

         app.validateContactForm();
      },
   };

   return app;
})();

app.init();
