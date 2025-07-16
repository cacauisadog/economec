# Frontend Specification - Economec

## Overview

This document serves as the source of truth for all frontend-related decisions and specifications for Economec, a personal finance visualizer built for the Brazilian market.

---

## Core Technology Stack

### **Primary Stack**

- **React**: ^19 (Latest with concurrent features)
- **Vite**: ^7 (Fast dev server and optimized builds)
- **pnpm**: ^10.12 (Efficient package management)
- **TypeScript**: Full type safety throughout the application

### **UI & Styling**

- **Tailwind CSS**: ^4.1.11 (Utility-first CSS framework)
- **shadcn/ui**: Copy-paste accessible components built on Radix UI
- **Lucide React**: Icon library for consistent iconography

### **Development Tools**

- **ESLint**: Flat config with TypeScript, React, and Prettier integration
- **Prettier**: Code formatting with Tailwind CSS class sorting
- **Mock Service Worker (MSW)**: API mocking for frontend-first development

---

## Architecture Decisions

### **Frontend-First Development Approach**

- **Start with frontend + mocked APIs** before building backend
- **Validate UX early** with real interaction patterns
- **Iterate quickly** without backend complexity
- **Discover real API requirements** through actual frontend usage

### **Component Strategy**

- **shadcn/ui for accessibility** - Enterprise-grade a11y out of the box
- **Copy-paste approach** - No runtime overhead, full customization
- **Radix UI primitives** - Industry-leading accessibility standards
- **Perfect for Brazilian market** - Optimized for slower connections

### **State Management**

- **Start simple** - React built-in state management
- **Add complexity later** - Based on real user needs
- **Focus on business logic** - Not state management complexity

---

## Data Structure

### **Transaction Model (Core Entity)**

```typescript
interface Transaction {
  id: string;
  value: number; // -40.00 (expense) or +3500.00 (income)
  description: string; // "dinner at fancy restaurant"
  date: string; // "24/06/2025" (DD/MM/YYYY format)
  category: string; // "alimentação"
  source: string; // "cartão de crédito"
  isRecurring: boolean; // true for salary, rent, subscriptions
}
```

### **Design Rationale**

- **Brazilian-first**: DD/MM/YYYY format, BRL implied
- **Simple but complete**: 7 fields provide all needed insights
- **Positive/negative values**: Clean income vs expense logic
- **Recurring logic**: Essential for salary and subscription tracking
- **Source tracking**: Brazilians think in terms of payment methods

### **Default Categories (Brazilian Context)**

```typescript
const DEFAULT_CATEGORIES = [
  "alimentação",
  "transporte",
  "moradia",
  "saúde",
  "educação",
  "lazer",
  "roupas",
  "serviços",
  "salário",
  "freelance",
];
```

### **Common Sources**

```typescript
const DEFAULT_SOURCES = [
  "conta corrente",
  "cartão de crédito",
  "cartão de débito",
  "pix",
  "dinheiro",
  "poupança",
];
```

### **Future Considerations (Post-MVP)**

- **Tags**: Cross-cutting flexible labeling (`tags?: string[]`)
- **Installments**: Brazilian credit card culture support
- **Multiple categories**: If users need overlap functionality

---

## User Interface Requirements

### **Accessibility First**

- **WCAG 2.1 AA compliance** - shadcn/ui provides this out of the box
- **Keyboard navigation** - All interactions must be keyboard accessible
- **Screen reader support** - Proper ARIA labels and semantics
- **Color contrast** - Meets accessibility standards for financial data

### **Brazilian User Experience**

- **Mobile-first responsive** - Primary target is mobile users
- **Slow connection optimization** - Minimal bundle size, efficient loading
- **DD/MM/YYYY date format** - Matches Brazilian expectations
- **Portuguese language** - All interface text in Brazilian Portuguese

### **Performance Requirements**

- **Fast loading** - Optimized for Brazilian internet speeds
- **Minimal bundle** - Efficient code splitting and lazy loading
- **CDN optimization** - Leveraging AWS CloudFront for global delivery

---

## Core Features & Components

### **Transaction Management**

- **Add Transaction Form** - Simple, intuitive expense/income entry
- **Transaction List** - Searchable, filterable table of all transactions
- **Edit/Delete** - Full CRUD operations on transactions
- **Recurring Detection** - Clear indicators for recurring transactions

### **Data Visualization**

- **Category Breakdown** - Pie charts for spending by category
- **Time-based Analysis** - Line charts for spending trends
- **Source Analysis** - Payment method insights
- **Monthly Balance** - Income vs expenses tracking

### **User Interface Components**

- **Form Components** - Accessible input fields, selects, date pickers
- **Data Tables** - Sortable, searchable transaction lists
- **Charts** - Interactive visualizations for financial data
- **Modals** - Add/edit transaction workflows

---

## Development Workflow

### **Frontend-First Process**

1. **Mock API setup** - Use MSW to simulate backend responses
2. **Component development** - Build UI components with real-looking data
3. **User testing** - Validate UX with mocked interactions
4. **API specification** - Document required endpoints based on frontend needs
5. **Backend integration** - Replace mocks with real API calls

### **Quality Assurance**

- **ESLint + Prettier** - Code quality and formatting
- **TypeScript strict mode** - Type safety throughout
- **Accessibility testing** - axe-core integration for a11y validation
- **Performance monitoring** - Bundle size and loading time optimization

---

## Deployment Strategy

### **AWS Infrastructure**

- **S3 + CloudFront** - Static site hosting with global CDN
- **Production-ready** - Enterprise-grade security and performance
- **Cost-optimized** - ~$0.93/month vs $20/month alternatives
- **Brazilian market optimized** - Edge locations for reduced latency

### **Deployment Pipeline**

```bash
# Build and deploy process
npm run build
aws s3 sync dist/ s3://economec-frontend-dev-[suffix]/
aws cloudfront create-invalidation --distribution-id [ID] --paths "/*"
```

---

## Success Metrics

### **Technical Metrics**

- **Bundle size** - < 500KB gzipped
- **Loading time** - < 3 seconds on slow connections
- **Accessibility score** - 100% on Lighthouse accessibility audit
- **Performance score** - > 90 on Lighthouse performance

### **User Experience Metrics**

- **Task completion rate** - Users can add transactions easily
- **Error rate** - Minimal user errors in transaction entry
- **User satisfaction** - Positive feedback on simplicity and clarity

---

## Next Steps

### **Immediate Implementation**

1. **Setup project structure** - Initialize React + TypeScript + Vite
2. **Configure development tools** - ESLint, Prettier, MSW
3. **Create type definitions** - Transaction interface and related types
4. **Mock data generation** - Realistic Brazilian transaction data
5. **Core components** - Transaction form, list, and basic charts

### **MVP Validation**

- **User testing** - Validate core transaction entry and viewing flows
- **Performance testing** - Ensure fast loading on Brazilian connections
- **Accessibility audit** - Verify compliance with a11y standards
- **Feedback collection** - Gather insights for post-MVP features

---

## Conclusion

This frontend specification provides a solid foundation for building Economec's user interface. The focus on simplicity, accessibility, and Brazilian user needs ensures the product will resonate with our target market while maintaining high technical standards.

The frontend-first approach allows for rapid iteration and user validation before committing to backend complexity. All decisions are driven by real user needs and can be adjusted based on feedback from actual usage.

---

_This document is maintained by the development team and updated as requirements evolve._

