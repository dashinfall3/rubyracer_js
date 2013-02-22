get '/post/:id' do
  @post = Post.find(params[:id])
  erb :post
end

post '/post' do
  new_post = Post.create(params[:post])
  puts params[:post]
  tags = params[:tags]
  tags = tags.split(' ')
  tags.each do |tag|
    if Tag.find_by_name(tag)
      p tag.inspect
      puts "hey it made it"
      new_tag = Tag.find_by_name(tag)
      puts new_tag.inspect
    else 
      p tag.inspect
      new_tag = Tag.create :name => tag    
    end
    PostTag.create :tag_id => new_tag.id, :post_id => new_post.id
  end
  redirect to '/'
end

get '/post/:id/edit' do
  puts params[:id]
  @post = Post.find(params[:id])  
  erb :edit
end

post '/post/:id/edit' do
  @post = Post.find(params[:id])
  @post.update_attributes(params[:post])
  erb :edit
end

post '/post/:id/delete' do
  post = Post.find(params[:id])
  post.post_tags.destroy_all
  post.destroy
  redirect to '/'
end
