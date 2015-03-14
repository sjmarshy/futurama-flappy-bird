"use strict";
// we'll keep all of the functions required to manipulate the game in
// here

function intBetween(min, max) {
    return Math.random() * (max - min) + min;
}

function setHighScore(score) {

    let hs = parseInt(window.localStorage.getItem("highscore"), 10);

    if (!hs || hs < parseInt(score, 10)) {
        window.localStorage.setItem("highscore", score);
        return score;
    }
    return hs;
}

function genObstacle(state) {

    let opt = state.get("obstacle");
    let height = state.get("height");
    let width = state.get("width");

    let minObstacleHeight = height * opt.height.min;
    let maxObstacleHeight = height * opt.height.max;

    let obstacleHeight = intBetween(minObstacleHeight, maxObstacleHeight);

    let obstacleY = intBetween(0, height);

    return {
        height: obstacleHeight,
        width: opt.width,
        x: width,
        y: obstacleY,
        top: obstacleY - (obstacleHeight / 2),
        scored: false, // has the player recieved a score for this obstacle?
        created: Date.now()
    };
}

function moveBackground(backgroundCursor) {

    let pos = backgroundCursor.get("position");
    let width = backgroundCursor.get("width");

    if (pos < 0) {
        pos = width;
    } else {
        pos -= 1;
    }

    backgroundCursor.set("position", pos);
}

function birdCollided(bird, state) {

    let position = bird.get("position");
    let bottom = state.get("height");

    let bx = bird.get("x");
    let bw = bird.get("width");
    let bh = bird.get("height");

    // bird
    let t1 = position - (bh / 2);
    let l1 = bx - (bw / 2);
    let b1 = t1 + bh;
    let r1 = l1 + bw;

    // collision: if any of the birds vertices are
    // inside the bounds of the obstacle, then we're colliding
    let vertices = [
        [l1, t1], // topleft
        [r1, t1], // topright
        [r1, b1], // bottomright
        [l1, b1] // bottomleft
    ];

    let obstacles = state.get("obstacle", "obstacles");

    let collided = obstacles.reduce(function(m, o) {

        if (m) {
            return m;
        }

        // obstacle
        let t2 = o.top;
        let l2 = o.x;
        let b2 = o.top + o.height;
        let r2 = l2 + o.width;

        return vertices.reduce(function(memo, v) {

            let x = v[0],
                y = v[1];


            if (memo) {
                return memo;
            }

            let collision = x > l2 &&
                x < r2 &&
                y > t2 &&
                y < b2;

            return collision;
        }, false);
    }, false);

    return position > bottom - (bird.get("height") / 2) ||
        collided;
}

function updateBird(birdCursor, velocityMod) {

    if (velocityMod > 0) {
        birdCursor.set("velocity", velocityMod);
    }

    let velocity = birdCursor.get("velocity");
    let birdY = birdCursor.get("position");
    let newPosition = birdY - velocity;

    birdCursor.set("position", newPosition);

    if (velocity > -10) {
        birdCursor.set("velocity", velocity - 1);
    }

}

function moveObstacles(state) {

    let os = state.get("obstacle", "obstacles");
    let forwardVelocity = state.get("obstacle", "velocity");
    let width = state.get("width");

    state.select("obstacle").set("obstacles", os.map(function(o) {

        o.x -= forwardVelocity;

        if (o.x < -o.width) {
            return null;
        } else if (o.x < width / 2 && !o.scored) {
            console.log("hey");
            let score = state.get("score");
            state.set("score", score + 1);
            o.scored = true;
        }

        return o;

    }).filter(function(o) {
        return !!o;
    }));
}

function failGame(state) {

    let bird = state.select("bird");
    let height = state.get("height");

    state.set("fail", true);
    state.set("pause", true);

    state.select("obstacle").set("obstacles", []);

    bird.set("position", height / 2);
    bird.set("velocity", 0);

    state.set("highscore", setHighScore(state.get("score")));

}

function addObstacle(state) {

    let os = state.get("obstacle", "obstacles");

    os.push(
        genObstacle(state));

    state.select("obstacle").set("obstacles", os);
}

function updateGame(state, velocityMod) {

    let pause = state.get("pause");
    let fail = state.get("fail");

    let bird = state.select("bird");

    if (!pause && !fail) {

        moveBackground(state.select("background"));

        updateBird(bird, velocityMod);

        if (birdCollided(bird, state)) {
            failGame(state);
            return;
        }

        // obstacles

        let os = state.get("obstacle", "obstacles");
        let timing = state.get("obstacle", "timing");
        if (os.length > 0) {

            let last = os[os.length - 1].created;
            let now = Date.now();
            let diff = now - last;
            let next = intBetween(timing.min, timing.max);

            if (diff > next) {
                addObstacle(state);
            }
        } else {
            addObstacle(state);
        }

        // move every obstacle to the left until it's off the screen,
        // then we can delete it.
        moveObstacles(state);
    }
}

module.exports = {
    updateGame: updateGame
};
