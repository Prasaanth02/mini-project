document.getElementById("login-form").addEventListener("submit", function(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  
  const storedUser = localStorage.getItem("user");
  const storedPass = localStorage.getItem("pass");
  
  if (!storedUser || !storedPass) {
    localStorage.setItem("user", username);
    localStorage.setItem("pass", password);
    alert("Account created successfully! Please log in again.");
  } else if (username === storedUser && password === storedPass) {
    sessionStorage.setItem("loggedIn", "true");
    window.location.href = "expense_tracker.html";
  } else {
    alert("Invalid username or password!");
  }
});
