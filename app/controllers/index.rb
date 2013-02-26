get '/' do
  # Look in app/views/index.erb
  erb :index
end

get '/games/:id' do
  @game = Game.find(params[:id])
  @player1 = @game.users.first
  @player2 = @game.users[1]
  p @game.completed_at

  if @game.completed_at == nil
    erb :games
  else
    erb :games
  end
end

post '/games' do
  puts params
  puts '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>'
  @player1 = User.new(username: params[:player1])
  @player2 = User.new(username: params[:player2])
  players = [@player1, @player2] 
  if players.length < 2
    puts "not enough players!"
    redirect '/'  
  end  
  if @player1.save && @player2.save
    @game = Game.create
    @game.users << @player1
    @game.users << @player2
    redirect "/games/#{@game.id}"
  else
    erb :index
  end
end

def calculate_time(seconds)
  p seconds.inspect
  if seconds < 60
    "You finished in #{seconds.to_i} seconds"
  elsif 60 <= seconds && seconds < 3600
    "You finished in #{seconds.to_i/60} minutes"
  elsif 3600 <= seconds && seconds < 86400
    "You finished in #{seconds.to_i/60/60} hours"
  end
end

post '/game_over/:id' do
  content_type :json
  game = Game.find(params[:id])
  params[:winner] == "player1" ? winner_id = game.users.first.id : winner_id = game.users.last.id
  winner = User.find(winner_id)
  completed_at = Time.at(params[:completed_at].to_i)
  game.update_attributes(:winner_id => winner_id, :completed_at => completed_at)

  timelapsed = calculate_time(game.completed_at - game.created_at)
  response = { game: game, time: timelapsed, winner: winner}.to_json
end

