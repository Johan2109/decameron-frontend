# Decameron Hotels Frontend

A responsive and modern **React.js frontend** for the Decameron Hotels Management System. This application allows users to manage hotels, their room configurations, and accommodations with an intuitive interface.

---

## 🚀 Features

- **Hotel Management**:
  - View a list of all hotels.
  - Add, edit, and delete hotels.
- **Room Management**:
  - View all room configurations for a specific hotel.
  - Add and manage rooms dynamically.
- **Dynamic Validation**:
  - Ensure proper accommodations are assigned based on room types.
- **Modern Design**:
  - Clean, consistent, and responsive interface for various screen sizes.

---

## 🛠️ Tech Stack

- **Framework**: React.js
- **HTTP Client**: Axios
- **Styling**: Custom CSS
- **API Integration**: RESTful API from the Laravel backend

---

## ⚙️ Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v22 or later)

### Steps to Set Up

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/decameron-hotels-frontend.git
   cd decameron-hotels-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the API base URL:
   - Open src/api/axios.js.
   - Update the baseURL to point to your backend deployment:
     ```js
     const axiosInstance = axios.create({
       baseURL: "https://your-backend-url.com/api", // Replace with your backend URL
       headers: {
         "Content-Type": "application/json",
         Accept: "application/json",
       },
     });
     ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Open http://localhost:3000 in your browser.

📜 Available Scripts
In the project directory, you can run:

- `npm start`: Runs the app in development mode. Open http://localhost:3000 to view it in your browser.
- `npm run build`: Builds the app for production in the build folder. It bundles React in production mode and optimizes the `build` for the best performance.
