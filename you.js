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
   MUSIC SETTINGS
================================= */

bgMusic.volume = 0.35;
bgMusic.loop = true;


/* =================================
   MUSIC ERROR CHECK
================================= */

bgMusic.addEventListener("error", () => {

  console.error(
    "Music could not be loaded.",
    bgMusic.error
  );

  musicText.textContent = "Music Error";

});


/* =================================
   MUSIC LOADED
================================= */

bgMusic.addEventListener("canplaythrough", () => {

  console.log("Music is ready.");

});


/* =================================
   PLAY MUSIC FUNCTION
================================= */

async function playMusic() {

  try {

    bgMusic.volume = 0.35;

    await bgMusic.play();

    musicControl.classList.add("playing");

    musicText.textContent = "Playing";

    console.log("Music started successfully.");

  }

  catch (error) {

    console.error(
      "Music could not start:",
      error
    );

    musicText.textContent = "Music";

  }

}


/* =================================
   ENTER WEBSITE
================================= */

enterBtn.addEventListener("click", async () => {

  /* Start music from the button click */
  await playMusic();


  /* Intro animation */

  intro.classList.add("exit");


  /* Show main website */

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

const scrollNext =
  document.querySelector(".scroll-next");

if (scrollNext) {

  scrollNext.addEventListener(
    "click",
    () => {

      const letter =
        document.querySelector(".letter");

      if (letter) {

        letter.scrollIntoView({
          behavior: "smooth"
        });

      }

    }
  );

}


/* =================================
   SCROLL REVEAL
================================= */

function observeReveals() {

  const elements =
    document.querySelectorAll(".reveal");


  if (!("IntersectionObserver" in window)) {

    elements.forEach(element => {

      element.classList.add("visible");

    });

    return;

  }


  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "visible"
            );

          }

        });

      },
      {
        threshold: 0.16
      }
    );


  elements.forEach(element => {

    observer.observe(element);

  });

}


/* =================================
   START REVEALS
================================= */

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
      Math.random() > 0.25
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
      Math.random() * 0.7 + "s";


    heart.style.fontSize =
      8 + Math.random() * 15 + "px";


    hearts.appendChild(heart);


    setTimeout(() => {

      heart.remove();

    }, 5000);

  }

}


/* =================================
   SMALL HEARTS
================================= */

setInterval(() => {

  if (
    !document.hidden &&
    intro &&
    !intro.classList.contains("exit")
  ) {

    burstHearts(1);

  }

}, 900);


/* =================================
   BIRTHDAY WISH
================================= */

if (wishBtn) {

  wishBtn.addEventListener(
    "click",
    () => {

      if (
        wishBtn.classList.contains("done")
      ) {

        return;

      }


      /* Turn off candle */

      if (flame) {

        flame.style.display = "none";

      }


      /* Change button */

      wishBtn.textContent =
        "Wish made ✨";


      wishBtn.classList.add("done");


      /* Celebration */

      burstHearts(50);


      /* Go to final section */

      setTimeout(() => {

        const finalSection =
          document.querySelector(".final");


        if (finalSection) {

          finalSection.scrollIntoView({
            behavior: "smooth"
          });

        }

      }, 1400);

    }
  );

}


/* =================================
   REPLAY
================================= */

if (replayBtn) {

  replayBtn.addEventListener(
    "click",
    () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });


      setTimeout(() => {

        location.reload();

      }, 700);

    }
  );

}


/* =================================
   MUSIC CONTROL
================================= */

musicControl.addEventListener(
  "click",
  async () => {

    try {

      /* If music is paused */

      if (bgMusic.paused) {

        await bgMusic.play();

        musicControl.classList.add(
          "playing"
        );

        musicText.textContent =
          "Playing";

      }


      /* If music is already playing */

      else {

        bgMusic.pause();

        musicControl.classList.remove(
          "playing"
        );

        musicText.textContent =
          "Music";

      }

    }

    catch (error) {

      console.error(
        "Music control error:",
        error
      );

      musicText.textContent =
        "Music Error";


      setTimeout(() => {

        musicText.textContent =
          "Music";

      }, 2500);

    }

  }
);


/* =================================
   DEBUG INFORMATION
================================= */

console.log(
  "Music file:",
  bgMusic.currentSrc
);

console.log(
  "Music ready state:",
  bgMusic.readyState
);

console.log(
  "Music network state:",
  bgMusic.networkState
);
