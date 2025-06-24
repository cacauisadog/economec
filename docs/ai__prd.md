# Product Requirements Document (PRD)

## Economec - Personal Finance Visualizer

---

## 1. Overview
Economec is a **personal finance visualizer** built for the Brazilian market. Users manually input their expenses—including description, value, category, and date—and the app provides clear and intuitive charts to help them visualize their spending habits. Economec aims to make expense tracking simple, non-intimidating, and actionable.

---

## 2. Goals & Objectives
- **Simplicity:** No integrations with banks; users input data manually to develop financial awareness.
- **Visualization-first:** Focused on transforming data into meaningful charts and insights.
- **Accessibility:** Works seamlessly on desktop (first-class experience) and mobile (fully responsive).
- **Security:** User data is stored securely in the cloud.
- **Empowerment:** Help users understand where their money goes and make better financial decisions.

---

## 3. Scope
### In Scope:
- User account creation and authentication.
- Data stored securely in the cloud to support multi-device access.
- Users can:
  - Add, edit, delete expenses (description, value, category, date).
  - Create custom categories.
  - View expenses over time and by category via interactive charts.
  - See a table listing all expenses.
- Desktop-first web application with responsive design for mobile.
- Expense data visualization via charts.

### Out of Scope:
- No bank account integrations.
- No income tracking (initially).
- No budget planning tools (initially).
- No shared accounts or multi-user collaborations.

---

## 4. User Personas

### Amanda
- **Age:** 35  
- **Occupation:** Architect  
- **Location:** São Paulo, Brazil  
- **Tech skills:** High  
- **Motivation:** Saving money for her first apartment.  
- **Pain Points:** Finds most apps too complex; wants something minimal and focused.  
- **Goals:** Keep painless track of expenses.

### Cauê
- **Age:** 26  
- **Occupation:** Software Engineer  
- **Location:** Botucatu, Brazil  
- **Tech skills:** High  
- **Motivation:** Wants to understand money management better to invest and build a safety net.  
- **Pain Points:** Feels overwhelmed by complex finance apps.  
- **Goals:** Understand where his money goes.

### Nathalia
- **Age:** 19  
- **Occupation:** College Student  
- **Location:** Rio de Janeiro, Brazil  
- **Tech skills:** Average  
- **Motivation:** Needs to track spending for financial survival.  
- **Pain Points:** New to financial tracking; unsure how to improve.  
- **Goals:** Save money, avoid ending the month broke.

---

## 5. User Stories
- As a **user**, I want to **create an account**, so my data is saved.
- As a **user**, I want to **add, edit, and delete expenses**, so I can track my spending.
- As a **user**, I want to **create custom categories**, so the app matches my needs.
- As a **user**, I want to **see my total spending over time**, so I can monitor habits.
- As a **user**, I want to **see a breakdown of expenses by category**, so I can understand where my money goes.
- As a **user**, I want to **see a table with all my expenses**, so I can review and audit them.
- As a **user**, I want the app to be **simple and fast**, even on slow internet connections.

---

## 6. Wireframes & UX Notes
- **Home / Dashboard:** Summary of current month’s expenses, charts (over time, by category), and recent expenses table.
- **Expenses Page:** Table of all expenses with options to add, edit, delete.
- **Add Expense Modal:** Fields for description, value, category (dropdown + create new), and date.
- **Category Management:** Simple interface to add, edit, delete categories.
- **Mobile UX:** Fully responsive, but desktop is the primary target for optimal data visualization.

---

## 7. Technical Requirements

### Frontend
- Web app (desktop-first, responsive).
- React + Vite.
- UI libraries:
  - **shadcn/ui** for components.
  - **Tailwind CSS** for styling.
  - **Recharts** for charts.
- React Router v7 for navigation.
- SPA architecture (no SEO needed).

### Backend
- REST API using Django + Django REST Framework.
- Authentication (user account management).
- CRUD for expenses and categories.
- Handles business logic and secure data serving.

### Database
- PostgreSQL.
- Data models:
  - User
  - Expense
  - Category
- Schema details TBD.

### Hosting
- Frontend on AWS CloudFront (via S3 bucket).
- Backend hosting TBD (options: EC2 with Docker, ECS, Lightsail, etc.).

### Performance Requirements
- Optimized for slow internet speeds common in Brazil.
- Minimized frontend bundle.
- Backend optimized for low latency.
- CDN usage for frontend assets.

### Post-MVP
- Will evolve into a Progressive Web App (PWA) with offline capabilities and installability.

---

## 8. KPIs and Success Metrics
- Number of registered users.
- Daily/weekly active users.
- Average number of expenses logged per user.
- User retention rate after 1, 3, and 6 months.
- Qualitative feedback on simplicity and clarity.

---

## 9. Risks & Assumptions
- Users are willing to input data manually.
- Deployment in Brazil is affordable (under active evaluation).
- Users prefer desktop for financial visualization but will expect a solid mobile experience.
- App simplicity is a competitive advantage over feature-heavy alternatives.

---

## 10. Appendix
- Wireframes, schema diagrams, and UX notes will be developed iteratively.
- Hosting decisions are pending cost analysis.
- Detailed data model designs will be finalized in the next phase.

---

## 🌟 Conclusion
Economec aims to provide a simple, user-friendly, and highly visual personal finance tracking experience for Brazilian users. This PRD serves as the foundation for development, with a strong emphasis on simplicity, clarity, and empowering users to take control of their finances.

