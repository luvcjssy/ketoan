Paperclip.interpolates(:placeholder) do |post, style|
  ActionController::Base.helpers.asset_path('no_image.gif')
end