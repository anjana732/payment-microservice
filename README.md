# 💳 Payment Microservice

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

