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
  $("#button").attr("src", "image/button2.png");
  if ($("#button")[0]) {
    var rect = $("#button")[0].getBoundingClientRect();
    if (
      F.collide.circle2circle(F.mouse, {
        x: rect.x + rect.width / 2,
        y: rect.y + rect.height / 2,
        r: Math.min(rect.right - rect.x, rect.bottom - rect.y) / 2,
      })
    ) {
      $(".collide").addClass("hover");

      if (F.mouse.left) {
        $("#button").attr("src", "image/button1.png");
      }
    }
  }

  requestAnimationFrame(update);
}
update();
