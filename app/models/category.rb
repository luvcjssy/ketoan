class Category < ActiveRecord::Base
  has_paper_trail
  has_many :posts

  rails_admin do
    edit do
      include_all_fields
      field :parent_id, :enum do
        enum do
          Category.where(:parent_id => 0).map { |c| [c.title, c.id] }
        end

      end
    end
  end

end
