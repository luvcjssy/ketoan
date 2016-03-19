Rails.application.routes.draw do

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  devise_for :users
  resources :posts, only: [:index, :show]
  get 'intro/index'
  resources :categories, only: [:show] do
    member do
      get 'posts', to: 'categories#posts'
    end
  end

  root 'posts#index'

end
