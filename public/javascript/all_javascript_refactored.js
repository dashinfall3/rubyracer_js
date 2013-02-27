function Player(initials) { 
  this.initials = initials;
  this.position = 1;
  alert('Person instantiated');
}

Player.prototype.updatePosition = function(player) {
  this.position = this.position + 1
  if (player == 'player_1') {
    $('tr#player1_strip').find('.active').removeClass('active');
    $('tr#player1_strip td:nth-child(' + this.position + ')').addClass('active');
    // win_racer(player);
  } else {
    $('tr#player2_strip').find('.active').removeClass('active');
    $('tr#player2_strip td:nth-child(' + this.position + ')').addClass('active');
    // win_racer(player);
  }
}

function Game(players) { 
  this.winner_initials = null;
  this.finish_time = null;
  this.player1 = players[0];
  this.player2 = players[1];
  this.track_length = 15;
}

Game.prototype.checkIfOver = function(player) {
  if ($('tr#player1_strip').find('.active').index() == this.track_length - 1) {
    this.winner_initials = this.player1.initials
    $('#game_over').html("Game over. Play again! Player 1 wins!!!!")
    // window.setTimeout(game2.reset,2000);
    // game_over(player);
  }
  if ($('tr#player2_strip').find('.active').index() == this.track_length - 1) {
    this.winner_initials = this.player1.initials
    $('#game_over').html("Game over. Play again! Player 2 wins!!!!")
    // window.setTimeout(game2.reset, 2000);
    // game_over(player);
  }
}

Game.prototype.reset = function() {
  $('tr#player1_strip').find('.active').removeClass('active');
  $('tr#player1_strip td:nth-child(1)').addClass('active');
  $('tr#player2_strip').find('.active').removeClass('active');
  $('tr#player2_strip td:nth-child(1)').addClass('active');
  alert(this);
  this.player1.position = 1;
  this.player2.position = 1;
}

Game.prototype.on_keyup = function(event) {
  var key_pressed = String.fromCharCode(event.keyCode);
  var key_press1 = key_pressed.match(/P/);
  var key_press2 = key_pressed.match(/W/);
  if (key_press1 != null) {
    this.player1.updatePosition('player_1');
  }
  if (key_press2 != null ) {
    this.player2.updatePosition('player_2');
  } 
};

// Driver javascript
$(document).ready(function() {
  $('#player_form').submit(function(event) {
    event.preventDefault();
    var player1_name = $('#player1_name').val();
    var player2_name = $('#player2_name').val();
    var player1 = new Player(player1_name);
    var player2 = new Player(player2_name);
    
    var game = new Game([player1, player2]);
    debugger
    // get new page!!! game page
  });
  // alert(game.player1.initials);
  // alert(game.player2.initials);

  $(document).on('keyup', function(event){
    if (game.player1.position < game.track_length && game.player2.position < game.track_length){
      game.on_keyup(event);
      game.checkIfOver();
    }
  });

});


  // function updatePlayerPosition = function() {  
  //   if (player == 'player1' && position != 16) {
  //     $('tr#player1_strip').find('.active').removeClass('active');
  //     $('tr#player1_strip td:nth-child(' + position + ')').addClass('active');
  //     win_racer(player);
  //   } else if (player=='player2' && position != 16) {
  //     $('tr#player2_strip').find('.active').removeClass('active');
  //     $('tr#player2_strip td:nth-child(' + position + ')').addClass('active');
  //     win_racer(player);
  //   }

  // }






  // function game_over(player) {
  //   var current_time = +new Date() / 1000;
  //   var winner_id = player;
  //   var gameID = $('#wahoo').html();
  //   userInput = {"completed_at" : current_time, "winner_id": winner_id}
  //   $.post('/game_over/' + gameID, userInput, function(response){
  //     $('#game_id').html(response['game']['game']['id']);
  //     $('#duration').html(response['time']);
  //     $('#winner').html(response['winner']['user']['username']);
  //     $('table.racer_table').hide();
  //   });
  // }
