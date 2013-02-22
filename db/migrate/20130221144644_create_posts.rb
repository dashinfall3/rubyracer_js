class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :body, :null => false
      t.string :title, :null => false
      t.integer :author_id, :null => false
      t.timestamps
    end
  end
end
