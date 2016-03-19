class Category < ActiveRecord::Base
  has_paper_trail
  has_many :posts

  rails_admin do
    edit do
      include_all_fields
      field :parent_id, :enum do
        enum do
          parent_category = Category.where(:parent_id => [0, nil]).map { |c| [c.title, c.id] }
          parent_category.insert(0,'Parent Category')
        end
      end
    end
  end

end
