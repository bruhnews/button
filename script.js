const bg = { h: 0, s: 0, v: 0, speed: 0.3 };

// Create sound
const sound = new Audio();
sound.src = "./audio/bruh.mp3";
sound.preload = "auto";

// Play sound
var lastPlay = 0;
function play() {
  if (Date.now() - lastPlay < 100) {
    return;
  }
  lastPlay = Date.now();
  sound.currentTime = 0.12;
  sound.play();
  bg.s += 10;
  bg.v += 20;
  bg.h += 40;
}

function playIfHover() {
  if ($(".collide").is(".hover")) {
    play();
  }
}

// Space key
var spaceKey = false;
addEventListener("keydown", event => {
  if (event.code === "Space") {
    if (!spaceKey) {
      $(".collide").addClass("hover");
      play();
    }
    spaceKey = true;
  }
});
addEventListener("keyup", event => {
  if (event.code === "Space") {
    spaceKey = false;
  }
});

// Frame
F.createListeners();
function update(mod) {
  // Background color
  bg.s = F.clamp(bg.s - 0.5 * mod, 70, 100);
  bg.v = F.clamp(bg.v - 0.5 * mod, 50, 100);
  bg.h = (bg.h + bg.speed) % 360;
  $("body").css("background-color", F.hsv2hex(bg));

  // Text stroke
  var color = { ...bg };
  color.h += 180;
  $(".header").css("-webkit-text-stroke-color", F.hsv2hex(color));

  // Hold button extra
  $(".collide").removeClass("hold");
  if (Date.now() - lastPlay < 100) {
    $(".collide").addClass("hold");
  }
  // Reset classes
  $(".collide").removeClass("hover");
  $(".collide").removeClass("key");
  if (spaceKey) {
    $(".collide").addClass("hover");
    $(".collide").addClass("key");
  }

  // Collision with mouse
  if ($("#button")[0]) {
    var rect = $("#button")[0].getBoundingClientRect();
    if (
      F.collide.circle2circle(F.mouse, {
        x: rect.x + rect.width / 2 || 0,
        y: rect.y + rect.height / 2 || 0,
        r: Math.max(
          Math.min(rect.right - rect.x, rect.bottom - rect.y) / 2,
          100,
        ),
      })
    ) {
      $(".collide").addClass("hover");
    }
  }
}

// Run frame function
function main() {
  update((Date.now() - then) / 1000);
  the = Date.now();
  requestAnimationFrame(main);
}
var then = Date.now();
main();
