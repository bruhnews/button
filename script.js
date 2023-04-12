const bg = { h: 0, s: 0, v: 0, speed: 0.3 };

// Create sound
const sound = new Audio();
sound.src = "./audio/bruh.mp3";
sound.preload = "auto";

// Play sound
var lastPlay = 0;
function play() {
    if (Date.now() - lastPlay < 80) {
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
    event;
    if (event.code === "Space") {
        spaceKey = false;
    }
});

const mouse = {
    x: 0,
    y: 0,
    r: 1,
};

addEventListener("mousedown", event => {
    let rect = document.body.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
});

// Frame
function update(mod) {
    // Background color
    bg.s = Math.min(Math.max(bg.s - 0.5 * mod, 70), 100);
    bg.v = Math.min(Math.max(bg.v - 0.5 * mod, 50), 100);
    bg.h = (bg.h + bg.speed) % 360;
    $("body").css("background-color", hsv2hex(bg));

    // Text stroke
    var color = { ...bg };
    color.h += 180;
    $(".header").css("-webkit-text-stroke-color", hsv2hex(color));

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
            collide_circle2circle(mouse, {
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

function collide_circle2circle(a, b) {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2) < a.r + b.r;
}

function hsv2hex(hsv, ignoreOpacity = false) {
    return rgb2hex(hsv2rgb(hsv), ignoreOpacity);
}

function rgb2hex(rgb, ignoreOpacity = false) {
    return (
        "#" +
        toHex(rgb.r) +
        toHex(rgb.g) +
        toHex(rgb.b) +
        (ignoreOpacity
            ? ""
            : toHex(Math.floor(rgb.a || rgb.a === 0 ? rgb.a : 255)))
    );
}

function toHex(number) {
    if (number === 0) {
        return "00";
    }
    if (number) {
        var hex = Math.floor(number).toString(16).toUpperCase();
        if (hex) {
            return hex.length === 1 ? "0" + hex : hex;
        }
    }
}

function hsv2rgb(hsv, round = true) {
    var h = (round ? Math.floor(hsv.h) : hsv.h) / 360,
        s = (round ? Math.floor(hsv.s) : hsv.s) / 100,
        v = (round ? Math.floor(hsv.v) : hsv.v) / 100,
        a = hsv.a || hsv.a === 0 ? (round ? Math.floor(hsv.a) : hsv.a) : 100,
        i = Math.floor(h * 6),
        f = h * 6 - i,
        p = v * (1 - s),
        q = v * (1 - f * s),
        t = v * (1 - (1 - f) * s),
        r = 0,
        g = 0,
        b = 0;
    switch (i % 6) {
        case 0:
            (r = v), (g = t), (b = p);
            break;
        case 1:
            (r = q), (g = v), (b = p);
            break;
        case 2:
            (r = p), (g = v), (b = t);
            break;
        case 3:
            (r = p), (g = q), (b = v);
            break;
        case 4:
            (r = t), (g = p), (b = v);
            break;
        case 5:
            (r = v), (g = p), (b = q);
            break;
    }
    r *= 255;
    g *= 255;
    b *= 255;
    a *= 2.55;
    if (!round) {
        return {
            r,
            g,
            b,
            a,
        };
    }
    return {
        r: Math.round(r),
        g: Math.round(g),
        b: Math.round(b),
        a: Math.round(a),
    };
}
