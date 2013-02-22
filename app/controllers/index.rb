get '/' do
  @posts = Post.all
  @posts = Post.paginate(:page => params[:page], :per_page => 5)
  # Look in app/views/index.erb
  erb :index
end
