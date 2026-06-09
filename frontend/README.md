# 🍱 Byto

A modern food delivery and smart nutrition subscription platform built using the MERN stack.

Byto combines traditional food ordering with recurring nutrition plans, allowing users to order food anytime or subscribe to personalized meal plans delivered by hyperlocal cloud kitchens.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* User Signup & Login
* Branch Signup & Login
* Email OTP Verification
* OTP Resend with Cooldown
* Forgot Password
* Reset Password
* JWT Authentication
* Protected Routes
* Role-Based Access Control

---

## 👤 User Management

* View Profile
* Update Profile
* Delete Account
* Email Verification Status

---

## 🏢 Brand Management

Branch users can:

* Create a Brand
* Join an Existing Brand
* Manage Brand Information

### Rules

* One account can own only one brand
* One account can join only one brand
* Brand names are unique

---

## 📍 Branch Management

Branch users can:

* Create Multiple Branches
* Manage Delivery Radius
* Configure Kitchen Timings
* Update Branch Information
* Open / Close Kitchen
* Delete Branch

### Branch Information

* Branch Name
* Address
* Geo Location
* Phone Number
* Delivery Radius
* Preparation Time
* Opening Hours
* Closing Hours

---

## 🍱 Menu Management

Each branch can manage its own menus.

### Menu Features

* Create Menu Items
* Update Menu Items
* Delete Menu Items
* Toggle Availability
* View Menu Details

### Food Information

* Name
* Description
* Images
* Category
* Pricing
* Discount Pricing
* Veg / Non-Veg
* Preparation Time

---

## 🥗 Nutrition Tracking

Each menu item supports:

* Calories
* Protein
* Carbs
* Fat

### Diet Categories

* Keto
* High Protein
* Weight Loss
* Balanced
* Low Carb
* Vegan
* Gluten Free

---

## 🔄 Subscription Ready

Menu items can be marked as:

* Subscription Eligible

This lays the foundation for:

* Weekly Meal Plans
* Monthly Meal Plans
* Recurring Deliveries
* Smart Nutrition Programs

---

## 🏗 Architecture

### Roles

#### User

Can:

* Browse Branches
* View Menus
* View Nutrition Information
* Order Food
* Subscribe to Meal Plans (Upcoming)

#### Branch

Can:

* Create / Join Brand
* Create Branches
* Manage Menus
* Manage Orders (Upcoming)

---

## 🛠 Tech Stack

### Frontend

* React.js
* React Router
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Authentication

* JWT
* Bcrypt
* Nodemailer
* OTP Verification

---

## 📂 Project Structure

```bash
backend/
├── models
│   ├── User.js
│   ├── Brand.js
│   ├── Branch.js
│   └── Menu.js
│
├── controllers
│   ├── authController.js
│   ├── userController.js
│   ├── brandController.js
│   ├── branchController.js
│   └── menuController.js
│
├── routes
│   ├── authRoutes.js
│   ├── userRoutes.js
│   ├── brandRoutes.js
│   ├── branchRoutes.js
│   └── menuRoutes.js
│
├── middleware
│   ├── authMiddleware.js
│   └── roleMiddleware.js
│
└── config
    └── mail.js

frontend/
├── pages
│   ├── auth
│   ├── profile
│   ├── brand
│   ├── branch
│   └── menu
│
├── api
│   ├── authApi.js
│   ├── userApi.js
│   ├── brandApi.js
│   ├── branchApi.js
│   └── menuApi.js
│
└── components
```

---

## 🔮 Upcoming Features

### Orders

* Cart
* Checkout
* Order Management
* Order History

### Payments

* Razorpay Integration
* Subscription Billing

### Delivery

* Delivery Partner Management
* Real-Time Tracking
* Route Optimization

### Smart Nutrition

* Weekly Plans
* Monthly Plans
* Calorie Goals
* Macro Tracking
* Meal Scheduling
* Pause / Skip Meals

### Analytics

* Revenue Dashboard
* Branch Performance
* Menu Insights
* Subscription Analytics

---

## 📜 License

This project is currently under development and intended for educational and commercial use.

---

## 👨‍💻 Author

Built with ❤️ using the MERN Stack.
