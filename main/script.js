// Check if user is logged in
if (!sessionStorage.getItem("loggedIn")) {
  alert("Please log in to access the expense tracker.");
  // Use dynamic base URL for GitHub Pages
  const baseUrl = window.location.href.split('/main/')[0];
  window.location.href = baseUrl + "/login/login.html";
}

// Initialize header elements
function initializeHeader() {
  const currentUser = sessionStorage.getItem("currentUser") || "User";
  
  // Set welcome message with user's name
  const welcomeMessage = document.getElementById("welcome-message");
  if (welcomeMessage) {
    welcomeMessage.textContent = `Welcome, ${currentUser}!`;
  }
  
  // Add logout functionality
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      sessionStorage.removeItem("loggedIn");
      sessionStorage.removeItem("currentUser");
      // Use dynamic base URL for GitHub Pages
      const baseUrl = window.location.href.split('/main/')[0];
      window.location.href = baseUrl + "/login/login.html";
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Initialize header with welcome message and logout button
  initializeHeader();
  
  // Use user-specific storage keys
  const currentUser = sessionStorage.getItem("currentUser") || "User";
  const userExpenseKey = `expenses_${currentUser}`;
  const userBudgetKey = `budget_${currentUser}`;
  
  let expenses = JSON.parse(localStorage.getItem(userExpenseKey)) || [];
  let budget = parseFloat(localStorage.getItem(userBudgetKey)) || 0;

  // Add sample data if no expenses exist
  if (expenses.length === 0) {
    console.log('No expenses found, adding sample data');
    expenses = [
      { date: '2023-01-15', category: 'Food', description: 'Groceries', amount: 75.50 },
      { date: '2023-01-20', category: 'Transport', description: 'Gas', amount: 45.00 },
      { date: '2023-01-25', category: 'Bills', description: 'Electricity', amount: 120.75 },
      { date: '2023-01-30', category: 'Other', description: 'Books', amount: 35.25 }
    ];
    localStorage.setItem(userExpenseKey, JSON.stringify(expenses));
  }

  const expenseForm = document.getElementById("expense-form");
  const expenseTableBody = document.querySelector("#expense-table tbody");
  const totalExpenseElement = document.getElementById("total-expense");
  const filterCategory = document.getElementById("filter-category");
  const expenseChartCanvas = document.getElementById("expenseChart");

  let chartInstance = null;

  const updateUI = (filteredExpenses = expenses) => {
    expenseTableBody.innerHTML = "";
    let totalExpense = 0;

    filteredExpenses.forEach((expense, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${expense.date}</td>
        <td>${expense.category}</td>
        <td>${expense.description}</td>
        <td>$${expense.amount.toFixed(2)}</td>
        <td><button class="delete-btn" data-index="${index}">Delete</button></td>
      `;
      expenseTableBody.appendChild(row);
      totalExpense += expense.amount;
    });

    totalExpenseElement.textContent = totalExpense.toFixed(2);

    if (budget > 0 && totalExpense > budget) {
      alert("Warning: You have exceeded your budget!");
    }

    renderChart();
    saveToLocalStorage();
  };

  const saveToLocalStorage = () => {
    localStorage.setItem(userExpenseKey, JSON.stringify(expenses));
    localStorage.setItem(userBudgetKey, budget.toString());
  };

  expenseForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const date = document.getElementById("date").value;
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value);

    if (date && category && description && !isNaN(amount)) {
      expenses.push({ date, category, description, amount });
      updateUI();
      expenseForm.reset();
    } else {
      alert("Please fill out all fields correctly!");
    }
  });

  expenseTableBody.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
      const index = event.target.dataset.index;
      expenses.splice(index, 1);
      updateUI();
    }
  });

  document.getElementById("apply-filters").addEventListener("click", () => {
    const selectedCategory = filterCategory.value;
    const filteredExpenses = expenses.filter(
      (expense) => selectedCategory === "All" || expense.category === selectedCategory
    );
    updateUI(filteredExpenses);
  });

  document.getElementById("set-budget").addEventListener("click", () => {
    budget = parseFloat(prompt("Enter your monthly budget:"));
    if (!isNaN(budget)) alert(`Budget set to $${budget.toFixed(2)}`);
    updateUI();
  });

  document.getElementById("export-csv").addEventListener("click", () => {
    let csvContent = "data:text/csv;charset=utf-8,Date,Category,Description,Amount\n";
    expenses.forEach((expense) => {
      csvContent += `${expense.date},${expense.category},${expense.description},${expense.amount}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  const renderChart = () => {
    console.log('Attempting to render chart...');
    
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
      console.error('Chart.js is not loaded properly');
      return;
    }
    
    // Get the canvas element
    const canvas = document.getElementById('expenseChart');
    if (!canvas) {
      console.error('Canvas element not found');
      return;
    }
    
    // Log canvas dimensions
    console.log('Canvas dimensions:', canvas.width, canvas.height);
    
    // Destroy existing chart if it exists
    if (chartInstance) {
      console.log('Destroying existing chart');
      chartInstance.destroy();
      chartInstance = null;
    }
    
    // Check if there are expenses to display
    if (expenses.length === 0) {
      console.log('No expenses to display');
      return;
    }
    
    // Prepare data for chart
    const categories = [...new Set(expenses.map(e => e.category))];
    const totals = categories.map(cat => 
      expenses.filter(e => e.category === cat).reduce((sum, e) => sum + e.amount, 0)
    );
    
    console.log('Chart data:', { categories, totals });
    
    // Create new chart
    try {
      const ctx = canvas.getContext('2d');
      
      // Try a different chart type
      chartInstance = new Chart(ctx, {
        type: 'bar',  // Using bar instead of pie
        data: {
          labels: categories,
          datasets: [{
            label: 'Expenses by Category',
            data: totals,
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Expense Distribution'
            }
          }
        }
      });
      
      console.log('Chart created successfully');
    } catch (error) {
      console.error('Error creating chart:', error);
    }
  };

  updateUI();
});