if(Meteor.isServer){
  Meteor.methods({  
    'modifyPlayerScore': function(selectedPlayer,scoreValue){
      PlayersList.update(
        {_id: selectedPlayer},
        {$inc: {score: scoreValue}})
        //pay attention that the '$set'or'$inc'must be here ,
          //or the score one will instead the _id:selectedPlayer 
    }
  });
};

if(Meteor.isClient){
  Template.leaderboard.events({
//*******点击列Id为increment的东西时增加1分(score:1)
    'click #increment': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      Meteor.call('modifyPlayerScore', selectedPlayer, 1);
    },
    
    //*********点击Id为decrement的东西时,减去1分
    'click #decrement': function(){
      var selectedPlayer = Session.get('selectedPlayer');
       Meteor.call('modifyPlayerScore', selectedPlayer, -1);
    }
  })
}