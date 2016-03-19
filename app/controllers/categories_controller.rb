class CategoriesController < ApplicationController
  def show
    @child_categories = Category.where(:parent_id => params[:id])
  end
end
