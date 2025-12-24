🏨 Hotel Management System

Hotel Management System, otel rezervasyonlarını, oda yönetimini ve kullanıcı işlemlerini yöneten full-stack bir web uygulamasıdır.
Proje, React tabanlı frontend ve Node.js + Express tabanlı backend mimarisiyle geliştirilmiştir.

🚀 Özellikler

🏨 Oda listeleme ve oda detaylarını görüntüleme

📅 Rezervasyon oluşturma ve yönetme

👤 Kullanıcı kayıt / giriş sistemi

🔐 JWT tabanlı kimlik doğrulama

🛡️ Yetkilendirme (Admin / User)

📊 Admin paneli ve raporlama

📩 Rezervasyon ve kullanıcı işlemleri için backend API

🔄 Frontend – Backend REST API iletişimi

🛠️ Kullanılan Teknolojiler

--Frontend--

React.js

JavaScript (ES6+)

HTML5

CSS3

Axios

React Context API

--Backend--

Node.js

Express.js

MongoDB

Mongoose

JSON Web Token (JWT)

dotenv


📂 Proje Yapısı

Hotel Management System/
├── front-end/
├── back-end/
└── README.md



Frontend Yapısı

front-end/
├── index.html
├── package.json
├── eslint.config.js
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── App.css
│   ├── index.css
│   │
│   ├── Components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── AvailableRooms.jsx
│   │   ├── RoomDetails.jsx
│   │   ├── MyBookings.jsx
│   │   ├── Report.jsx
│   │   └── NotFound.jsx
│   │
│   ├── api/
│   │   └── axios.jsx
│   │
│   ├── context/
│   │   └── UserContext.jsx
│   │
│   └── assets/
│
└── node_modules/   



Backend Yapısı

back-end/
├── server.js
├── seed.js
├── package.json
├── package-lock.json
├── config/
│   └── db.js
│
├── controllers/
│   ├── adminController.js
│   ├── bookingController.js
│   ├── roomController.js
│   └── userController.js
│
├── routes/
│   ├── adminRoutes.js
│   ├── bookingRoutes.js
│   ├── roomRoutes.js
│   └── userRoutes.js
│
├── middleware/
│   ├── authMiddleware.js
│   ├── errorMiddleware.js
│   └── validationMiddleware.js
│
├── models/
│   ├── Booking.js
│   ├── Room.js
│   └── User.js
│
├── utils/
│   ├── emailUtils.js
│   ├── jwtUtils.js
│   └── reservationUtils.js
│
└── node_modules/   


Kurulum ve Çalıştırma

Backend

-cd back-end

-npm install

-npm start

Frontend

- cd front-end

- npm install
  
- npm run dev
