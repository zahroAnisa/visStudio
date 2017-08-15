
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
    Session.set("playerGroupOne", PlayerGroup.findOne({"_id": id}));
    // console.log('events',id, Session.get("playerGroupOne"))
  }
});

Template.group.events({
  'click i'(event, template) {   
    console.log('group.events', this, template.data, this.playerGroupId, this.playerId)
    Meteor.call('playerGroup.update',this.playerGroupId, this.playerId, (err) => {

    })
  }
});
