PlayersList = new Meteor.Collection('players')

if(Meteor.isClient){
  Template.leaderboard.player = function(){
    return PlayersList.find({},{sort:{score: -1}});
    //'-1'here means to sort in descending order-
    //meaning from the highest number to the lowest
    //or from Z to A 
  };
  Template.leaderboard.events({
    'click li.player' : function(){
      var playerId = this._id;
      Session.set('selectedPlayer',playerId);
      var selectedPlayer = Session.get('selectedPlayer'); 
      console.log(selectedPlayer);
    },
    'click #increment': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      PlayersList.update(
        {_id: selectedPlayer},
        {$inc: {score:1}}
        //pay attention that the '$set'or'$inc'must be here ,
        //or the score one will instead the _id:selectedPlayer 
      );
    }
  });
  Template.leaderboard.selectedClass = function(){
    var selectedPlayer = Session.get('selectedPlayer');
    var playerId = this._id;
    if(selectedPlayer === playerId){
      return 'selected';
    }
  }
}