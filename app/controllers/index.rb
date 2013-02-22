get '/' do
  @posts = Post.all
  # Look in app/views/index.erb
  erb :index
end
