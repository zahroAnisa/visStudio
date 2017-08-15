
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
    // return Player.find({}, { sort: { updateAt: 1 } });
    let group = Session.get("playerGroupOne")
    let data = Player.find({ playerGroupId: { $nin: [group._id] }}, { sort: { updateAt: 1 } });

    return data

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
    // console.log('group.events', this, template.data, this.playerGroupId, this.playerId)
    let data = Session.get("playerGroupOne")
    let index = data.playerId.indexOf(this.playerId);    // <-- Not supported in <IE9
    if (index !== -1) {
      data.playerId.splice(index, 1);
    }

    let player = Player.findOne({"_id": this.playerId})
    index = player.playerGroupId.indexOf(this.playerGroupId);    // <-- Not supported in <IE9
    if (index !== -1) {
      player.playerGroupId.splice(index, 1);
    }

    // console.log('group.events', this, template.data, player)
    Meteor.call('playerGroup.update',this.playerGroupId, {playerId: data.playerId}, (err) => {
      // Template.playerGroup.__helpers.get('playerGroupOne').call()
      if(!err) {
        // $("select").change();
        // Session.set("playerGroupOne", data );
        Meteor.call('player.update',this.playerId, {playerGroupId: player.playerGroupId}, (err) => {
          if(!err) {
            Session.set("playerGroupOne", data );
          }
        })
      }
    })
  }
});

Template.player.events({
  'click i'(event, template) {      
    
    let data = Session.get("playerGroupOne")
    if(!data) return 
    let index = data.playerId.indexOf(this._id);   
    if (index === -1) {
      data.playerId.push(this._id)
    }
  
    let player = this
    index = player.playerGroupId.indexOf(data._id);   
    if (index === -1) {
      player.playerGroupId.push(data._id);
    }
    // console.log('player.events', this, data, player)
    Meteor.call('playerGroup.update', data._id, {playerId: data.playerId}, (err) => {
      if(!err) {
        Meteor.call('player.update', this._id, {playerGroupId: player.playerGroupId}, (err) => {
          if(!err) {
            Session.set("playerGroupOne", data );
          }
        })
      }
    })
  }
});
