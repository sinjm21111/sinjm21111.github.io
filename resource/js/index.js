const bg = {
  el: {
    body: null,
    btn: null,
  },
  methode: {
    bgChange: function () {
      let rand = Math.floor(Math.random() * 4);
      while (bg.el.body.classList[0] === `bg${rand}`) {
        rand = Math.floor(Math.random() * 4);
      }
      bg.el.body.classList = `bg${rand}`;
    },
  },
  setEl: function () {
    this.el.body = document.querySelector("body");
    this.el.btn = this.el.body.querySelector(".bgChange");
  },
  bind: function () {
    this.el.btn.addEventListener("click", bg.methode.bgChange);
  },
  init: function () {
    this.setEl();
    this.bind();
    this.methode.bgChange();
  },
};

const time = {
  el: {
    timeWrap: null,
    textArea: null,
  },
  methode: {
    realTime: function () {
      const toDay = new Date();
      const h = time.methode.doubleDigits(toDay.getHours());
      const m = time.methode.doubleDigits(toDay.getMinutes());
      const s = time.methode.doubleDigits(toDay.getSeconds());
      time.el.textArea.innerHTML = `${h} : ${m} : ${s}`;
    },
    doubleDigits: function (number) {
      let val = number;
      if (val < 10) {
        val = `0${number}`;
      }
      return val;
    },
  },
  setEl: function () {
    this.el.timeWrap = document.querySelector(".time");
    this.el.textArea = this.el.timeWrap.querySelector("strong");
  },
  init: function () {
    this.setEl();
    setInterval(time.methode.realTime, 1000);
    time.methode.realTime();
  },
};

const login = {
  el: {
    body: null,
    btn: null,
  },
  methode: {
    bgChange: function () {
      let rand = Math.floor(Math.random() * 4);
      while (bg.el.body.classList[0] === `bg${rand}`) {
        rand = Math.floor(Math.random() * 4);
      }
      bg.el.body.classList = `bg${rand}`;
    },
  },
  setEl: function () {
    this.el.body = document.querySelector("body");
    this.el.btn = this.el.body.querySelector(".bgChange");
  },
  bind: function () {
    this.el.btn.addEventListener("click", bg.methode.bgChange);
  },
  init: function () {
    this.setEl();
    this.bind();
    this.methode.bgChange();
  },
};

const input = {
  el: {
    todo: null,
    todoUl: null,
    todoLi: null,
    login: null,
    // removeBtn: null,
  },
  methode: {
    keydown: function (e) {
      const target = e.target;

      if (e.key === "Enter") {
        if (e.path[3].classList[0] === "login") {
          input.methode.loginCheck(target.value);
        } else {
          input.methode.todoPlus(target.value);
          target.value = "";
        }
      }
    },
    loginCheck: function (value) {
      if (value !== "") {
        localStorage.setItem("id", value);
        input.el.loginWrap.innerHTML = `<strong class="logOn">Hi ${value} !!!</strong>`;
      }
    },
    todoPlus: function (value) {
      if (value !== "") {
        let arr = [];

        if (JSON.parse(localStorage.getItem("todoList")) !== null) {
          arr = JSON.parse(localStorage.getItem("todoList"));
        }

        arr.push(value);
        localStorage.setItem("todoList", JSON.stringify(arr));
        input.el.todoUl.innerHTML += `<li><span>${value}</span><button type="button">X</button></li>`;

        input.el.todoUl.childNodes.forEach((val) => {
          const btn = val.querySelector("button");
          btn.removeEventListener("click", input.methode.todoRemove);
          btn.addEventListener("click", input.methode.todoRemove);
        });
      }
    },
    todoRemove: function (e) {
      const li = e.path[1];
      let list = JSON.parse(localStorage.getItem("todoList"));

      JSON.stringify(
        list.splice(Array.from(input.el.todoUl.children).indexOf(li), 1)
      );

      localStorage.setItem("todoList", JSON.stringify(list));
      e.path[1].remove();
    },
  },
  setEl: function () {
    this.el.todo = document.querySelector(".todo input");
    this.el.todoUl = document.querySelector(".todo ul");
    // this.el.removeBtn = document.querySelector(".todo ul li button");
    this.el.login = document.querySelector(".login input");
    this.el.loginWrap = document.querySelector(".login .wrap");
  },
  bind: function () {
    this.el.login.addEventListener("keydown", input.methode.keydown);
    this.el.todo.addEventListener("keydown", input.methode.keydown);
  },
  init: function () {
    this.setEl();
    this.bind();
    const id = localStorage.getItem("id");
    const todoList = JSON.parse(localStorage.getItem("todoList"));
    // console.log(todoList);
    if (id !== null) {
      this.methode.loginCheck(id);
    }
    if (todoList !== null) {
      localStorage.setItem("todoList", null);
      todoList.forEach((val) => {
        this.methode.todoPlus(val);
      });
    }
  },
};

const Geolocation_api = {
  el: {
    latitude: null,
    longitude: null,
    locationText: null,
    weatherText: null,
  },
  key: "acc04c521131694647afabe11dab1f22",
  methode: {
    callback: function (e) {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${e.coords.latitude}&lon=${e.coords.longitude}&appid=${Geolocation_api.key}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.name);

          Geolocation_api.el.weatherText.innerText = data.weather[0].main;
          Geolocation_api.el.locationText.innerText = data.name;
          Geolocation_api.el.latitude.innerText = e.coords.latitude;
          Geolocation_api.el.longitude.innerText = e.coords.longitude;
        });
    },
    error: function () {},
  },
  setEl: function () {
    this.el.latitude = document.querySelector(".latitude");
    this.el.longitude = document.querySelector(".longitude");
    this.el.locationText = document.querySelector(".location");
    this.el.weatherText = document.querySelector(".weatherArea span");
  },
  bind: function () {
    window.navigator.geolocation.getCurrentPosition(
      Geolocation_api.methode.callback,
      Geolocation_api.methode.error
    );
  },
  init: function () {
    this.setEl();
    this.bind();
  },
};

window.addEventListener("DOMContentLoaded", function () {
  bg.init();
  time.init();
  input.init();
  Geolocation_api.init();
});
