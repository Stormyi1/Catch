const mainBox = document.getElementById("box");
const boxes = document.getElementsByClassName("box");
const menu = document.getElementById("menu");
const speedRange = document.getElementById("speedRange");
const curSpeedH1 = document.getElementById("curSpeed");
const slowInput = document.getElementById("slow");
const openMenuBtn = document.getElementById("openMenu");
const counter = document.getElementById("counter");
const imgInp = document.getElementById("imgInp");

let size = 100;
let curSpeed = 0.5;
curSpeedH1.innerText = curSpeed * 10;
let count = 0;

for (let i = 0; i < boxes.length; i++) {
  if (localStorage.getItem("image") != null) {
    boxes[i].style.backgroundImage = localStorage.getItem("image");
  }else{
    boxes[i].style.backgroundImage = "url('https://tse4.mm.bing.net/th/id/OIP.LEpiHvLvT0d7NLn_rC_XNwAAAA?pid=ImgDet&rs=1)'"
  }
}

document.getElementById("boxContainer").addEventListener("click", () => {
  if(menu.style.display == "flex"){
    menu.style.display = "none"
  }
})

mainBox.addEventListener("mouseover", () => {
  if (menu.style.display == "flex") {
    menu.style.display = "none";
  }
  count++;
  counter.innerText = "Counter: " + count;
  console.clear();
  let randSize = getRandomSize();
  size = randSize;
  randSize = randSize + "px";
  const randHeight = getRandomHeigth().toString() + "px";
  const randWidth = getRandomWidth().toString() + "px";
  console.log(boxes);
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].style.width = randSize;
    boxes[i].style.height = randSize;
    boxes[i].style.top = randHeight;
    boxes[i].style.left = randWidth;
    if (i != 0) {
      boxes[i].style.filter = "blur(4px)";
    }
  }
  const timeoutOne = setTimeout(() => {
    for (let i = 0; i < boxes.length; i++) {
      if (i != 0) {
        boxes[i].style.filter = "blur(0px)";
      }
    }
  }, 200);

  console.log("Links: " + box.style.left);
  console.log("Oben: " + box.style.top);
  console.log("Höhe: " + window.innerHeight);
  console.log("Breite: " + window.innerWidth);
});

document.addEventListener("keydown", (event) => {
  const keyName = event.key;
  if (keyName == "Escape") {
    event.preventDefault();
    showMenu();
  }
});
openMenuBtn.addEventListener("click", () => {
  showMenu();
});

function showMenu() {
  if (menu.style.display == "flex") {
    menu.style.display = "none";
  } else {
    menu.style.display = "flex";
  }
}

function changeSpeed() {
  for (let i = 0; i < boxes.length; i++) {
    if (slowInput.checked) {
      boxes[i].style.transition = "all 5s";
      curSpeed = 5;
    } else {
      boxes[i].style.transition = "all " + (11 - speedRange.value) / 10 + "s";
      curSpeed = (11 - speedRange.value) / 10;
    }
  }
  curSpeedH1.innerText = curSpeed * 10;
  console.log(curSpeed);
}

speedRange.addEventListener("input", () => {
  slowInput.checked = false;
  changeSpeed();
});

slowInput.addEventListener("change", () => {
  changeSpeed();
});

mainBox.addEventListener("click", () => {
  if (curSpeed >= 0.8 && curSpeed <= 1) {
    alert("Top, aber zu leicht\nVersuche: " + count);
  } else if (curSpeed >= 0.5 && curSpeed < 0.8) {
    alert("Ja wird schwerer i guess (habs nicht getestet)\nVersuche: " + count);
  } else if (curSpeed >= 0.3 && curSpeed < 0.5) {
    alert("Supertoll\nVersuche: " + count);
  } else if (curSpeed <= 0.2 && curSpeed > 0) {
    alert(
      "Das is eigentlich nicht möglich durch Frames und so (glaub ich)\nVersuche: " +
        count
    );
  } else {
    alert("Loser\nVersuche: " + count);
  }
  count = 0;
  counter.innerText = "Counter: 0";
});

imgInp.addEventListener("change", () => {
  for (let i = 0; i < boxes.length; i++) {
    try {
      boxes[i].style.backgroundImage = 'url("' + imgInp.value + '")';
      localStorage.setItem("image", 'url("' + imgInp.value + '")');
    } catch {
      boxes[i].style.backgroundImage =
        'url("https://tse4.mm.bing.net/th/id/OIP.LEpiHvLvT0d7NLn_rC_XNwAAAA?pid=ImgDet&rs=1")';
    }
  }
});

function getRandomSize() {
  return Math.floor(Math.random() * 100) + 25;
}

function getRandomHeigth() {
  const random = Math.floor(Math.random() * window.innerHeight) - size;
  console.log();
  console.log("Random Höhe: " + random);
  if (random < 0) {
    return 0;
  } else {
    return random;
  }
}
function getRandomWidth() {
  const random = Math.floor(Math.random() * window.innerWidth) - size;
  console.log("Random Breite: " + random);
  if (random < 0) {
    return 0;
  } else {
    return random;
  }
}
