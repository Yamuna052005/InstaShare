# Insta Share

Insta Share is an Instagram Clone web application built using React.js.  
The application allows users to authenticate, view stories and posts, search posts, like and unlike posts, and view user profiles.

## Features

- User authentication with JWT
- Protected routes
- Login with username and password
- Display user stories
- Open and view stories
- Display Instagram posts
- Like and unlike posts
- Display post captions
- Navigate to user profiles
- Search posts
- View My Profile
- View other users' profiles
- API failure handling with retry option
- Search-not-found view
- Page-not-found view
- Responsive design for mobile, tablet, and desktop

## Technologies Used

- React.js
- JavaScript
- React Router
- React Hooks
- REST APIs
- CSS
- React Icons
- js-cookie

## React Concepts Used

This project demonstrates the following React concepts:

- Functional Components
- `useState`
- `useEffect`
- `useParams`
- `useNavigate`
- Conditional Rendering
- Event Handling
- API Integration
- Authentication
- Protected Routes
- Responsive Design

## Project Structure

```text
src/
│
├── components/
│   │
│   ├── CommentSection/
│   │   ├── index.js
│   │   └── index.css
│   │
│   ├── FailureView/
│   │   ├── index.js
│   │   └── index.css
│   │
│   ├── Header/
│   │   ├── index.js
│   │   └── index.css
│   │
│   ├── Home/
│   │   ├── index.js
│   │   └── index.css
│   │
│   ├── LoginForm/
│   │   ├── index.js
│   │   └── index.css
│   │
│   ├── MyProfile/
│   │   ├── index.js
│   │   └── index.css
│   │
│   ├── NotFound/
│   │   ├── index.js
│   │   └── index.css
│   │
│   ├── Post/
│   │   ├── index.js
│   │   └── index.css
│   │
│   ├── PostActions/
│   │   ├── index.js
│   │   └── index.css
│   │
│   ├── PostsList/
│   │   ├── index.js
│   │   └── index.css
│   │
│   ├── Profile/
│   │   ├── index.js
│   │   └── index.css
│   │
│   ├── ProtectedRoute/
│   │   └── index.js
│   │
│   ├── UserDetails/
│   │   ├── index.js
│   │   └── index.css
│   │
│   ├── UserStories/
│   │   ├── index.js
│   │   └── index.css
│   │
│   ├── UserStoriesModal/
│   │   ├── index.js
│   │   └── index.css
│   │
│   └── UserStory/
│       ├── index.js
│       └── index.css
│
├── App.jsx
├── App.css
└── index.js
