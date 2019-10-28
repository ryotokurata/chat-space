class MessagesController < ApplicationController
      
  def index
    @message = Message.find(1)
  end    

end
