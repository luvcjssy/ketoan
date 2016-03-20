class CreateJoinTableUserRole < ActiveRecord::Migration
  def change
    create_join_table :users, :roles do |t|
      # t.index [:user_id, :role_id]
      # t.index [:role_id, :user_id]
    end
    sql = "INSERT INTO roles_users VALUES (1,2)"
    ActiveRecord::Base.connection.execute(sql)
  end
end
