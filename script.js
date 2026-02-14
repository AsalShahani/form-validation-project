
const form = document.getElementById("jobForm");
const requiredFields = form.querySelectorAll("[data-required]");


form.addEventListener( "submit" , function(e){
    e.preventDefault();

    let isFormValid = true;

    requiredFields.forEach(field => {
        const isValid = validateField (field);

        if (!isValid){
            isFormValid = false;
        }
    });
  
    if (isFormValid) {
        showSuccess();
      }
 
});

 

requiredFields.forEach(field => {
   const eventType = field.tagName === "SELECT" ? "change" : "input";
    field.addEventListener(eventType , () => {
        validateField (field)

    });
});



function validateField(field){
  const formGroup = field.closest(".form-group");
  const errorElement = formGroup.querySelector(".error-message");

  if (!errorElement) {
    return true; // safety guard
  }

  if (field.id === "fullName") {
    return validateFullName(field, errorElement);
  }

  if (field.id === "email") {
    return validateEmail(field, errorElement);
  }
  
  if (field.id === "phone") {
  return validatePhone(field, errorElement);
  }
 
  if (field.id === "position") {
  return validateSelect(field, errorElement);
  }
}
 
   
 
function validateFullName(field, errorElement){
  const value = field.value.trim();

  if (value === "") {
    showError(field, errorElement, "Full name is required");
    return false;
  }

  if(value.length < 3){
    showError(field, errorElement, "Full name must be at least 3 characters");
    return false; 
  }
  
  clearError(field, errorElement);
  return true;
}



  
function validateEmail(field , errorElement){
  const value = field.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(value === ""){
   showError(field, errorElement, "Email address is required");
   return false;
  }

  if (!emailRegex.test(value)) {
    showError(field, errorElement, "Please enter a valid email address");
    return false;
  }

  clearError(field, errorElement);
  return true;
  }


 

function validatePhone(field , errorElement){
 const value = field.value.trim();

 if(value === ""){
  showError(field , errorElement , "Phone number is required");
  return false;
 }
  const digitsOnly = value.replace(/\D/g, "");

 if(digitsOnly.length !== value.length){
  showError(field , errorElement , "Phone number must contain only digits");
  return false;
 }

 if(value.length< 10){
  showError(field , errorElement , "Phone number must be at least 10 digits");
  return false;
 }
  clearError(field, errorElement);
  return true;
} 




function validateSelect(field , errorElement){
   const value = field.value.trim();
  if(value === ""){
    showError(field , errorElement , "Please select a position");
    return false;
  }
  clearError(field,errorElement);
  return true;
}



function showError(field, errorElement, message) {
  errorElement.textContent = message;
  errorElement.style.display = "block";
  field.classList.add("is-error");
}


function clearError(field, errorElement) {
  errorElement.textContent = "";
  errorElement.style.display = "none";
  field.classList.remove("is-error");
}



function showSuccess() {
  const successMessage = document.getElementById("successMessage");

  form.style.display = "none";
  successMessage.style.display = "block";
}





