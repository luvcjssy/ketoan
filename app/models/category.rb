class Category < ActiveRecord::Base
  has_paper_trail
  has_many :posts
end
