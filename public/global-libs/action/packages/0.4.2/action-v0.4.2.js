/****************************************
Action! v0.4.2 Akshay Kumar 
https://github.com/designfrontier/Action 
****************************************/
//TODO routing and pushstate
//  view rendering on routing events
var action = function(){
    'use strict';

    var action = {
        eventMe: function(objectIn){
            var returnObject = objectIn
                , localEvents = {};

            //set an emitter id for troubleshooting
            returnObject.emitterId = Math.ceil(Math.random() * 10000);

            //create the lcoal event Store
            returnObject.eventStore = {};

            returnObject.emit = function(eventNameIn, eventDataIn, localFlag){
                var that = this
                    , eventStack
                    , functionToCall
                    , i
                    , isLocal = (typeof localFlag !== 'undefined' && localFlag);

                if(isLocal){
                    eventStack = that.eventStore[eventNameIn];
                } else {
                    eventStack = action.eventStore[eventNameIn];
                }

                //emit the event
                if(typeof eventStack !== 'undefined'){
                    for(i = 0; i < eventStack.length; i ++){
                        if(typeof eventStack[i].scope !== 'undefined'){
                            eventStack[i].call.apply(eventStack[i].scope,[eventDataIn, that.emitterId]);
                        }else{
                            eventStack[i].call(eventDataIn, that.emitterId);
                        }

                        if(eventStack[i].once){
                            that.silence(eventNameIn, eventStack[i].call, true, isLocal);
                        }
                    }
                }
            };

            returnObject.emitLocal = function(eventNameIn, eventDataIn){
                var that = this;

                that.emit(eventNameIn, eventDataIn, true);
            };

            returnObject.listen = function(eventNameIn, handlerIn, scopeIn, onceIn, localFlagIn){
                var that = this
                    , i
                    , newCheck = true

                    //attribute holders and such
                    , eventName = eventNameIn
                    , handler = handlerIn
                    , scope = scopeIn
                    , local = localFlagIn
                    , once = onceIn

                    //variables for later
                    , eventStack
                    , newEvent;

                if(typeof eventNameIn === 'object'){
                    //we have an object to split up dude
                    eventName = eventNameIn.eventName;
                    handler = eventNameIn.handler;
                    scope = eventNameIn.scope;
                    once = eventNameIn.once;
                    local = eventNameIn.local;
                }

                eventStack = (typeof local !== 'undefined' && local) ? that.eventStore[eventNameIn] : action.eventStore[eventNameIn];
                newEvent = (typeof local !== 'undefined' && local) ? that : action;

                if(typeof eventStack !== 'undefined'){
                    //already exists check to see if the function is already bound

                    for(i = 0; i < eventStack.length; i ++){
                        if(eventStack[i].call === handler && eventStack[i].once === false){
                            newCheck = false;
                            break;
                        }
                    }

                    if(newCheck && typeof scopeIn !== 'undefined'){
                            eventStack.push({once: false, call: handler, scope: scope});
                    }else if(newCheck){
                            eventStack.push({once: false, call:handler});
                    }

                } else {
                    //new event
                    newEvent.eventStore[eventName] = []; //use an array to store functions
                    if(typeof scopeIn !== 'undefined'){
                        newEvent.eventStore[eventName].push({once: false, call: handler, scope: scope});
                    }else{
                        newEvent.eventStore[eventName].push({once: false, call: handler});
                    }
                }
            };

            returnObject.listenLocal = function(eventNameIn, handlerIn, scopeIn, onceIn){
                var that = this;

                //convenience function for local listens
                if(typeof eventNameIn === 'object'){
                    eventNameIn.local = true;
                    that.listen(eventNameIn);
                } else {
                    that.listen({
                        eventName: eventNameIn
                        , handler: handlerIn
                        , scope: scopeIn
                        , once: onceIn
                        , local: true
                    });
                }
            };

            returnObject.listenOnce = function(eventNameIn, handlerIn, scopeIn, localFlagIn){
                //same thing as .listen() but is only triggered once
                var that = this
                    , i
                    , newCheck = true
                    , eventStack
                    , newEvent

                    , eventName = eventNameIn
                    , handler = handlerIn
                    , scope = scopeIn
                    , localFlag = localFlagIn;

                if(typeof eventNameIn === 'object'){
                    eventName = eventNameIn.eventName;
                    handler = eventNameIn.handler;
                    scope = eventNameIn.scope;
                    localFlag = eventNameIn.local;
                }

                if(typeof localFlag !== 'undefined' && localFlag){
                    //make it local!
                    eventStack = that.eventStore[eventName];
                    newEvent = that;
                }else{
                    eventStack = action.eventStore[eventName];
                    newEvent = action;
                }

                if(typeof eventStack !== 'undefined'){
                    //already exists check to see if the function is already bound

                    for(i = 0; i < eventStack.length; i ++){
                        if(eventStack[i].call === handler && eventStack[i].once === true){
                            newCheck = false;
                            break;
                        }
                    }

                    if(newCheck){
                        eventStack.push({once:true, call: handler, scope: scope});
                    }

                } else{
                    //new event
                    newEvent.eventStore[eventNameIn] = []; //use an array to store functions
                    newEvent.eventStore[eventNameIn].push({once:true, call: handler, scope: scope});
                }
            };

            returnObject.listenOnceLocal = function(eventNameIn, handlerIn, scopeIn){
                var that = this;

                //same thing as .listen() but is only triggered once
                if(typeof eventNameIn === 'object'){
                    eventNameIn.local = true;
                    that.listenLocal(eventNameIn);
                }else{
                    that.listenLocal({
                        eventName: eventNameIn
                        , handler: handlerIn
                        , scope: scopeIn
                        , local: true
                    });
                }
            };

            returnObject.silence = function(eventNameIn, handlerIn, onceIn, scopeIn, localFlagIn){
                //localize variables
                var that = this
                    , i
                    , truthy = false
                    , eventName = eventNameIn
                    , handler = handlerIn
                    , once = onceIn
                    , scope = scopeIn
                    , localFlag = localFlagIn
                    , store;

                if(typeof eventNameIn === 'object'){
                    // passed in a collection of params instead of params
                    eventName = eventNameIn.eventName;
                    handler = eventNameIn.handler;
                    once = eventNameIn.once;
                    scope = eventNameIn.scope;
                    localFlag = eventNameIn.local;
                }

                //local or global event store?
                store = (typeof localFlag === 'undefined' || !localFlag) ? action : that;

                if(typeof store.eventStore[eventName] === 'undefined'){
                    //if there is no event with a name... return nothing
                    return;
                }

                //there is an event that matches... proceed
                for(i = 0; i < store.eventStore[eventName].length; i ++){
                    //reset this variable
                    truthy = false;

                    if(typeof handler !== 'undefined'){
                        //function is passed in
                        if(typeof scope !== 'undefined'){
                            //scope is passed in...
                            if(typeof once === 'boolean'){
                                // function + scope + once provides the match
                                truthy = (handler === store.eventStore[eventName][i].call && scope === store.eventStore[eventName][i].scope && once === store.eventStore[eventName][i].once);
                            } else {
                                //function + scope provides the match
                                truthy = (handler === store.eventStore[eventName][i].call && scope === store.eventStore[eventName][i].scope);
                            }
                        } else {
                            //function + once in for the match
                            if(typeof once === 'boolean'){
                                truthy = (handler === store.eventStore[eventName][i].call && store.eventStore[eventName][i].once === once);
                            } else {
                                truthy = (handler === store.eventStore[eventName][i].call);
                            }
                        }
                    } else {
                        //no function unbind everything by resetting
                        store.eventStore[eventName] = [];

                        //and exit
                        break;
                    }

                    if(truthy){
                        //remove this bad boy
                        store.eventStore[eventName].splice(i,1);
                    }

                }
            };

            returnObject.silenceLocal = function(eventNameIn, handlerIn, onceIn, scopeIn){
                var that = this;

                //essentially a convenience function.
                if(typeof eventNameIn === 'object'){
                    eventNameIn.local = true;
                    that.silence(eventNameIn);
                }else{
                    that.silence({
                        eventName: eventNameIn
                        , handler: handlerIn
                        , once: onceIn
                        , scope: scopeIn
                        , local: true
                    });
                }
            };

            //Event Based state machine
            returnObject.requiredEvent = function(name, callback, context, fireMultipleIn){
                var that = this
                    , stateUpdate;

                that._fireMultiple = (typeof fireMultipleIn !== 'undefined') ? fireMultipleIn : false;

                //init some hidden storage if needed
                if(typeof that.stateEvents === 'undefined'){
                    that.stateEvents = {};
                }

                if(typeof that._triggeredStateReady === 'undefined'){
                    that._triggeredStateReady = false;
                }

                that.stateEvents[name] = false;

                stateUpdate = that.stateUpdate(name, that.stateEvents);

                that.listen(name, callback, context);
                that.listen(name, stateUpdate, that);
            };

            returnObject.stateUpdate = function(nameIn, stateEventsIn){
                var name = nameIn
                    , stateEvents = stateEventsIn
                    , that = this;

                return function(){
                    var truthy = true
                        , key;

                    if(typeof stateEvents[name] !== 'undefined'){
                        stateEvents[name] = true;

                        for(key in stateEvents){
                            truthy = truthy && stateEvents[key];
                        }

                        if(truthy){
                            if(!that._triggeredStateReady || that._fireMultiple){
                                //feels like a little bit of a hack.
                                //  lets the data finish propogating before triggering the call
                                setTimeout(that.stateReady.apply(that), 100);
                                that._triggeredStateReady = true;
                            }
                        }
                    }
                };
            };

            returnObject.stateReady = function(){
                //this is a default action when all required events have been completed.
                //  needs to be overridden if you want to do something real
                console.log('ready!');
            };

            returnObject.listen('system:trace', function(emitterIDIn){
                var that = this;

                if(that.emitterId === emitterIDIn){
                    // that.emit('system:addTraced', that);
                    action.traced = that;
                }
            }, returnObject);

            //execute the init function if it exists
            if(typeof returnObject.init === 'function'){
                returnObject.init.apply(returnObject);
            }

            return returnObject;
        }

        , modelMe: function(objectIn){
            //this is the module for creating a data model object
            var that = this
                , newModel = that.eventMe({})
                , attributes = {}
                , changes = [];

            newModel.super = {};

            newModel.get = function(attributeName){
                return attributes[attributeName];
            };

            newModel.set = function(attributeName, attributeValue){
                var that = this
                    , key;

                if(typeof attributeName === 'object'){
                    //well... this is an object... iterate and rock on
                    for(key in attributeName){
                        if(attributeName.hasOwnProperty(key)){
                            //this attribute does not belong to the prototype. Good.
                            if(key !== 'destroy' && key !== 'fetch' && key !== 'save' && typeof attributeName[key] !== 'function'){
                                if(typeof attributeValue === 'object'){
                                    attributes[attributeName] = (Array.isArray(attributeName[key])) ? [] : {};
                                    action.clone(attributes[attributeName], attributeName[key]);
                                }else{
                                    attributes[key] = attributeName[key];
                                }
                                that.emitLocal('attribute:changed', key);
                            } else {
                                if(typeof that[key] === 'function' && !that.super[key]){
                                    //wrap the super version in a closure so that we can
                                    //  still execute it correctly
                                    that.super[key] = that[key].bind(that);
                                }

                                that[key] = attributeName[key];
                            }
                        }
                    }
                } else{
                    if(attributeName !== 'destroy' && attributeName !== 'fetch' && attributeName !== 'save'){
                        if(typeof attributeValue === 'object'){
                            attributes[attributeName] = (Array.isArray(attributeValue)) ? [] : {};
                            action.clone(attributes[attributeName], attributeValue);
                        }else{
                            attributes[attributeName] = attributeValue;
                        }

                        that.emitLocal('attribute:changed', attributeName);
                    } else {
                        if(typeof that[attributeName] === 'function'){
                            //wrap the super version in a closure so that we can
                            //  still execute it correctly
                            that.super[attributeName] = that[attributeName].bind(that);
                        }
                        that[attributeName] = attributeValue;
                    }
                }
            }

            newModel.flatten = function(){
                return attributes;
            }

            newModel.fetch = function(setVariableName, successFunction, errorFunction, flushCache){
                var that = this
                    , requestUrl = that.get('url')
                    , useLocal = action.useLocalCache && !flushCache;

                if(typeof requestUrl !== 'undefined'){
                    //make the request for the model
                    if(useLocal){
                        window.localforage.getItem(window.btoa(that.get('url')), function(data){
                            if(data === null){
                                //this doesn't exist locally...
                                that.ajaxGet(setVariableName, function(dataIn){
                                    var localData = dataIn
                                        , articleId = that.get('url');

                                    window.localforage.setItem(window.btoa(articleId), localData, function(){
                                        // console.log('data done');
                                    });
                                });
                            }else{
                                //it does exist!
                                that.emit(that.get('dataEvent'), data);
                            }
                        });
                    } else {
                        that.ajaxGet(setVariableName, successFunction);
                    }
                } else {
                    that.emit('global:error', new action.Error('http', 'No URL defined', that));
                    if(typeof errorFunction === 'function'){
                        errorFunction.apply(that);
                    }
                }
            };

            newModel.ajaxGet = function(setVariableName, successFunction){
                var that = this
                    , requestUrl = that.get('url')// + '?' + Date.now()

                    , oReq = new XMLHttpRequest();

                oReq.onload = function(){
                            var data = JSON.parse(this.responseText);

                            //TODO: make the statuses more generic
                            if(this.status === 200 || this.status === 302){
                                that.emit(that.get('dataEvent'), data);

                                if(typeof setVariableName === 'string'){
                                    that.set(setVariableName, data);
                                }else{
                                    that.set(data);
                                }

                                if(typeof successFunction === 'function'){
                                    successFunction.apply(that, [data]);
                                }
                            }else if(this.status === 400){

                            }else if(this.status === 500){
                                that.emit('global:error', new action.Error('http', 'Error in request', that));
                            }
                        };

                oReq.onerror = function(xhr, errorType, error){
                            that.emit('global:error', new action.Error('http', 'Error in request type: ' + errorType, that, error));
                        };

                oReq.open('get', requestUrl, true);
                oReq.send();
            };

            newModel.save = function(){
                //TODO make this talk to a server with the URL
                //TODO make it only mark the saved changes clear
                var that = this
                    , requestUrl = that.get('url')
                    , id = that.get('id')
                    , type = (typeof id === 'undefined') ? 'post' : 'put'

                    , oReq = new XMLHttpRequest();

                if(typeof requestUrl !== 'undefined'){
                    oReq.onload = function(){
                        if(this.status === 200 || this.status === 302){
                            that.clearChanges();
                            that.set(data);
                            that.emit(that.get('dataEvent'), data);

                        }else if(this.status === 500 || this.status === 400){
                            that.emit('global:error', new action.Error('http', 'Error in request', that));
                        }
                    };

                    oReq.submittedData = that.flatten();

                    oReq.open(type, requestUrl, true);
                    oReq.send();

                    // $.ajax({
                    //     type: type
                    //     , url: requestUrl + '/' + id
                    //     , data: that.flatten()
                    //     , success: function(data, status){
                    //         //only do this on success...
                    //         that.clearChanges();

                    //         //update the model with stuff from the server
                    //         that.set(data);

                    //         //emit the data event for this model to refresh everyone's values
                    //         that.emit(that.get('dataEvent'), data);
                    //     }
                    //     , error: function(){
                    //         that.emit('global:error', new action.Error('http', 'Error in request', that));
                    //     }
                    // });
                } else {
                    action.emit('global:error', new action.Error('http', 'No URL defined', that));
                }
            }

            newModel.clearChanges = function(){
                changes = [];
            }

            newModel.getChanges = function(){
                return changes;
            }

            newModel.clear = function(){
                attributes = {};
            }

            newModel.destroy = function(){
                //TODO not really working... should get rid of this thing
                //  and all of its parameters
                var that = this
                    , events = that.eventStore
                    , key
                    , i;

                //TODO: make this iterate over the events that have been
                //  registered by this object and silence them
                //  otherwise zombies.

                // for(key in events){
                //     for(i = 0; i < events[key].length; i++){
                //         that.silence(key, events[key][i].call,events[key][i].once)
                //     }
                //     // if(that.hasOwnProperty(key)){
                //     //     delete that[key];
                //     // }
                // }
            }

            newModel.set(objectIn); //set the inital attributes

            newModel.listenLocal('attribute:changed', function(nameIn){
                changes.push(nameIn);
            }, this); //maybe eliminate this 'this'

            if(typeof newModel.init === 'function'){
                newModel.init.apply(newModel);
            }

            return newModel;
        }

        , routeMe: function(objectIn){
            var that = this
                , routeModel = that.modelMe(objectIn)

                , init = function(){
                    var that = this
                        , atags = document.querySelectorAll('a')
                        , i = 0;

                    for(i = 0; i < atags.length; i++){
                        atags[i].addEventListener('click', function(e){
                           var location = this.attributes.href.textContent;

                            if(typeof that.get(location) !== 'undefined'){
                                //trigger the route
                                that.emit('navigate', location);
                                e.preventDefault();
                            }
                        });
                    }
                };

                init();

            return routeModel;
        }

        //TODO: figure out if this is needed since the global:error...
        // , trace: function(emitterIdIn){
        //     //log out the function that has the emitterId attached

        //     //create the traced object/stack
        //     action.traced = action.modelMe({
        //         stack: []
        //         , emitterId: emitterIdIn
        //     });

        //     action.traced.listen('system:addTraced', function(objectIn){
        //         var that = this;

        //         that.get('stack').push(objectIn);
        //     }, action.traced);

        //     //trigger the event that will cause the trace
        //     action.emit('system:trace', emitterIdIn);
        // }

        , Error: function(typeIn, messageIn, objectIn, errorObjectIn){
            return {
                type: typeIn
                , message: messageIn
                , createdBy: objectIn
                , errorObject: errorObjectIn
            }
        }

        , clone: function(objectIn, cloneMe){
            var key;

            for(key in cloneMe){
                if(cloneMe.hasOwnProperty(key)){
                    //good to copy this one...
                    if (typeof cloneMe[key] === 'object'){
                        //set up the object for iteration later
                        objectIn[key] = (Array.isArray(cloneMe[key])) ? [] : {};

                        action.clone(objectIn[key], cloneMe[key]);
                    }else{
                        objectIn[key] = cloneMe[key];
                    }
                }
            }
        }

        , eventStore: {}
    };

    //add an events hook for global dealing with events...
    action = action.eventMe(action);

    action.listen('global:error', function(errorIn) {
        console.group('An Error occured in an object with emitterid: ' + errorIn.createdBy.emitterId);
        console.log('It was a ' + errorIn.type + 'error.');

        if(typeof errorIn.errorObject === 'string'){
            console.log('It says: ' + errorIn.errorObject);
            console.log('and: ' + errorIn.message);
        } else {
            console.log('It says: ' + errorIn.message);
        }

        console.log('The Whole Enchilada (object that caused this mess):');
        console.dir(errorIn.createdBy);

        if(typeof errorIn.createdBy.flatten === 'function'){
            console.log('Just the Lettuce (attributes):');
            console.dir(errorIn.createdBy.flatten());
        }

        if(typeof errorIn.errorObject === 'object'){
            console.log('Oh look an Error Object!:');
            console.dir(errorIn.errorObject);
        }

        console.groupEnd();
        // action.trace(errorIn.createdBy.emitterId);
        // throw errorIn;
    });

    document.addEventListener("DOMContentLoaded", function(){
        action.emit('dom:ready');
    });

    //return the tweaked function
    return action;
}(this);
