let parallax_el = document.querySelectorAll(".parallax");
let main = document.querySelector("main");
let xValue = 0,
  yValue = 0;

let rotateDegree = 0;

window.addEventListener("mousemove", (e) => {
  if (timeline.isActive()) return;
  xValue = e.clientX - window.innerWidth / 2;
  yValue = e.clientY - window.innerHeight / 2;

  rotateDegree = (xValue / (window.innerWidth / 2)) * 20;

  update(e.clientX);
});

function update(cursorPosition) {
  parallax_el.forEach((el) => {
    let speedx = el.dataset.speedx;
    let speedy = el.dataset.speedy;
    let speedz = el.dataset.speedz;
    let rotateSpeed = el.dataset.rotation;

    let isInLeft =
      parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
    let zValue =
      (cursorPosition - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1;

    el.style.transform = `perspective(2300px) translateZ(${zValue * speedz
      }px) rotateY(${rotateDegree * rotateSpeed}deg) translateX(calc(-50% + ${xValue * speedx
      }px)) translateY(calc(-50% + ${yValue * speedy}px)) `;
  });
}
update(0);

if (window.innerWidth >= 725) {
  main.style.maxHeight = `${window.innerWidth * 0.6}px`;
} else {
  main.style.maxHeight = `${window.innerWidth * 1.6}px`;
}

// GSAP ANIMATION

let timeline = gsap.timeline();

// setTimeout(() => {
//   parallax_el.forEach((el) => {
//     el.style.transition = "0.45s cubic-bezier(0.2, 0.49, 0.32, 0.99)";
//   });
// }, timeline.endTime() * 1000);

Array.from(parallax_el)
  .filter((el) => !el.classList.contains("text"))
  .forEach((el) => {
    timeline.from(
      el,
      {
        top: `${el.offsetHeight / 2 + +el.dataset.distance}px`,
        duration: 3,
        ease: "power3.out",
      },
      "1"
    );
  });

timeline
  .from(
    ".text h1",
    {
      y:
        window.innerHeight -
        document.querySelector(".text h1").getBoundingClientRect().top +
        200,
      duration: 2,
    },
    "2.5"
  )
  .from(
    ".text h2",
    {
      y: -150,
      opacity: 0,
      duration: 0.5,
    },
    "3"
  )
  .from(
    ".hide",
    {
      opacity: 0,
      duration: 1.5,
    },
    "3"
  );
