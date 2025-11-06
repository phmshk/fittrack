# FitTrack: A Modern Nutrition & Calorie Tracker

FitTrack is a web application designed to help users track their daily food intake, monitor calories and macronutrients, and achieve their fitness goals. This project is inspired by popular apps like Lifesum and MyFitnessPal and is built as a portfolio piece to showcase modern frontend development practices.

**[\[ ➡️ Live Demo \]](https://fittrack-app-rt2cp.ondigitalocean.app/)**

---

### 🔑 Demo Credentials

To explore the app, you can use the test account:

- **Email:** `test@example.com`
- **Password:** `password123`

---

## ✨ Key Features

- **Daily Calorie Tracking:** Easily log meals and see a real-time summary of your daily consumption.
- **Macronutrient Monitoring:** Keep track of your protein, carbohydrate, and fat intake against your personal goals.
- **Comprehensive Food Diary:** View your meal history by day, organized into categories like breakfast, lunch, dinner, and snacks.
- **Full Backend Simulation:** Uses **Mock Service Worker (MSW)** to intercept all API calls. This provides a complete, interactive demo (login, registration, adding/editing data) without requiring a live database.
- **Extensive Food Database:** Search for food items to add them to your diary (using a mock API).
- **Personalized Goals:** Set and manage your own goals for weight, daily calorie intake, and macros.
- **Progress Visualization:** Interactive charts and graphs to visualize your progress over time.
- **Responsive Design:** A clean, accessible, and mobile-first user interface.

## 🛠️ Technology Stack

This project is built with a modern, type-safe, and scalable technology stack, chosen to optimize developer experience and application performance.

- **Framework:** [React](https://reactjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed, accessible components.
- **Routing:** [TanStack Router](https://tanstack.com/router/) - A fully type-safe router with a file-based routing paradigm.
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/) - A small, fast, and scalable state-management solution.
- **Server State Management:** [TanStack Query](https://tanstack.com/query/) - Powerful asynchronous state management, server-state utilities and data fetching.
- **API Mocking:** [Mock Service Worker (MSW)](https://mswjs.io/) - For developing and demonstrating features independent of a live backend.

## 📂 Project Structure

The codebase is organized following the **Feature-Sliced Design (FSD)** methodology. This architectural pattern helps in maintaining a clean, scalable, and well-structured application by dividing the code into layers and slices.

- **`app`**: Global configurations, styles, and providers (e.g., router setup).
- **`pages`**: The entry points for specific routes, composed of features and widgets.
- **`features`**: Chunks of business logic that provide value to the user (e.g., `addFood, updateUserGoal`).
- **`widgets`**: Large self-contained chunks of functionality or UI.
- **`entities`**: Business-critical entities (e.g., `user`, `product`).
- **`shared`**: Reusable, framework-agnostic code used across the application (e.g., UI components, API clients, utility functions).
- **`mocks`**: Although it is not part of FSD, I decided to separate all mocking logic to a separate directory.

This structure makes the project easy to navigate, maintain, and scale.

## 🚀 Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/phmshk/fittrack.git
    cd fittrack
    ```

2.  **Install dependencies:**
    This project uses `npm` as the package manager.

    ```bash
    npm install
    ```

3.  **Run the development server:**
    This will start the Vite development server, typically on `http://localhost:5173`.
    ```bash
    npm run dev
    ```

The application should now be running in your browser!

_This project was created for portfolio purposes. Feel free to explore the code and get in touch!_
