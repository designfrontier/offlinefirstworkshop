#Action!
`Action!` is a front end sub/pub based framework for event based development. No more passing around dependencies, no more worrying about timing. Events free you to build apps that function they way the real world does: cause and effect.

Need data? Ask for it. Need to do something with that data? Listen for when it is sent back to you and do it. Need to watch for the user to do something? Listen for it and react accordingly. `Action!` embraces the asynchronicity that is the world around us to create better front end experiences and code.


##Road Map
So there are a variety of things that need to be completed for Action! to be ready for primetime. Some of them are basic (getting statemachine working), others are more complex (build tooling for troubleshooting event stacks). I am going to keep them here and make this a living document.

###TODOs before RC
0. make the destroy function silence all events registered by the object it is called on
0. dependency resolution integration with state machines
0. Figure out the testing side of event driven FED in Action
0. Revise the destroy function to make it really do what it needs to
0. Figure out how views really work... (https://github.com/twitter/hogan.js)

###TODOs generally
0. create a prod branch and a debug branch (prod probably doesn't need the extra weight of the call stack and emitterid stuff)?
0. update documentation
0. example app
0. make the error output even prettier! https://developers.google.com/chrome-developer-tools/docs/console-api#consoleerrorobject_object

###Done
0. Tooling for troubleshooting events
0. Add events into the error handler
0. state machine support
0. Add emitter IDs to every time an event gets emitted for debugging work
0. Clone/ Deep Copy in the set functions
0. Build out the save function for models
0. ajax resolution/integration for models
0. Consider web components (considered... and moved on for now)
0. simplify model set function?

#### Release Names
We'll use these folks as release names: http://en.wikipedia.org/wiki/List_of_action_film_actors

in order from top left - down the column then on to the next column. If we run out we'll add more names to the list :-)

##Documentation
###Browser Support
0. IE 9+
0. Chrome
0. Firefox
0. Opera?

###Dependencies
There are a few dependencies for Action to be a fully useful framework. They are (with the reasons for them):
0. localForage (If you want to use the local cache. It will automatically cache all of your ajax GET requests in local storage and pull from them all subsequent times they are requested)
0. Handlebars, or compatible (a templating library)
