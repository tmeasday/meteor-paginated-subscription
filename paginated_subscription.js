PaginatedSubscriptionHandle = function(perPage) {
  this.perPage = perPage;
  this._limit = perPage;
  this._limitListeners = new Deps.Dependency();
  this._loaded = 0;
  this._loadedListeners = new Deps.Dependency();
}

PaginatedSubscriptionHandle.prototype.loaded = function() {
  this._loadedListeners.depend();
  return this._loaded;
}

PaginatedSubscriptionHandle.prototype.limit = function() {
  this._limitListeners.depend();
  return this._limit;
}

PaginatedSubscriptionHandle.prototype.ready = function() {
  return this.loaded() === this.limit();
}

// deprecated
PaginatedSubscriptionHandle.prototype.loading = function() {
  return ! this.ready();
}

PaginatedSubscriptionHandle.prototype.loadNextPage = function() {
  this._limit += this.perPage;
  this._limitListeners.changed();
}

PaginatedSubscriptionHandle.prototype.done = function() {
  this._loaded = this._limit;
  this._loadedListeners.changed();
}

PaginatedSubscriptionHandle.prototype.reset = function() {
  this._limit = this.perPage;
  this._limitListeners.changed();
}


Meteor.subscribeWithPagination = function (/*name, arguments, perPage */) {
  var args = Array.prototype.slice.call(arguments, 0);
  var lastArg = args.pop();
  var perPage, cb;
  if (_.isFunction(lastArg) || _.isObject(lastArg)) {
    cb = lastArg; 
    perPage = args.pop();
  } else {
    perPage = lastArg;
  }
  
  var handle = new PaginatedSubscriptionHandle(perPage);
  
  var argAutorun = Meteor.autorun(function() {
    var ourArgs = _.map(args, function(arg) {
      return _.isFunction(arg) ? arg() : arg;
    });
   
    ourArgs.push(handle.limit());
    cb && ourArgs.push(cb);
    var subHandle = Meteor.subscribe.apply(this, ourArgs);
    
    // whenever the sub becomes ready, we are done. This may happen right away
    // if we are re-subscribing to an already ready subscription.
    Meteor.autorun(function() {
      if (subHandle.ready())
        handle.done();
    });
  });
  
  // this will stop the subHandle, and the done autorun
  handle.stop = _.bind(argAutorun.stop, argAutorun);
  
  return handle;
}
