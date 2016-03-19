class CategoriesController < ApplicationController
  def show
    @child_categories = Category.where(:active => true, :parent_id => params[:id]).order(:order => 'DESC')
  end

  def posts
    @posts = Post.where(:active => true, :category_id => params[:id]).order(:created_at => 'DESC').page params[:page]
  end
end
