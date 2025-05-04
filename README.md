# Personal Expense Tracker

A web-based expense tracking application that helps users manage their personal finances, track expenses, and visualize spending patterns.

## 🌟 Features

- **User Authentication**: Secure login and registration system
- **Expense Management**: Add, view, and delete expense records
- **Categorization**: Organize expenses by categories (Food, Transport, Bills, Other)
- **Filtering**: Filter expenses by category
- **Budget Setting**: Set and track monthly budget limits
- **Data Visualization**: View expense distribution in an interactive pie chart
- **Data Export**: Export expense data to CSV format for external analysis
- **Responsive Design**: Works on desktop and mobile devices

## 📋 Usage

### Getting Started

1. Visit the application at [https://Prasaanth02.github.io/mini-project/](https://Prasaanth02.github.io/mini-project/)
2. Register a new account or use the default credentials:
   - Username: prasaanth
   - Password: 12345

### Managing Expenses

1. **Add Expenses**:
   - Fill in the date, category, description, and amount
   - Click "Add Expense" to record the transaction

2. **View Expenses**:
   - All expenses are displayed in a table format
   - The total expense amount is shown at the bottom

3. **Filter Expenses**:
   - Select a category from the dropdown menu
   - Click "Apply Filters" to view expenses in that category

4. **Delete Expenses**:
   - Click the "Delete" button next to any expense to remove it

5. **Set Budget**:
   - Click "Set Budget" to establish a monthly spending limit
   - Receive alerts when expenses exceed your budget

6. **Export Data**:
   - Click "Export to CSV" to download your expense data
   - Use the CSV file with spreadsheet applications for further analysis

## 💻 Technical Details

### Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript
- **Data Visualization**: Chart.js
- **Storage**: Browser's localStorage and sessionStorage
- **Hosting**: GitHub Pages

### Data Storage

- User credentials are stored in the browser's localStorage
- Expense data is stored in localStorage and associated with the logged-in user
- Session information is maintained in sessionStorage

### Security Note

This application stores data locally in your browser. While convenient, please note:

- Data is stored only on the device you use
- Clearing browser data will erase your expense records
- For sensitive financial information, consider backing up your data regularly using the export feature

## 🔧 Development

### Project Structure

```
mini-project/
├── index.html          # Redirect to login page
├── README.md           # Project documentation
├── login/
│   ├── login.html      # Login and registration page
│   ├── login.js        # Authentication logic
│   └── stylel.css      # Login page styles
└── main/
    ├── index.html      # Main application page
    ├── script.js       # Application logic
    └── style.css       # Application styles
```

### Local Development

1. Clone the repository
2. Open the project in your preferred code editor
3. Use a local server (like Live Server extension in VS Code) to run the application
4. Make changes as needed
5. Commit and push changes to update the deployed version

## 📱 Future Enhancements

- Income tracking
- Multiple currency support
- Recurring expense automation
- Data backup and restore functionality
- Dark mode theme
- Advanced reporting and analytics

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

Created by Prasaanth

---

Feel free to contribute to this project by submitting issues or pull requests!