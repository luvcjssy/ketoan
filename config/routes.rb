Rails.application.routes.draw do

  resources :news, only: [:index]

  root 'news#index'

end
