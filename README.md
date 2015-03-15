[react]: https://github.com/facebook/react
[styleone]: https://andreypopp.com/posts/2014-08-06-react-style.html
[styletwo]: https://speakerdeck.com/vjeux/react-css-in-js
[stylethree]: http://facebook.github.io/react/tips/inline-styles.html

# Flappy Bird Clone

A Futurama themed flappy bird clone built in the DOM using Facebook's
[React][react]. I'm also using a few features from ES6 which are being
transpiled down into browser-compatible javascript by browserify/babelify.

I'm hoping that this will show off some of the advantages of using declarative
language to describe a UI based on a central `single source of truth` style
state object. Here, the game logic is done entirely by updating the game state,
and the UI handling is kept separate. To keep the animation in time with the
browser's own loop, I update state in a single step by requesting an animation
frame.

I've also kept all styling information within the React components. There's a
[few][styleone] [interesting][styletwo] [discussions][stylethree] going on
about this sort of thing at the moment, and I was interested in giving it a go.
I usually use SCSS with libraries such as bourbon and neat - but honestly this
transition was fairly painless and comes with the advantage of being able to
drop the components in anywhere and they'll render as they're supposed to.
Varying needs in style could be addressed by allowing styles to be overwritten
by props.

Keyboard input is handled by a library which emits events for every key of a
certain type hit. This didn't quite suit the style of how I wished to write my
event loop - so I wrote a very small wrapper to convert this into a stack of
key presses. This allowed me to simply include a call to get the next keypress,
rather than having to handle various asynchronous callbacks in what's meant to
be a simple event loop.

I took a departure from flappy bird in terms of theming - I decided to have
obstacles appear at generated sizes and timings and speeds in order to provide a
little variety while still offering the true frustration inherent in flappy bird
- the numbers may still need some tweaking with but I think the feel of the game
is close.

I have included a very small server that will run on iojs for the purpose of
uploading the app to a Heroku instance. At the moment, it is only running on a
free instance so there may be some start-up time when visiting.

## Issues

* The hit-box is hard to see - this could either be remedied further by making
  it visible - a solution I tried in part with the glass tanks surrounding the
  enemies but without much success, or by using a collision library or writing
  more sophisticated collision code. As half of the charm of flappy bird seems
  to come from the frustrating inevitability of failiure, I decided to leave
  this in for now.

* Occasional slowness. Not particularly surprising as this is done purely with
  DOM updates, and not using canvas. This is surprisingly rare - especially if
  you keep the dev tools closed.
