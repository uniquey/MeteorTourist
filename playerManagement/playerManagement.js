if(Meteor.isServer){
    Meteor.methods({
    'insertPlayerData': function(playerNameVar){
      var currentUserId = Meteor.userId();
      PlayersList.insert({
        name: playerNameVar,
        score: 0,
        createdBy: currentUserId
      })
    },
    'removePlayer': function(selectedPlayer){
      PlayersList.remove(selectedPlayer);
    },
  })
}

if(Meteor.isClient){
  Template.leaderboard.events({
    //*******点击列表有'player'class的li里的内容时在console中显示其Id
    'click li.player' : function(){
      var playerId = this._id;
      Session.set('selectedPlayer',playerId);
      var selectedPlayer = Session.get('selectedPlayer'); 
      console.log(selectedPlayer);
    },

      //*******点击Id为remove的东西时,从Collection中移除该信息
  'click #remove' : function(){
    var selectedPlayer = Session.get('selectedPlayer');
    Meteor.call('removePlayer',selectedPlayer);
  },
  });

//*******在showSelectedPlayer这个Template中返回选中的Player,
  //以前面的event为前提
Template.leaderboard.showSelectedPlayer = function(){
  var selectedPlayer = Session.get('selectedPlayer');
  return PlayersList.findOne(selectedPlayer);
};

//按type为submit的东西或回车时,在Collection中增加一个新的元素
Template.addPlayerForm.events({
  'submit form': function(theEvent, theTemplate){
    //If an Id needed here, add like this: submit form#Id name
    theEvent.preventDefault();
    var playerNameVar = theTemplate.find('#playerName').value;
    Meteor.call('insertPlayerData',playerNameVar);
  }
});

}