get '/' do
  # Look in app/views/index.erb
  erb :index
end

get '/games/:id' do
  @game = Game.find(params[:id])
  @player1 = @game.users.first
  @player2 = @game.users[1]
  @winner = @game.winner if @game.winner_id !=nil
  erb :games
end

post '/games' do
  if params[:previous_game].nil?
    @player1 = User.new(username: params[:player1])
    @player2 = User.new(username: params[:player2])
    if @player1.save && @player2.save
      @game = Game.create
      @game.users << @player1
      @game.users << @player2
      redirect "/games/#{@game.id}"
    else
      erb :index
    end
  else 
    @prev_game = Game.find(params[:previous_game])
    @new_game = Game.create
    @new_game.users << @prev_game.users.first
    @new_game.users << @prev_game.users.last
    redirect "/games/#{@new_game.id}"
  end  
end
    
post '/game_over/:id' do
  content_type :json
  game = Game.find(params[:id])
  params[:winner_id] == "player1" ? winner_id = game.users.first.id : winner_id = game.users.last.id
  completed_at = Time.at(params[:completed_at].to_i)
  game.update_attributes(:winner_id => winner_id, :completed_at => completed_at)
  response = { game: game, time: game.duration, winner: game.winner}.to_json
end

