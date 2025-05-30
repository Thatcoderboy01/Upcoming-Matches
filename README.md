# Upcoming Soccer Matches Web Application

### Overview

This project is a modern, responsive web application designed to display upcoming soccer (football) matches globally. It features a **React.js** frontend and a **Node.js/Express** backend which securely fetches and serves match data from an external soccer API.

---

![upcoming-matches-three vercel app_(Nest Hub Max)](https://github.com/user-attachments/assets/faa2ee62-27c3-4fe8-a512-5e71bf92ac41)

### Live Demo

[https://upcoming-matches-three.vercel.app/](https://upcoming-matches-three.vercel.app/)

---

### Features

* Displays upcoming soccer matches with dates and kickoff times
* Responsive design compatible with desktops, tablets, and mobiles
* Backend API acts as a proxy to fetch and serve match data securely
* Fast and optimized frontend built with React and Vite
* Deployment-ready with frontend hosted on Vercel and backend on Node.js server

---

### Technologies Used

| Layer        | Technologies                                       |
| ------------ | -------------------------------------------------- |
| Frontend     | React.js, Vite, Tailwind CSS                       |
| Backend      | Node.js, Express.js                                |
| External API | Football-Data.org API (or similar)                 |
| Deployment   | Vercel (frontend), Custom Node.js server (backend) |

---

### Architecture & Workflow

1. **Frontend**: Built with React and Vite, provides a user-friendly interface showing match details.
2. **Backend**: Node.js + Express server acts as a secure proxy to external soccer data API. It manages API keys and fetches data on behalf of the frontend.
3. **External API**: Provides raw data on upcoming soccer fixtures, which the backend processes and returns to the frontend.
4. **Deployment**: Frontend is deployed on Vercel for performance and scalability; backend runs on a Node.js server.

---

### API Details

* The app utilizes a soccer data provider API such as API Used: https://www.scorebat.com/video-api/v3/.
* API key is managed securely on the backend to avoid exposure.
* Provides endpoints for upcoming matches, leagues, and teams data.
* Documentation for API can be found [here](https://www.football-data.org/documentation).

---

### Project Structure

```bash
upcoming-soccer-matches/
├── backend/
│   ├── controllers/
│   │   └── matchController.js        # Handles data fetching logic
│   ├── routes/
│   │   └── matches.js                 # Defines API routes
│   ├── utils/
│   │   └── fetchMatches.js            # Helper to call external API
│   └── server.js                     # Express server setup
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/                # React components
│   │   ├── App.jsx                   # Root component
│   │   ├── main.jsx                  # Entry point
│   └── tailwind.config.js             # Tailwind configuration
├── package.json
└── README.md
```

---

### Setup & Run Locally

**Backend:**

```bash
cd backend
npm install
node server.js
```

Runs backend server on `http://localhost:5000`.

---

**Frontend:**

```bash
cd frontend
npm install
npm run dev
```

Runs frontend on `http://localhost:5173` and fetches data from backend.

---

### Future Enhancements

* Implement filtering options by league, team, or country
* Add live match scores and real-time updates
* Include team logos, player profiles, and statistics
* Dark mode support and improved UI/UX

---

### Author

**Ritesh Ray**

* Email: [riteshray0711@gmail.com](mailto:riteshray0711@gmail.com)
* Portfolio: [https://ritesh-ray.vercel.app/](https://ritesh-ray.vercel.app/)
* GitHub: [Thatcoderboy01](https://github.com/Thatcoderboy01)
* LinkedIn: [Ritesh Ray](https://www.linkedin.com/in/ritesh-ray-682056319/)

---

### License

This project is licensed under the MIT License. Feel free to use and contribute.
