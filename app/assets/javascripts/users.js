/* global $, Stripe */
//Document ready.
$(document).on('turbolinks:load'), function(){
  var theForm = $('#pro_form');
  var submitBtn = $('#form-signup-btn');
  //Set Stripe public key.
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
  
  //then user clicks form submit btn.
  submitBtn.click(function(event){
    //prevent default sitation behavior.
    event.preventDefault();
    submitBtn.val("Processing").prop('disabled', true);
    
    
  //Collect the credit card fields
  var ccNum = $('#card_number').val(),
    cvcNum = $('#card_code').val(),
    expMonth = $('#card_month').val(),
    expYear = $('#card_year').val();
    
    //Use Stripejs library to check for errors.
    var error= false;
    
    //Validate card number.
   if(!Stripe.card.validateCardNumber(ccNum)) {
     error = true;
     alert('The credit card number appears to be invalid');
   }
   
    //Validate cvc number.
   if(!Stripe.card.validateCVC(cvcNum)) {
     error = true;
     alert('The cvc number appears to be invalid');
   }
    
     //Validate exp date.
   if(!Stripe.card.validateExpiry(expMonth, expYear)) {
     error = true;
     alert('The expiration date appears to be invalid');
   }
    
    
    
    if(error) {
      //If there are card errors, don't send to Stripe.
      submitBtn.prop('disabled', false).val("Sign up"); 
      } else { 
         //Send the card info to Stripe.
        Stripe.createToken({
          number: ccNum,
          cvc: cvcNum,
          exp_month: expMonth,
          exp_year: expYears
        }, stripeResponseHandler);
      }
    
  
     return false;
    });
    //Stripe will return with a card token.
    function stripeResponseHandler(status, response) {
     //Get the token from the response
       var token =response.id;
       
       //Inject card token into hidden field
       theForm.append($('<input type="hidden" name = "user[stripe_card_token]">' ).val(token));
      
      //Submit form to our Rails app\
      theForm.get(0).submit();
    }
});
 
  