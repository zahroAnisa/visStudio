var testRoutes = FlowRouter.group({
  prefix: '/test',
  name: 'test',
  triggersEnter: [function(context, redirect) {
    // console.log('running group triggers');
  }]
});

// handling /test route
testRoutes.route('/', {
  action: function() {
    BlazeLayout.render('App_body', { main: 'test' });
  },
  triggersEnter: [function(context, redirect) {
    // console.log('running /test trigger');
  }]
});

testRoutes.route('/login', {
  action: function() {
    BlazeLayout.render('App_body', { main: 'login' });
  },
});

