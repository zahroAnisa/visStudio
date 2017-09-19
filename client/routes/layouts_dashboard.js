FlowRouter.route('/layouts_dashboard', {
  name: 'App.layouts_dashboard',
  action() {
    BlazeLayout.render('layouts_dashboard', { main: 'main' });
  },
});