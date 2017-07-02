class ContactMailer < ActionMailer::Base
  default to: 'watson.logan@yahoo.com'
  
  def contcact_email(name, email, body)
    @name= name 
    @email= email
    @body= body
    
    mail(from: email, subject: 'Contact Form Message')
  end
end