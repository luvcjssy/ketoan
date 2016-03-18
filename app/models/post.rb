class Post < ActiveRecord::Base
  has_paper_trail
  belongs_to :category

  rails_admin do
    edit do
      include_all_fields
      field :description, :text
      field :content, :froala
    end
  end
end
