function Player(initials) { 
  this.initials = initials;
  this.position = 1;
  
  this.updatePosition = function(player) {
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
}

function Game() { 
  this.winner_initials = null;
  this.finish_time = null;
  this.player1 = null;
  this.player2 = null;
  this.id = null;
  this.startTime = null;
  this.endTime = null;
  this.duration = null;
  this.track_length = 15;

  this.board = function() {

  }

  this.checkIfOver = function() {
    if (this.player1.position == this.track_length) {
      this.winner_initials = this.player1.initials;
      $('#game_over').html("Game over. Player 1 wins!!!!");  
      this.endTime = Date.now();
      this.displayDuration();
      this.postWinner();
      // window.setTimeout(game2.reset,2000);
      // game_over(player);
    }
    if (this.player2.position == this.track_length) {
      this.winner_initials = this.player2.initials;
      $('#game_over').html("Game over. Player 2 wins!!!!");
      this.endTime = Date.now();
      this.displayDuration();
      this.postWinner();
      // window.setTimeout(game2.reset, 2000);
      // game_over(player);
    }
    
  }

  this.calculateDuration = function() {
    this.duration = (this.endTime - this.startTime)/1000;
  }

  this.displayDuration = function() {
    this.calculateDuration();
    $('#duration').html('Winning Time: ' + this.duration + " seconds.");
  }

  this.reset = function() {
    $('tr#player1_strip').find('.active').removeClass('active');
    $('tr#player1_strip td:nth-child(1)').addClass('active');
    $('tr#player2_strip').find('.active').removeClass('active');
    $('tr#player2_strip td:nth-child(1)').addClass('active');
    this.player1.position = 1;
    this.player2.position = 1;
  }

  this.postWinner = function() {
    $.ajax({
      type: "POST",
      url: "/game_over/"+ this.id,
      data: { winner_name : this.winner_initials, game_id : this.id, duration : this.duration },
      dataType: "json",
      success: function(response){
        $('#winner').html("Winner: " + response.winner);
        $('#game_id').show();
      }
    })
  }
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

;(function(){
  var game = new Game();
  $(document).ready(function() {    
    $('#player_form').submit(function(event) {
      event.preventDefault();
      createGame();
    });

   var createGame = function() {
      var player1_name = $('#player1_name').val();
      var player2_name = $('#player2_name').val();
      var player1 = new Player(player1_name);
      var player2 = new Player(player2_name);
      game.player1 = player1;
      game.player2 = player2;
      var name_input = {player1 : player1.initials, player2 : player2.initials}
        $.post('games', name_input, function(response) {
          displayGame();
          $('#game_id').html("Link for this game: <a href='games/" + response.game_id + "'>Here</a>")
          game.id = response.game_id
      });
   } 

   var displayGame = function() {
      $('#player_form').hide();
      $('.racer_table').fadeIn('slow');
   }

    $(document).on('keyup', function(event){
      if (game.player1 && game.player2) {
        if (game.startTime == null) {
          game.startTime = Date.now();
        } 
        if (game.player1.position < game.track_length && game.player2.position < game.track_length){
          game.on_keyup(event);
          game.checkIfOver();
        }
      }
    });

  });
})();

// Sample javascript from Shadi
// createGame.init()
// createGame.player1_name
// var createGame = {
//   init: function(player1, player2) {
//     this.player1 = player1;
//     this.player2 = player2;
//   },
//   player1Name: $('#player1_name').val()

// }
