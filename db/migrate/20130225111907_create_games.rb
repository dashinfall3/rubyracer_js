class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.integer :winner_id
      t.datetime :completed_at
      t.timestamps
    end  
  end
end
