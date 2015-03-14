# Flappy Bird Clone

plan is to produce a flappy bird clone in
[React](https://github.com/facebook/react) using some ES6 concepts where
possible.

I'll be using a single data-structure for application state provided by
[baobab](https://github.com/Yomguithereal/baobab). This is to centralise app
state, to avoid losing track of where each part of state is stored and to unite
updating state and updating UI. The fantastic part about using React and Baobab
together specifically to make a game is that I just need to declare how each
piece of state effects the UI, and then modify state and the UI handles itself.

I'll be updating app state on every new animation frame, so the UI will also be
updated as we go along also.

[Styling](https://andreypopp.com/posts/2014-08-06-react-style.html) 
[will](https://speakerdeck.com/vjeux/react-css-in-js) be done from
[within](http://facebook.github.io/react/tips/inline-styles.html) React, to
give the concept of packaging a component with it's associated style a go.


The obstacles are generated at random based on the time the last one was created
and a min/max time between objects system.


I'll be using Babelify with browserify to produce the compiled-down
code. This allows me to use ES6 features and include JSX in the project.

The code should run just fine in any environment, but I'll provide a server to
allow it to run in any environment with iojs/npm installed - and include a
Procfile to allow it to be installed on a Heroku instance. I'll also include a
Vagrantfile if you don't want to install iojs on your host machine.

I'll be using a library to accept keyboard input

There'll be a futurama theme if I finish the mechanics in time

I use vim + syntastic + eslint to provide in-editor linting. (if you're curious
about other vim plugins I use, sjmarshy/vim on github!)
