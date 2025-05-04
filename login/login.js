document.addEventListener('DOMContentLoaded', () => {
  // Tab switching functionality
  const loginTab = document.getElementById('login-tab');
  const signupTab = document.getElementById('signup-tab');
  const loginFormContainer = document.getElementById('login-form-container');
  const signupFormContainer = document.getElementById('signup-form-container');
  
  // Set default username and password if not already stored
  if (!localStorage.getItem("users")) {
    const defaultUsers = [
      { username: "prasaanth", email: "prasaanth@example.com", password: "12345" }
    ];
    localStorage.setItem("users", JSON.stringify(defaultUsers));
  }
  
  // Switch between login and signup tabs
  loginTab.addEventListener('click', () => {
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
    loginFormContainer.classList.add('active');
    signupFormContainer.classList.remove('active');
  });
  
  signupTab.addEventListener('click', () => {
    signupTab.classList.add('active');
    loginTab.classList.remove('active');
    signupFormContainer.classList.add('active');
    loginFormContainer.classList.remove('active');
  });
  
  // Login form submission
  const loginForm = document.getElementById('login-form');
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    
    // Find user
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      // Set session
      sessionStorage.setItem("loggedIn", "true");
      sessionStorage.setItem("currentUser", username);
      
      // Redirect to main page - using absolute path for GitHub Pages
      const baseUrl = window.location.href.split('/login/')[0];
      window.location.href = baseUrl + "/main/index.html";
    } else {
      // Show error
      showError(loginForm, "Invalid username or password");
    }
  });
  
  // Signup form submission
  const signupForm = document.getElementById('signup-form');
  signupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const username = document.getElementById('signup-username').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value.trim();
    const confirmPassword = document.getElementById('signup-confirm-password').value.trim();
    
    // Validate form
    if (password !== confirmPassword) {
      showError(signupForm, "Passwords do not match");
      return;
    }
    
    // Get existing users
    const users = JSON.parse(localStorage.getItem("users")) || [];
    
    // Check if username already exists
    if (users.some(user => user.username === username)) {
      showError(signupForm, "Username already exists");
      return;
    }
    
    // Add new user
    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    
    // Show success message
    showSuccess(signupForm, "Account created successfully! You can now log in.");
    
    // Clear form
    signupForm.reset();
    
    // Switch to login tab
    setTimeout(() => {
      loginTab.click();
    }, 2000);
  });
  
  // Helper functions
  function showError(form, message) {
    // Remove any existing error messages
    const existingError = form.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }
    
    // Create and append error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    form.appendChild(errorDiv);
    
    // Remove error after 3 seconds
    setTimeout(() => {
      errorDiv.remove();
    }, 3000);
  }
  
  function showSuccess(form, message) {
    // Remove any existing messages
    const existingMessage = form.querySelector('.success-message');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    // Create and append success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    form.appendChild(successDiv);
    
    // Remove message after 3 seconds
    setTimeout(() => {
      successDiv.remove();
    }, 3000);
  }
});