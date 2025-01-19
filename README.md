# Cloud Notes Frontend

This repository contains the frontend code for the **Cloud Notes** project, a secure and user-friendly note management application. The application allows users to register, log in, and manage their notes effortlessly. The frontend is built using **React.js** and provides an intuitive and responsive interface.

## Features

- **User Registration**
  - Allows new users to sign up with a validated email and password.
- **User Login**
  - Secure login functionality with JWT token-based authentication.
- **Notes Management**
  - Users can create, view, edit, and delete notes from their personal collection.
- **Responsive Design**
  - Optimized for a seamless experience across desktops, tablets, and mobile devices.

## Live Demo

Visit the live application at: [https://cloudn0tes.netlify.app](https://cloudn0tes.netlify.app)

## Technologies Used

- **React.js**: For building the user interface.
- **CSS**: For styling the components.
- **Axios**: For making API calls to the backend.
- **React Router**: For client-side routing.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/): v14 or above
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Getting Started

Follow these steps to set up and run the frontend locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/rsRishuSingh/Frontend_CloudNotes.git
   cd Frontend_CloudNotes
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the Development Server**:
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Access the Application**:
   Open your browser and navigate to `http://localhost:3000` to view the application.

## Configuration

To connect the frontend with the backend, ensure the backend API is running. Update the API base URL in the `src/config.js` file:

```javascript
export const API_BASE_URL = 'https://your-backend-api-url.com';
```

## Folder Structure

```
Frontend_CloudNotes/
├── public/          # Public assets
├── src/             # Source code
│   ├── components/  # Reusable React components
│   ├── pages/       # Application pages (e.g., Home, Login, Signup)
│   ├── utils/       # Utility functions
│   ├── config.js    # Configuration file for API base URL
│   └── App.js       # Main app component
├── package.json     # Project metadata and dependencies
└── README.md        # Project documentation
```

## API Endpoints

The application interacts with the backend via the following endpoints:

- **POST /api/auth/register**: User registration
- **POST /api/auth/login**: User login
- **GET /api/notes**: Fetch all notes
- **POST /api/notes**: Create a new note
- **PUT /api/notes/:id**: Update a note
- **DELETE /api/notes/:id**: Delete a note

## Deployment

The application is deployed on **Netlify**. To deploy your version:

1. Build the application:
   ```bash
   npm run build
   # or
   yarn build
   ```
2. Deploy the `build/` folder to Netlify or any static hosting provider.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Acknowledgments

- [React.js Documentation](https://reactjs.org/docs/)
- [Netlify](https://www.netlify.com/)
- [Express Validator](https://express-validator.github.io/docs/)

---

For backend code, visit: [Backend Repository](https://github.com/rsRishuSingh/Backend_CloudNotes).
