# Flappy Bird Clone

plan is to produce a flappy bird clone in React using some ES6 concepts where
possible.

I'll be using a single data-structure for application state provided by baobab.

I'll be refreshing app state on every new animation frame, Baobab ensures that
the React component is notified whenever a change is made.

Styling will be done from within React, to give the concept of packaging a
component with it's associated style a go.

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
