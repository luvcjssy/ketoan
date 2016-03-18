class CreateCategories < ActiveRecord::Migration
  def change
    create_table :categories do |t|
      t.string :title
      t.integer :order
      t.boolean :active, :default => true
      t.integer :parent_id, :default => 0

      t.timestamps null: false
    end
  end
end
