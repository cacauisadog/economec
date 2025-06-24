# Development Plan - Economec

## Project Clarifications (Q&A Session)

### 1. Authentication & Security

- **Method**: Email/password + Social login (Google and Facebook only)
- **Implementation**: Django authentication + OAuth integration

### 2. Data Models

- **Expense Model**: Simple structure with only essential fields
  - `id` (auto-generated)
  - `description` (required)
  - `value` (required, decimal with 2 places for BRL)
  - `category` (optional, defaults available)
  - `date` (required, defaults to today)

### 3. Categories

- **Default Categories** (cannot be edited/deleted by users):
  - "restaurantes"
  - "delivery"
  - "transporte"
  - "moradia"
  - "presentes"
  - "roupas"
  - "supermercados"
  - "estudos"
  - "saúde"
  - "lazer"
  - "serviços"
  - "combustível"
- Users can create custom categories but cannot modify defaults

### 4. Currency & Localization

- **Currency**: BRL only (Brazil-focused)
- **Localization**: None initially - keep it simple
- **Number Format**: Decimal values with exactly 2 decimal places

### 5. Charts & Visualization

- **Chart Types**:
  - Line charts for spending trends over time
  - Pie charts for category breakdown
  - Bar charts for monthly comparisons
- **Time Filters**:
  - This month
  - Last 3 months
  - Last 6 months
  - Last year

### 6. Data Export

- **MVP Scope**: No data export initially
- **Rationale**: Keep the app simple and focused

### 7. Hosting Budget

- **Budget**: Maximum 50 BRL/month
- **Strategy**: AWS Lightsail for backend (~$3.50/month) + S3/CloudFront for frontend

### 8. User Onboarding

- **Approach**: Demo website with sample Brazilian expenses
- **Rationale**: Interactive experience over video tutorials

### 9. Expense Validation

- **Required Fields**: description, value, date
- **Optional Fields**: category
- **Defaults**: Date defaults to today
- **Restrictions**: None beyond required fields

### 10. Timeline

- **Target**: 1 week for working MVP
- **Nature**: Side project, no hard deadline
- **Focus**: Speed and simplicity over feature completeness

## Technical Decisions

### Frontend

- **Framework**: React + Vite
- **UI Library**: shadcn/ui + Tailwind CSS
- **Charts**: Recharts
- **Routing**: React Router v7
- **Architecture**: SPA (Single Page Application)

### Backend

- **Framework**: Django + Django REST Framework
- **Database**: PostgreSQL
- **Authentication**: Django built-in + OAuth (Google/Facebook)
- **API**: RESTful design

### Hosting

- **Frontend**: AWS S3 + CloudFront
- **Backend**: AWS Lightsail (budget-friendly)
- **Database**: Managed PostgreSQL on Lightsail
- **Strategy**: Deploy from day 1, iterate continuously

### Performance Requirements

- **Target Market**: Brazil (potentially slow internet)
- **Optimization**: Minimal bundle size, CDN usage
- **Mobile**: Fully responsive, desktop-first approach

## Development Strategy (7-Day Plan)

### Phase 1: Backend MVP + AWS Deployment (Days 1-2)

1. **Backend Foundation**
   - Initialize Django project with Django REST Framework
   - Configure PostgreSQL database
   - Create basic User, Category, Expense models
   - Simple CRUD APIs for expenses
   - **Deploy to AWS Lightsail** ($3.50/month instance + managed PostgreSQL)
   - Set up domain and SSL certificates

### Phase 2: Frontend MVP + CloudFront Deployment (Days 2-3)

1. **Frontend Foundation**
   - Initialize React + Vite project
   - Basic expense add/list functionality
   - Connect to deployed backend
   - **Deploy to S3 + CloudFront** with CI/CD pipeline
   - Configure custom domain

### Phase 3: Authentication (Days 3-4)

1. **Authentication System**
   - Email/password + Google/Facebook OAuth
   - Deploy auth updates to existing AWS infrastructure

### Phase 4: Core Features (Days 4-6)

1. **Features** (deploy incrementally)
   - Default categories with seed data
   - Charts and visualization (Recharts)
   - Time period filters
   - BRL formatting and decimal validation

### Phase 5: Polish (Days 6-7)

1. **Performance & UX**
   - Bundle optimization for CloudFront
   - Mobile responsiveness
   - Light green theme (money-focused color scheme)

## Key Principles

### Simplicity First

- Minimal feature set
- Clean, intuitive UI
- No unnecessary complexity

### Performance Focus

- Fast loading times
- Optimized for Brazilian internet speeds
- Lightweight bundle size

### Deploy Early, Iterate Often

- AWS infrastructure from day 1
- Continuous deployment pipeline
- Real-world testing environment

### Budget Consciousness

- Stay within 50 BRL/month hosting budget
- Choose cost-effective AWS services
- Monitor usage and costs

## Next Steps

1. Set up development environment
2. Initialize both frontend and backend repositories
3. Configure AWS account and services
4. Begin Phase 1 development
5. Establish deployment pipeline

---

_This document serves as the definitive reference for Economec development based on stakeholder requirements and technical constraints._

