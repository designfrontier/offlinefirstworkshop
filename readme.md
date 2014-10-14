# offline first workshop

Welcome to the offline workshop codebase. Here we will be moving through the various branches to see how things work and to build on the code to make really cool things happen. So hang on and get ready to rock and roll.

## Step 1
You have made it to step 1. 

### So what do we have in Step 1?
We have a functioning node app... or we should.
`npm start` is your friend. Run it and you should be up and running on `http://localhost:1337`.

## Step 2
You have made it to step 2.

### So what do we have in Step 2?
A basic tic-tac-toe game. Using some discrete mathmatics to calculate who wins and who loses.

Also events for loose coupling and general awesomeness.

Lots of new files:

1. 

## Step 3
You have made it to step 3. 

### So what do we have in Step 3?
A working build, and some appcache goodness.

run `gulp build` and check it out! You will need to edit one line in the `manifest.appcache` it generates in the `/built` folder. In the `CACHE` `section add /global-libs/action/packages/latest/action.min.js`

Now hitting `/built` even works when you shut off the node server because it is cached by the appcache.

Some new files to check out:

1. /views/built.ejs
1. /gulpfile.js
1. /package.json
1. /public/built/manifest.appcache

## Step 4
You have made it to step 4. Well done grasshopper.
![Well done grasshopper](http://38.media.tumblr.com/tumblr_kzpd7vQ2tr1qa1xnko1_500.gif)

### So what do we have in Step 4?
And now... we are persisting data into the local database in the browser. :-)

Some files to check out:

1. /bower.json
1. /public/scripts/game-keeper/game-keeper.js