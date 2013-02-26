class Game < ActiveRecord::Base
  has_and_belongs_to_many :users, :join_table => :users_games
  # Remember to create a migration!

  def winner 
    winner_id = self.winner_id
    User.find(winner_id)
  end

  def duration
    self.completed_at ? calculate_time(self.completed_at - self.created_at) : calculate_time(Time.now - self.created_at)
  end

  def complete?
    self.completed_at.nil?
  end
end


private
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
