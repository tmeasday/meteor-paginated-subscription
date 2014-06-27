Package.describe({
  summary: "A paginated subscription; views a subset of a subscription",
  version: "0.2.2",
  githubUrl: "https://github.com/tmeasday/meteor-paginated-subscription.git"
});

Package.on_use(function(api) {
  api.add_files('paginated_subscrition.js', 'client');
});
