class Post < ActiveRecord::Base
  has_paper_trail
  belongs_to :category

  rails_admin do

    edit do
      include_all_fields
      field :description, :text
      field :content, :froala
    end

    show do
      include_all_fields
      field :content do
        pretty_value do
          value.html_safe
        end
      end
    end
  end
end
