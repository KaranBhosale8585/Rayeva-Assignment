# Rayeva AI Systems Assignment

This project is an AI-powered web application built as part of the **Rayeva AI Systems assignment**.  
It demonstrates how AI can be used to automate **product classification** and generate **B2B procurement proposals**.

---

## Live Demo

https://rayeva-assignment-zeta.vercel.app/

---

## GitHub Repository

https://github.com/KaranBhosale8585/Rayeva-Assignment

---

## Features

### 1. AI Product Category Generator
Automatically classifies a product and generates useful metadata.

**Input**
- Product Name
- Product Description

**AI Output**
- Primary Category
- Sub Category
- SEO Tags
- Sustainability Filters

Example Response:

```json
{
  "primary_category": "Drinkware",
  "sub_category": "Water Bottles",
  "seo_tags": ["eco friendly bottle", "bamboo bottle", "reusable bottle"],
  "sustainability_filters": ["plastic-free", "reusable", "eco-friendly"]
}
```

---

### 2. AI Event Proposal Generator

Generates a sustainable **B2B procurement proposal** for events.

**Input**
- Event Type
- Budget
- Number of Guests

**AI Output**
- Product Mix
- Budget Allocation
- Cost Breakdown
- Sustainability Impact

Example Response:

```json
{
  "product_mix": [
    {
      "product_name": "Bamboo Water Bottle",
      "quantity": 100,
      "unit_price": 150,
      "total_price": 15000
    }
  ],
  "budget_summary": {
    "total_allocated": 45000,
    "remaining_budget": 5000
  },
  "impact_positioning": "Promotes sustainable alternatives and avoids single-use plastics."
}
```

---

## AI History

The application includes an **AI History Dashboard** where users can view:

- Product classification history
- Event proposal history
- AI responses stored in database
- Timestamped activity logs

---

## Tech Stack

**Frontend**
- Next.js
- React
- Tailwind CSS
- Lucide Icons

**Backend**
- Next.js API Routes
- MongoDB
- Mongoose

**AI Integration**
- Google Generative AI API

**Deployment**
- Vercel

---

## Project Structure

```
app/
 ├── classify-product
 ├── proposal-generator
 ├── ai-history
 ├── api
components/
lib/
models/
utils/
```

---

## Installation

Clone the repository

```bash
git clone https://github.com/KaranBhosale8585/Rayeva-Assignment.git
```

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

---

## Environment Variables

Create a `.env.local` file:

```
MONGODB_URI=your_mongodb_connection
GOOGLE_AI_API_KEY=your_google_ai_key
```

---

## Deployment

The project is deployed on **Vercel**.

Live URL:  
https://rayeva-assignment-zeta.vercel.app/

---

## Demo Video

Demo video will be added soon.

---

## Author

**Karan Bhosale**

GitHub  
https://github.com/KaranBhosale8585
