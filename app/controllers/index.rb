get '/' do
  # Look in app/views/index.erb
  erb :index
end

get '/games/:id' do
  @game = Game.find(params[:id])
  @player1 = @game.players.first
  @player2 = @game.players[1]
  @winner = @game.winner if @game.winner_id !=nil
  erb :games
end

post '/games' do
  content_type :json
  player1 = User.new(:username => params[:player1]) 
  player2 = User.new(:username => params[:player2]) 
  if player1.save and player2.save
    game = Game.create
    game.players << player1
    game.players << player2
  end
  { game_id: game.id}.to_json
end
    
post '/game_over/:id' do
  content_type :json
  game = Game.find(params[:game_id])
  winner = User.find_by_username(params[:winner_name])
  game.update_attributes(:winner_id => winner.id, :duration => params[:duration])
  response = { winner: winner.username, duration: game.duration }.to_json
end

