class Api::MessagesController < ApplicationController
  def index
    # binding.pry
    @group = Group.find(params[:group_id]) 
    @messages = @group.messages.includes(:user).where('id > ?', params[:last_id])
  end
end
