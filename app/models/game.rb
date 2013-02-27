class Game < ActiveRecord::Base
  has_and_belongs_to_many :players, :class_name => 'User', :join_table => :users_games
  # Remember to create a migration!
  def winner 
    winner_id = self.winner_id
    User.find(winner_id)
  end
end
