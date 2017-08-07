FlowRouter.route('/login', {
  name: 'login',
  action() {
    BlazeLayout.render('App_body', { main: 'login' });
  },
});

