Rails.application.routes.draw do
  resources :news

  root 'news#index'

end
