class User < ActiveRecord::Base
  has_and_belongs_to_many :games, :join_table => :users_games
  # Remember to create a migration!
  validates :username, :uniqueness => true
end
