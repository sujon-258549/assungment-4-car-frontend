# 🚗 CrShop - Car E-Commerce Platform

A full-stack car marketplace designed for a seamless experience in browsing, purchasing, and managing vehicle listings.

---

## 🔗 Live Demo & Repositories

- 🌐 **Live Demo:** [CrShop on Vercel](https://car-shop-one-indol.vercel.app/)
- 💻 **Frontend Repository:** [GitHub - Frontend](https://github.com/sujon-258549/assungment-4-car-frontend.git)
- 🖥️ **Backend Repository:** [GitHub - Backend](https://github.com/sujon-258549/level-2-assignment-2.git)

---

## ✨ Core Features

| Feature | Description |
|--------|-------------|
| 🔐 **User Authentication** | Secure JWT-based login and registration |
| 🚘 **Car Listings** | Browse and filter vehicles by brand, price, and mileage |
| 🛒 **Shopping Cart** | Save favorites and prepare for checkout |
| 🛠️ **Admin Dashboard** | Admins can manage cars, users, and orders |
| 📱 **Responsive Design** | Fully responsive, mobile-first user interface |

---

## 🛠️ Technologies Used

| Layer      | Technology              | Version / Stack |
|------------|--------------------------|------------------|
| **Frontend** | React.js                | v18+             |
|            | Tailwind CSS             | v3+              |
|            | Redux Toolkit            | -                |
| **Backend**  | Node.js                 | v18+             |
|            | Express.js               | v4.18+           |
|            | MongoDB + Mongoose       | -                |
| **Other Tools** | Cloudinary (Image Hosting) | -          |
|            | JWT (Auth)               | -                |

---

## 🚀 Local Development Setup

### 1. Clone the Repositories

`bash
git clone https://github.com/sujon-258549/assungment-4-car-frontend.git
git clone https://github.com/sujon-258549/level-2-assignment-2.git
2. Set Up Environment Variables
Create .env files in both frontend and backend directories.

🔧 Example .env (Backend)
env
Copy
Edit
MONGODB_URI=your_connection_string
JWT_SECRET=your_secret_key
3. Install Dependencies & Start Servers
bash
Copy
Edit
# Backend
cd level-2-assignment-2
npm install
npm start

# Frontend
cd ../assungment-4-car-frontend
npm install
npm run dev
🧗 Challenges & Solutions
Challenge	Solution
🔗 Data Relationships	Designed normalized schemas with Mongoose for user-owner-car linkage
📷 Image Uploads	Integrated Cloudinary for scalable image hosting
🔄 CORS Deployment Issues	Handled Vercel–Render communication via CORS middleware

🔮 Future Plans
Feature	Description
🤖 AI Recommendations	Suggest vehicles based on user behavior, location, and preferences using AI (TensorFlow.js, Flask API, OpenAI Embeddings)
🗓️ Test Drive Booking	Integrated calendar, with SMS/email reminders for appointments
🔍 Advanced Filters	Search similar cars by image, compare fuel efficiency, and features
💳 Payment Integration	Seamless checkout with secure payment gateways
📷 AR Preview	Use WebAR to visualize cars in real-world environments


Use WebAR to visualize cars in real-life environments
![screencapture-localhost-5173-2025-05-11-11_24_31](https://github.com/user-attachments/assets/13d8c047-700d-4863-95c6-16fbf86449fe)


