class PostsController < ApplicationController
  def index
  	@posts = Post.where(:category_id => 33).order(:created_at => 'DESC').limit(3)
  	@recent_news = Post.all.order(:created_at => 'DESC').limit(6)
  end

  def show
    @post = Post.find(params[:id])
  end
  
end
