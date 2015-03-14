"use strict";
// we'll keep all of the functions required to manipulate the game in
// here

function intBetween(min, max) {
    return Math.random() * (max - min) + min;
}

function genObstacle(state) {

    let opt = state.get("obstacle");
    let height = state.get("height");
    let width = state.get("width");

    let minObstacleHeight = height * opt.height.min;
    let maxObstacleHeight = height * opt.height.max;

    let obstacleHeight = intBetween(minObstacleHeight, maxObstacleHeight);

    return {
        height: obstacleHeight,
        width: opt.width,
        x: width,
        top: height - obstacleHeight, // for now we'll have the
        // obstacles `stuck` to the floor
        scored: false, // has the player recieved a score for this obstacle?
        created: Date.now()
    };
}

function birdCollided(bird, state) {

    let position = bird.get("position");
    let bottom = state.get("height");

    return position > bottom - (bird.get("height") / 2);
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
        } else if (o.x < o.width - (width / 2) && !o.scored) {
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

    bird.set("position", height / 2);
    bird.set("velocity", 0);
}

function addObstacle(state) {

    let os = state.get("obstacle", "obstacles");

    os.push(
        genObstacle(state));

    state.select("obstacle").set("obstacles", os);
}

function updateGame(state, velocityMod) {

    state.on("update", function() {
        console.dir(state.get());
    });

    let pause = state.get("pause");
    let fail = state.get("fail");

    let bird = state.select("bird");

    if (!pause && !fail) {

        // bird movement first;
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
