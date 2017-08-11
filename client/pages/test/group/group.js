
Template.playerGroup.onCreated(function () {
  Meteor.subscribe('player.all');
  Meteor.subscribe('playerGroup.all', {
    onReady() {
      // console.log("onReady And the Items actually Arrive"); 
      $('select').material_select();
    },
  });
});

Template.playerGroup.helpers({
  players() {
    return Player.find({}, { sort: { updateAt: 1 } });
  },
  playerGroups() {
    // return PlayerGroup.findOne({"_id": "ANpWEFdcwdqvT3hGL"});
    return PlayerGroup.find({});
  },
  playerGroupOne() {
    // return PlayerGroup.findOne({"_id": id});
    return Session.get("playerGroupOne")
  },
});

Template.playerGroup.onRendered(function () {
  // // Use the Packery jQuery plugin
  // console.log('onRendered')
  // $('select').material_select();
});

Template.group.helpers({
  thisName(name) {
    return Player.findOne({"_id": name}).name;
  },
});

// you can add events to all Sortable template instances
Template.playerGroup.events({
  'change select'(event, template) {    
    let id = event.currentTarget.value    
    // template.playerGroup.set( playerGroupOne, PlayerGroup.findOne({"_id": id}) )
    Session.set("playerGroupOne", PlayerGroup.findOne({"_id": id}));
    console.log('events',id, Session.get("playerGroupOne"))
  }
});
