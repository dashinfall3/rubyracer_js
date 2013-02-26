class Game < ActiveRecord::Base
  has_and_belongs_to_many :users, :join_table => :users_games
  # Remember to create a migration!
end
