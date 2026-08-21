/* =================================
   ELEMENTS
================================= */

const intro = document.getElementById("intro");

const site = document.getElementById("site");

const enterBtn = document.getElementById("enterBtn");

const hearts = document.getElementById("hearts");

const wishBtn = document.getElementById("wishBtn");

const flame = document.getElementById("flame");

const replayBtn = document.getElementById("replayBtn");

const musicControl =
  document.getElementById("musicControl");

const musicText =
  document.getElementById("musicText");

const bgMusic =
  document.getElementById("bgMusic");


/* =================================
   ENTER WEBSITE
================================= */

enterBtn.addEventListener("click", () => {

  intro.classList.add("exit");

  /* Start background music */
  bgMusic.volume = 0.35;

  bgMusic.play()
    .then(() => {

      musicControl.classList.add("playing");
      musicText.textContent = "Playing";

    })
    .catch(() => {

      musicText.textContent = "Music";

    });


  setTimeout(() => {

    intro.style.display = "none";

    site.classList.remove("hidden");

    window.scrollTo(0, 0);

    observeReveals();

    burstHearts(20);

  }, 850);

});


/* =================================
   SCROLL BUTTON
================================= */

document
  .querySelector(".scroll-next")
  .addEventListener("click", () => {

    document
      .querySelector(".letter")
      .scrollIntoView({
        behavior: "smooth"
      });

  });


/* =================================
   SCROLL REVEAL
================================= */

function observeReveals() {

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target
              .classList
              .add("visible");

          }

        });

      },
      {
        threshold: 0.16
      }
    );


  document
    .querySelectorAll(".reveal")
    .forEach(element => {

      observer.observe(element);

    });

}


observeReveals();


/* =================================
   FLOATING HEARTS
================================= */

function burstHearts(amount = 10) {

  for (let i = 0; i < amount; i++) {

    const heart =
      document.createElement("span");

    heart.className =
      "heart-particle";

    heart.textContent =
      Math.random() > .25
        ? "♥"
        : "✦";

    heart.style.left =
      Math.random() * 100 + "%";

    heart.style.bottom =
      (-10 - Math.random() * 15) + "px";

    heart.style.setProperty(
      "--drift",
      (Math.random() * 180 - 90) + "px"
    );

    heart.style.animationDelay =
      Math.random() * .7 + "s";

    heart.style.fontSize =
      8 + Math.random() * 15 + "px";

    hearts.appendChild(heart);


    setTimeout(() => {

      heart.remove();

    }, 5000);

  }

}


/* Small hearts occasionally */

setInterval(() => {

  if (
    !document.hidden &&
    !intro.classList.contains("exit")
  ) {

    burstHearts(1);

  }

}, 900);


/* =================================
   BIRTHDAY WISH
================================= */

wishBtn.addEventListener("click", () => {

  if (
    wishBtn.classList.contains("done")
  ) {

    return;

  }


  /* Turn off candle */

  flame.style.display = "none";


  /* Change button */

  wishBtn.textContent =
    "Wish made ✨";

  wishBtn.classList.add("done");


  /* Celebration */

  burstHearts(50);


  /* Go to final section */

  setTimeout(() => {

    document
      .querySelector(".final")
      .scrollIntoView({
        behavior: "smooth"
      });

  }, 1400);

});


/* =================================
   REPLAY
================================= */

replayBtn.addEventListener("click", () => {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });


  setTimeout(() => {

    location.reload();

  }, 700);

});


/* =================================
   MUSIC
================================= */

musicControl.addEventListener(
  "click",
  async () => {

    try {

      if (bgMusic.paused) {

        await bgMusic.play();

        musicControl
          .classList
          .add("playing");

        musicText.textContent =
          "Playing";

      }

      else {

        bgMusic.pause();

        musicControl
          .classList
          .remove("playing");

        musicText.textContent =
          "Music";

      }

    }

    catch (error) {

    musicText.textContent =
  "Add song.mpeg";


      setTimeout(() => {

        musicText.textContent =
          "Music";

      }, 2500);

    }

  }
);