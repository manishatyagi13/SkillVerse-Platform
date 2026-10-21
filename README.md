\# SkillVerse — Learn Skills. Build Your Future.



SkillVerse is a full-stack web application designed to help learners explore skills and learning opportunities through a modern, user-friendly interface.



\## ✨ Features



\- Modern and responsive user interface

\- Explore learning opportunities

\- Login and sign-up interface

\- Learning Paths section

\- Dedicated About section

\- React-based frontend

\- Backend API built with Node.js and Express

\- MongoDB integration for database connectivity

\- Environment variables for configuration



\## 🛠️ Tech Stack



\*\*Frontend\*\*

\- React.js

\- Vite

\- HTML5

\- CSS3

\- JavaScript



\*\*Backend\*\*

\- Node.js

\- Express.js

\- MongoDB

\- Mongoose



\*\*Tools\*\*

\- Git and GitHub

\- Visual Studio Code

\- npm



\## 📁 Project Structure



```text

SkillVerse/

├── client/          # React frontend

├── server/          # Node.js and Express backend

├── .gitignore

└── README.md

```



\## 🚀 Getting Started



\### Prerequisites



Install the following:

\- Node.js and npm

\- MongoDB Atlas account or a MongoDB instance

\- Git



\### 1. Clone the Repository



```bash

git clone https://github.com/manishatyagi13/SkillVerse-Platform.git

cd SkillVerse-Platform

```



\### 2. Start the Frontend



```bash

cd client

npm install

npm run dev

```



Open the local URL shown in your terminal, usually `http://localhost:5173`.



\### 3. Configure the Backend



Open another terminal:



```bash

cd server

npm install

```



Create a `.env` file inside the `server` folder and configure your own values:



```env

PORT=5000

CLIENT\_URL=http://localhost:5173

MONGODB\_URI=your\_mongodb\_connection\_string

JWT\_SECRET=your\_secret\_key

```



\*\*Important:\*\* Replace the example values with your own configuration. Never commit your `.env` file or expose your database password.



\### 4. Start the Backend



```bash

cd server

node server.js

```



The backend requires a valid MongoDB connection if database connectivity is enabled in the application.



\## 🎯 Project Goal



The goal of SkillVerse is to provide a foundation for a learning platform where users can discover skills and learning paths through a clean and accessible web experience.



\## 🔮 Future Enhancements



\- Complete user authentication

\- Personalized learning dashboards

\- Course enrollment and progress tracking

\- Skill recommendations

\- User profiles and saved learning paths



\## 👩‍💻 Author



\*\*Manisha Tyagi\*\*



GitHub: \[@manishatyagi13](https://github.com/manishatyagi13)



\## 📄 License



This project is available for educational and portfolio purposes. A formal license can be added if required.



