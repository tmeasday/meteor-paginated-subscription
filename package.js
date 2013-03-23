Package.describe({
  summary: "A paginated subscription; views a subset of a subscription."
});

Package.on_use(function (api, where) {
  api.add_files('paginated_subscription.js', 'client');
});
