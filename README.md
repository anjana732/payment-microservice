<!-- # 💳 Payment Microservice

A standalone Node.js microservice that handles payment processing through **Stripe** and **Razorpay** gateways. Built with modular design to support extensibility and scalability, and includes webhook handling and gateway abstraction.

---

## 🛠️ Features

- Supports multiple payment gateways: **Stripe** and **Razorpay**
- Webhook support for asynchronous event handling
- Gateway abstraction layer
- MongoDB integration
- Dockerized for deployment
- Clean architecture: separation of config, controllers, services, and gateways

---

## 📁 Project Structure

```
payment-microservice/
├── src/
│   ├── config/
│   │   └── payment.config.js         # API keys and secrets for gateways
│   ├── controller/
│   │   └── payment.controller.js     # Handles payment routes
│   ├── routes/
│   │   └── payment.routes.js         # Defines API endpoints
│   ├── service/
│   │   └── payment/
│   │       ├── gateway/
│   │       │   ├── stripe.gateway.js     # Stripe payment integration
│   │       │   └── razorpay.gateway.js  # Razorpay payment integration
│   │       └── payment.service.js       # Business logic for payment handling
│   ├── utils/
│   │   └── logger.js                # Winston-based logger
│   ├── webhook/
│   │   ├── stripe.webhook.js       # Stripe webhook handler
│   │   └── razorpay.webhook.js     # Razorpay webhook handler
│   ├── app.js                      # Express app setup
│   └── index.js                    # Entry point with DB connection
│
├── .env                            # Environment variables
├── Dockerfile                      # Dockerfile for containerization
├── docker-compose.yml              # Docker setup
├── package.json
└── README.md                       # You're here!
```


---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/payment-microservice.git
cd payment-microservice
```

### 2. Install Dependencies

```bash
npm install
```
### 3. Environment Variables

```bash
PORT=3000
MONGO_URI=your_mongodb_uri

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
RAZORPAY_WEBHOOK_SECRET=your_razorpay_webhook_secret
```

### 4. Run the Microservice

```bash
npm start # for production
npm run dev # for development server
```

## 🐳 Docker Support

### 1. Build docker image

```bash
docker build -t payment-microservice .
```

### 2. Run Container

```bash
docker-compose up --build
```

 -->


```md
# Payment Microservice 🚀

Welcome to the **Payment Microservice** repository. This project is built using **Node.js**, **Express**, and **MongoDB** and it integrates with popular payment gateways like **Stripe** and **Razorpay**. The service exposes endpoints to create, retrieve, capture, and cancel payments, and supports webhook integrations for real-time payment updates.

---

## Introduction

The Payment Microservice is a robust service designed to handle various payment operations. It enables you to process payments through multiple gateways, ensuring a seamless experience for both your application and your end users. The service uses an authentication middleware to secure endpoints and leverages MongoDB to store order information. Logging is implemented using Winston, and the service is fully containerized with Docker.

---

## Features

- **Multi-Gateway Payment Processing:**  
  - Create payment intents with **Stripe** and orders with **Razorpay**.
  - Retrieve, capture, and cancel payments easily.

- **Webhook Handling:**  
  - Process payment events through dedicated webhook endpoints for both Stripe and Razorpay.

- **Authentication:**  
  - Secure endpoints using JWT-based authentication middleware.

- **Database Integration:**  
  - Persist orders and payment details using **MongoDB** with Mongoose.

- **Robust Logging:**  
  - Detailed logs using **Winston** for both error and access logs.

- **Docker Support:**  
  - Containerized deployment for consistent environments across development and production.

---

## Requirements

Before running the service, ensure that the following are installed:

- **Node.js** (v18 or higher)
- **npm** (Node Package Manager)
- **MongoDB** instance (local or cloud-based)
- **Docker** (optional, for container deployment)

Additionally, the project depends on the following npm packages:

| Package          | Purpose                                      |
| ---------------- | -------------------------------------------- |
| express          | Web framework for Node.js                    |
| cors             | Cross-Origin Resource Sharing (CORS) support |
| dotenv           | Environment variable management              |
| mongoose         | MongoDB ODM                                  |
| jsonwebtoken     | JWT authentication                           |
| stripe           | Integration with Stripe API                  |
| razorpay         | Integration with Razorpay API                |
| winston          | Logging library                              |
| morgan           | HTTP request logger                          |
| nodemon          | Development server reloading                 |

---

## 📁 Project Structure

```
payment-microservice/
├── src/
│   ├── config/
│   │   └── payment.config.js         # API keys and secrets for gateways
│   ├── controller/
│   │   └── payment.controller.js     # Handles payment routes
│   ├── routes/
│   │   └── payment.routes.js         # Defines API endpoints
│   ├── service/
│   │   └── payment/
│   │       ├── gateway/
│   │       │   ├── stripe.gateway.js     # Stripe payment integration
│   │       │   └── razorpay.gateway.js  # Razorpay payment integration
│   │       └── payment.service.js       # Business logic for payment handling
│   ├── utils/
│   │   └── logger.js                # Winston-based logger
│   ├── webhook/
│   │   ├── stripe.webhook.js       # Stripe webhook handler
│   │   └── razorpay.webhook.js     # Razorpay webhook handler
│   ├── app.js                      # Express app setup
│   └── index.js                    # Entry point with DB connection
│
├── .env                            # Environment variables
├── Dockerfile                      # Dockerfile for containerization
├── docker-compose.yml              # Docker setup
├── package.json
└── README.md                       # You're here!
```

---

## Installation

Follow these steps to set up the service on your local machine:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/anjana732/payment-microservice.git
   cd payment-microservice
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**

   Create a `.env` file in the root directory and define the following environment variables:

   ```ini
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   ACCESS_TOKEN_SECRET=your_jwt_access_token_secret

   # Stripe configuration
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

   # Razorpay configuration
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   RAZORPAY_WEBHOOK_SECRET=your_razorpay_webhook_secret
   ```

4. **(Optional) Run with Docker:**

   If you prefer using Docker, ensure you have Docker and Docker Compose installed. You can build and run the container using:

   ```bash
   docker-compose up --build
   ```

---

## Usage

After installation, you can start the server using one of the following commands:

- **Development Mode:**

  ```bash
  npm run dev
  ```

- **Production Mode:**

  ```bash
  npm start
  ```

The server will start on the port defined in the `.env` file (default is 5000). The following endpoints are available:

| Endpoint                                | Method | Description                                           | Authentication |
| --------------------------------------- | ------ | ----------------------------------------------------- | -------------- |
| `/api/payment/process-create`           | POST   | Create a new payment/order                            | Yes            |
| `/api/payment/process-retrieve`         | POST   | Retrieve payment details                              | Yes            |
| `/api/payment/process-capture`          | POST   | Capture a pending payment                             | Yes            |
| `/api/payment/process-cancel`           | POST   | Cancel the created payment/order                      | Yes            |
| `/api/payment/process-stripewebhook`     | POST   | Webhook endpoint for receiving Stripe events          | No             |
| `/api/payment/process-razorpaywebhook`   | POST   | Webhook endpoint for receiving Razorpay events        | No             |

To test the secured endpoints, include a valid JWT token in the `Authorization` header as follows:

```
Authorization: Bearer <your_jwt_token>
```

---

## Configuration

All configuration settings are managed through environment variables defined in the `.env` file. Key configuration areas include:

- **Database:**  
  The MongoDB connection is managed in the `src/config/db.js` file.

- **Payment Gateways:**  
  Payment gateway credentials and settings are managed in `src/config/payment.config.js`.

- **Logging:**  
  Logging is configured using Winston in `src/utils/logger.js`. Logs are stored in the `logs` directory.

- **Docker:**  
  The `Dockerfile` and `docker-compose.yml` provide the configuration for containerized deployments.

Ensure all necessary environment variables are correctly specified before running the service.

---

## Contributing

Contributions are welcome! If you would like to contribute, please follow these guidelines:

1. **Fork the Repository:**  
   Create a personal fork of the repository.

2. **Create a Feature Branch:**  
   Create a branch with a descriptive name for your feature or bug fix.

3. **Commit Your Changes:**  
   Ensure your code is formatted consistently and includes appropriate tests if applicable.

4. **Open a Pull Request:**  
   Submit a pull request describing your changes and the problem they solve.

5. **Follow Coding Standards:**  
   Make sure you adhere to the project’s coding standards and best practices.

Your valuable contributions help improve this project for everyone!

---

Happy coding! 🎉
```