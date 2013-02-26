class RenameColumns < ActiveRecord::Migration
  def change
    rename_column :users_games, :player_id, :user_id
  end
end

