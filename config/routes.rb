Rails.application.routes.draw do

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  devise_for :users
  resources :posts, only: [:index]
  get 'intro/index'
  resources :categories, only: [:show]

  root 'posts#index'

end
