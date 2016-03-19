class Post < ActiveRecord::Base
  has_paper_trail
  belongs_to :category

  has_attached_file :thumbnail,
                    :styles => {
                        :thumb => "100x100#",
                        :small  => "150x150>",
                        :medium => "200x200",
                        :large => "300x300>" },
                    default_url: ActionController::Base.helpers.asset_path('no_image.gif')
  validates_attachment_content_type :thumbnail, :content_type => /\Aimage\/.*\Z/
  # add a delete_thumbnail method:
  attr_accessor :delete_thumbnail
  before_validation { self.thumbnail.clear if self.delete_thumbnail == '1' }

  # Config content admin page
  rails_admin do

    edit do
      include_all_fields
      field :thumbnail, :paperclip
      field :category do
        associated_collection_cache_all false
        associated_collection_scope do
          Proc.new { |scope|
            scope = scope.where("parent_id > 0")
          }
        end
      end
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
