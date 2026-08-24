/* =========================================
   TANIŞMA TARİHİ
========================================= */

const metAt =
  new Date(
    "2026-07-21T00:00:00+03:00"
  );


/* =========================================
   ELEMENTLER
========================================= */

const enterBtn =
  document.getElementById(
    "enter"
  );

const intro =
  document.getElementById(
    "intro"
  );

const cinematic =
  document.getElementById(
    "cinematic"
  );

const cinematicLine =
  document.getElementById(
    "cinematicLine"
  );

const surpriseButton =
  document.getElementById(
    "surpriseButton"
  );

const surprise =
  document.getElementById(
    "surprise"
  );

const surpriseClose =
  document.getElementById(
    "surpriseClose"
  );

const distancePhrase =
  document.getElementById(
    "distancePhrase"
  );

const bgMusic =
  document.getElementById(
    "bgMusic"
  );

const musicToggle =
  document.getElementById(
    "musicToggle"
  );


/* =========================================
   BAŞLANGIÇ
========================================= */

document.body.classList.add(
  "no-scroll"
);


/* =========================================
   WAIT
========================================= */

function wait(milliseconds) {

  return new Promise(
    resolve =>
      setTimeout(
        resolve,
        milliseconds
      )
  );

}


/* =========================================
   MÜZİK FADE-IN
========================================= */

function fadeMusicIn() {

  const targetVolume =
    0.28;

  const fadeDuration =
    4000;

  const steps =
    40;

  const stepTime =
    fadeDuration
    /
    steps;

  const volumeStep =
    targetVolume
    /
    steps;

  let currentStep =
    0;


  const fadeInterval =
    setInterval(
      () => {

        currentStep++;


        bgMusic.volume =
          Math.min(
            targetVolume,
            currentStep
            *
            volumeStep
          );


        if (
          currentStep
          >=
          steps
        ) {

          clearInterval(
            fadeInterval
          );

        }

      },
      stepTime
    );

}


/* =========================================
   GİRİŞ SİNEMATİĞİ
========================================= */

async function playIntro() {

  /* MÜZİK */

  try {

    bgMusic.volume =
      0;

    await bgMusic.play();

    musicToggle
      .classList
      .add(
        "visible"
      );

    fadeMusicIn();

  } catch (error) {

    console.log(
      "Müzik başlatılamadı:",
      error
    );

  }


  /* GİRİŞ KAPANSIN */

  intro.classList.add(
    "hide"
  );


  await wait(
    850
  );


  cinematic.classList.add(
    "active"
  );


  const lines = [

    "Bursa.",

    "Ohio.",

    "Aramızda binlerce kilometre.",

    "Ama 21 Temmuz'dan beri...",

    "mesafe biraz daha anlamsız."

  ];


  for (
    const line of lines
  ) {

    cinematicLine.textContent =
      line;


    cinematicLine
      .classList
      .add(
        "visible"
      );


    /*
      Yağmur'un Türkçeyi
      rahat okuyabilmesi için
      bilinçli olarak yavaş.
    */

    await wait(
      line.length > 20
        ? 3200
        : 2200
    );


    cinematicLine
      .classList
      .remove(
        "visible"
      );


    await wait(
      700
    );

  }


  cinematic.classList.remove(
    "active"
  );


  await wait(
    500
  );


  document.body
    .classList
    .remove(
      "no-scroll"
    );


  intro.remove();

}


enterBtn.addEventListener(
  "click",
  playIntro
);


/* =========================================
   SCROLL ANİMASYONLARI
========================================= */

const revealObserver =
  new IntersectionObserver(

    entries => {

      entries.forEach(
        entry => {

          if (
            entry.isIntersecting
          ) {

            entry.target
              .classList
              .add(
                "show"
              );


            revealObserver
              .unobserve(
                entry.target
              );

          }

        }
      );

    },

    {
      threshold: 0.12
    }

  );


document
  .querySelectorAll(
    ".reveal"
  )
  .forEach(
    element => {

      revealObserver
        .observe(
          element
        );

    }
  );


/* =========================================
   CANLI SAYAÇ
========================================= */

function updateCounter() {

  let difference =
    Date.now()
    -
    metAt.getTime();


  if (
    difference < 0
  ) {

    difference =
      0;

  }


  const totalSeconds =
    Math.floor(
      difference
      /
      1000
    );


  const days =
    Math.floor(
      totalSeconds
      /
      86400
    );


  const hours =
    Math.floor(
      (
        totalSeconds
        %
        86400
      )
      /
      3600
    );


  const minutes =
    Math.floor(
      (
        totalSeconds
        %
        3600
      )
      /
      60
    );


  const seconds =
    totalSeconds
    %
    60;


  document
    .getElementById(
      "days"
    )
    .textContent =
      days;


  document
    .getElementById(
      "hours"
    )
    .textContent =
      String(
        hours
      )
      .padStart(
        2,
        "0"
      );


  document
    .getElementById(
      "minutes"
    )
    .textContent =
      String(
        minutes
      )
      .padStart(
        2,
        "0"
      );


  document
    .getElementById(
      "seconds"
    )
    .textContent =
      String(
        seconds
      )
      .padStart(
        2,
        "0"
      );

}


updateCounter();


setInterval(
  updateCounter,
  1000
);


/* =========================================
   MESAFE MESAJLARI
========================================= */

const distanceMessages = [

  "Kilometrelerce uzakta, ama günümün içinde.",

  "Aynı gökyüzünün altında olmasak bile aynı hikâyenin içindeyiz.",

  "Saat farkı var. Mesafe var. Ama sen de varsın.",

  "Bursa'dan Ohio'ya uzanan garip ama güzel bir hikâye.",

  "Mesafe sadece aramızdaki yol. Hikâyemizin kendisi değil."

];


let distanceIndex =
  0;


setInterval(
  () => {

    distancePhrase
      .classList
      .add(
        "switching"
      );


    setTimeout(
      () => {

        distanceIndex =
          (
            distanceIndex
            +
            1
          )
          %
          distanceMessages.length;


        distancePhrase.textContent =
          distanceMessages[
            distanceIndex
          ];


        distancePhrase
          .classList
          .remove(
            "switching"
          );

      },
      450
    );

  },
  4300
);


/* =========================================
   GİZLİ SÜRPRİZ
========================================= */

function openSurprise() {

  surprise.classList.add(
    "open"
  );


  surprise.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body
    .classList
    .add(
      "no-scroll"
    );

}


function closeSurprise() {

  surprise.classList.remove(
    "open"
  );


  surprise.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body
    .classList
    .remove(
      "no-scroll"
    );

}


surpriseButton
  .addEventListener(
    "click",
    openSurprise
  );


surpriseClose
  .addEventListener(
    "click",
    closeSurprise
  );


surprise
  .addEventListener(
    "click",
    event => {

      if (
        event.target
        ===
        surprise
      ) {

        closeSurprise();

      }

    }
  );


document
  .addEventListener(
    "keydown",
    event => {

      if (
        event.key
        ===
        "Escape"
      ) {

        closeSurprise();

      }

    }
  );


/* =========================================
   MÜZİK KONTROLÜ
========================================= */

musicToggle.addEventListener(
  "click",
  async () => {

    if (
      bgMusic.paused
    ) {

      try {

        await bgMusic.play();


        bgMusic.muted =
          false;


        musicToggle
          .classList
          .remove(
            "muted"
          );


        musicToggle.textContent =
          "♫";

      } catch (error) {

        console.log(
          "Müzik başlatılamadı:",
          error
        );

      }

    } else {

      bgMusic.pause();


      musicToggle
        .classList
        .add(
          "muted"
        );


      musicToggle.textContent =
        "♪";

    }

  }
);