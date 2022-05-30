const bg = { h: 0, s: 80, v: 80, speed: 0.3 };

// Create sound
const sound = new Audio();
sound.src = "./audio/bruh.mp3";
sound.preload = "auto";

// Play sound
function play() {
  sound.currentTime = 0.12;
  sound.play();
}

function playIfHover() {
  if ($(".collide").is(".hover")) {
    play();
  }
}

// Frame
F.createListeners();
function update() {
  // Background color
  bg.h = (bg.h + bg.speed) % 360;
  $("body").css("background-color", F.hsv2hex(bg));

  // Text stroke
  var color = { ...bg };
  color.h += 180;
  $(".header").css("-webkit-text-stroke-color", F.hsv2hex(color));

  // Collision with mouse
  $(".collide").removeClass("hover");
  $(".collide").removeClass("key");
  if (F.keys.Space) {
    $(".collide").addClass("hover");
    $(".collide").addClass("key");
  }
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

  requestAnimationFrame(update);
}
update();

addEventListener("keydown", event => {
  if (event.code === "Space") {
    $(".collide").addClass("hover");
    play();
  }
});
