# metal-playground

[Test it here](demos/webtest.html)
Unfortunately, I could not finish it, the RESULT Pane cold not load metaljs, so the
scripts can not be run.

Probably there is a trick here, but I tried at least 10 different things.

Now I know what the trick is: iframe should be re-created in every change as jotted
do this:
https://github.com/ghinda/jotted/blob/master/src/plugins/render.js
However I wanted to avoid this to not load js frameworks every time.

The samples are loaded from a metal-playground-samples repository.
There is no save function and the result pane is refreshing only when loading a sample.
These can be solved easily, but it is meaningless without running metal js in the iframe,
so I did not bother with it.

Metal's playground

## Setup

1. Install NodeJS >= [v0.12.0](http://nodejs.org/dist/v0.12.0/), if you don't have it yet.

2. Install global dependencies:

  ```
  [sudo] npm install -g gulp
  ```

3. Install local dependencies:

  ```
  npm install
  ```

4. Build the code:

  ```
  gulp build
  ```

5. Open the demo at demos/index.html on your browser.
