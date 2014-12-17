# THIS PACKAGE HAS MOVED

[percolate:paginated-subscription](https://atmospherejs.com/percolate/paginated-subscription)


# Meteor Paginated Subscription

This package is an experiment that adds pagination to Meteor's standard subscriptions. It's a byproduct of the [Telescope project](http://telesc.pe).

## Installation

Install via  [Meteorite](https://github.com/oortcloud/meteorite/):


``` sh
$ mrt add paginated-subscription
```

## Usage

This package makes available a single function `Meteor.subscribeWithPagination`. Like the built in `Meteor.subscribe`, it returns a handle, which should be used to keep track of the state of the subscription:

```js
var handle = Meteor.subscribeWithPagination('posts', 10);
```

The arguments are as usual to `Meteor.subscribe`, with an exception:

1. The last argument must be a number, indicating the number of documents per page.
This can be followed by callback functions in style of `Meteor.subscribe`.

The paginated subscription expects you to have a publication setup, as normal, which expects as a final argument the *current* number of documents to display (which will be incremented, in a infinite scroll fashion):

```js
Meteor.publish('posts', function(limit) {
  return Posts.find({}, {limit: limit});
});
```

The important part of all this is the `handle`, which has the following API:

 - `handle.loaded()` - how many documents are currently loaded via the sub
 - `handle.limit()` - how many have we asked for
 - `handle.ready()` - are we waiting on the server right now?
 - `handle.loadNextPage()` - fetch the next page of results

The first three functions are reactive and thus can be used to correctly display an 'infinite-scroll' like list of results. Please see the [telescope](https://github.com/SachaG/Telescope/blob/master/client/views/posts/posts_list.js) project for an example of real-world usage.

## TODO

Contributions are heavily encouraged. The obvious things to fix are:

1. Do actual "pagination" rather than "infinite scroll" -- i.e. have an option to pass around an offset as well as limit.
2. Tests, tests, tests

Please contact me if you want to have a go at these and I'll be happy to help in what ways I can.

## LICENSE

MIT (c) Tom Coleman
