# fuel-eu-maritime-assignment

\# ⚓ FuelEU Maritime Assignment



This project simulates the \*\*FuelEU Maritime system\*\*, which manages vessel routes, calculates GHG (Greenhouse Gas) intensities, and evaluates Compliance Balance (CB) for ships and pooled fleets.



It includes both a \*\*backend (Express + TypeScript)\*\* and a \*\*frontend (React + Vite)\*\* for data visualization and API interaction.



---



\## 📁 Project Structure



fuel-eu-maritime-assignment/

├── backend/ # Express + TypeScript API

│ ├── src/

│ │ ├── adapters/

│ │ │ └── inbound/http/routes/Route.ts

│ │ ├── application/

│ │ ├── domain/

│ │ ├── infrastructure/

│ │ │ └── server/index.ts

│ │ └── prisma.ts

│ └── package.json

│

├── frontend/ # React + TypeScript + Vite UI

│ ├── src/

│ │ ├── App.tsx

│ │ ├── api.ts

│ │ ├── components/

│ │ └── pages/

│ └── package.json

│

└── README.md



yaml





---



\## ⚙️ Backend Setup



\### 1️⃣ Navigate to the backend folder



cd backend

2️⃣ Install dependencies



npm install

3️⃣ (Optional) If using Prisma with PostgreSQL

Create a .env file in the backend folder:





DATABASE\_URL="postgresql://username:password@localhost:5432/fueleu"

If you are not using PostgreSQL, the app still runs fine using mock JSON data.



4️⃣ Run the development server



npm run dev

✅ Server Running: http://localhost:3000

✅ Available Endpoints:



Method	Endpoint	Description

GET	/api/routes	Fetch all vessel routes

POST	/api/pools	Create compliance pool



💻 Frontend Setup

1️⃣ Navigate to the frontend folder



cd frontend

2️⃣ Install dependencies



npm install

3️⃣ Start the React development server



npm run dev

✅ App Running: http://localhost:5173 (or next available port)

✅ The frontend fetches data from the backend API at:



http://localhost:3000/api

🔗 API Example

GET /api/routes

Response:



json

Copy code

\[

&nbsp; {

&nbsp;   "routeId": "R001",

&nbsp;   "vesselType": "Container",

&nbsp;   "fuelType": "HFO",

&nbsp;   "year": 2024,

&nbsp;   "ghgIntensity": 91.0,

&nbsp;   "fuelConsumption": 5000,

&nbsp;   "distance": 12000,

&nbsp;   "totalEmissions": 4500

&nbsp; },

&nbsp; ...

]

POST /api/pools

Request:



json

Copy code

{

&nbsp; "year": 2024,

&nbsp; "members": \[{ "shipId": "S001" }, { "shipId": "S002" }]

}

Response:



json

Copy code

{

&nbsp; "message": "Pool created",

&nbsp; "members": \[...]

}

🧩 Tech Stack

Layer	Technology

Frontend React, TypeScript, Vite

Backend	Node.js, Express, TypeScript

Styling	Tailwind CSS

Optional Database	PostgreSQL with Prisma ORM

API Testing	Postman / Thunder Client



📸 Screenshots

!\[MRT Screenshot](images/mrt1.png)

!\[MRT Screenshot](images/mrt2.png)

!\[MRT Screenshot](images/mrt3.png)







🧠 Key Features

✅ Modular Clean Architecture (Domain, Application, Adapters)

✅ TypeScript on both frontend \& backend

✅ Mock Data for Testing (no DB required)

✅ CORS-enabled RESTful API

✅ Easy setup and local execution



🚀 How to Run Everything

Start backend





cd backend

npm run dev

Start frontend (in a new terminal)





cd frontend

npm run dev

Open browser





http://localhost:5173

You should now see the full FuelEU Maritime Dashboard.



👩‍💻 Author

Harshita Shukla

FuelEU Maritime Assignment 2025



📝 License

This project is created for educational purposes and is not intended for commercial use.

