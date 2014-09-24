Package.describe({
  name: 'tmeasday:paginated-subscription',
  summary: "A paginated subscription; views a subset of a subscription",
  version: "0.2.4",
  githubUrl: "https://github.com/tmeasday/meteor-paginated-subscription.git"
});

Package.on_use(function(api) {
  api.addFiles('paginated_subscription.js', 'client');
});
