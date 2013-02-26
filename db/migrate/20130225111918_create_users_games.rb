class CreateUsersGames < ActiveRecord::Migration
  def change
    create_table :users_games do |t|
      t.integer :player_id
      t.integer :game_id
    end  
  end
end
