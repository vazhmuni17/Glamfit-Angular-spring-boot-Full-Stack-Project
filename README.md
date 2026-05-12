# Glamfit-Angular-spring-boot-Full-Stack-Project
Now let me explore the backend and frontend structures:Now I have a comprehensive understanding of the project. Let me provide a deep explanation.

---

## 🎨 **Glamfit: Full-Stack Beauty & Wellness Platform**

### **Project Overview**

**Glamfit** is a comprehensive full-stack web application designed for a beauty and wellness salon management system. It features a **dual-role admin/manager dashboard**, customer-facing booking system, and service management capabilities.

**Repository Stats:**
- **Size**: 217.7 KB
- **Visibility**: Private
- **Created**: 22 days ago (mid-April 2026)
- **Last Updated**: 1 minute ago
- **Owner**: @vazhmuni17

---

## **🏗️ Architecture Overview**

```
Glamfit-Angular-spring-boot-Full-Stack-Project/
├── Glamfit-backend/          # Spring Boot REST API (Java)
│   ├── src/main/java/        # Backend business logic
│   ├── src/main/resources/   # Configuration & database scripts
│   └── pom.xml               # Maven dependencies
│
└── demo/                      # Angular Frontend
    ├── src/app/
    │   ├── component/        # UI components
    │   ├── services/         # API communication
    │   ├── guards/           # Route protection
    │   ├── interceptors/     # HTTP interceptors
    │   └── models/           # TypeScript interfaces
    └── package.json          # npm dependencies
```

---

## **💻 Backend Stack (Spring Boot)**

### **Technology:**
- **Framework**: Spring Boot 4.0.1
- **Language**: Java 21
- **Build Tool**: Maven
- **Main Class**: `com.Glamfit.Glamfit_backend.GlamfitBackendApplication`

### **Key Dependencies:**

| Dependency | Purpose |
|---|---|
| **spring-boot-starter-data-jpa** | ORM & database abstraction |
| **spring-boot-starter-webmvc** | REST API controllers |
| **spring-boot-starter-mail** | Email notifications |
| **spring-boot-starter-security** | Authentication/Authorization |
| **spring-boot-starter-validation** | Input validation |
| **mysql-connector-j** | MySQL database driver |
| **JWT (jjwt 0.11.5)** | Token-based authentication |
| **Lombok** | Boilerplate code reduction |

### **Features Enabled:**
- ✅ RESTful API endpoints
- ✅ JWT token authentication
- ✅ Email notifications
- ✅ Database persistence (JPA/Hibernate)
- ✅ Security & authorization
- ✅ Input validation
- ✅ Testing support (Karma, JUnit)

---

## **🎭 Frontend Stack (Angular)**

### **Technology:**
- **Framework**: Angular 20.3.15
- **Language**: TypeScript 5.9.2
- **Build Tool**: Angular CLI 20.3.3
- **Styling**: TailwindCSS 4.1.18 + PostCSS
- **HTTP Client**: RxJS 7.8.0

### **Key Dependencies:**

| Package | Purpose |
|---|---|
| **@angular/core** | Framework core |
| **@angular/router** | Client-side routing |
| **@angular/forms** | Form handling |
| **tailwindcss** | Utility-first CSS framework |
| **rxjs** | Reactive programming |
| **animate.css** | Animation library |

### **Project Structure:**

```typescript
src/app/
├── component/              # Reusable components
│   ├── home/              # Landing page
│   ├── beauty-services/   # Beauty service listings
│   ├── treatment-services/# Treatment service listings
│   ├── gallery/           # Photo gallery
│   ├── packages/          # Service packages
│   ├── booking-form/      # Booking interface
│   ├── add-carts/         # Shopping cart
│   ├── aboutus/           # About page
│   ├── contactus/         # Contact page
│   ├── admin/             # Admin dashboard
│   │   ├── login/         # Admin login
│   │   ├── dashboard/     # Admin dashboard
│   │   ├── users/         # User management
│   │   ├── products/      # Product management
│   │   ├── orders/        # Order management
│   │   ├── reports/       # Analytics/Reports
│   │   ├── settings/      # Admin settings
│   │   ├── gallery/       # Gallery management
│   │   └── highlights/    # Feature highlights
│   └── manager/           # Manager dashboard (similar structure)
│
├── services/              # API communication services
├── models/                # TypeScript interfaces/types
├── guards/                # Route protection (auth-guard)
├── interceptors/          # HTTP interceptors (auth-interceptor)
└── app.routes.ts          # Main routing configuration
```

---

## **🛣️ Application Routes**

### **Public Routes:**
```
/home                 → Home page
/beauty-services      → Beauty services listing
/treatment-services   → Treatment services listing
/gallery              → Photo gallery
/packages             → Service packages
/aboutus              → About page
/contactus            → Contact page
/booking              → Booking form
/cart                 → Shopping cart
```

### **Admin Routes:** (Protected by `authGuard`)
```
/admin/login          → Admin login
/admin/               → Admin layout wrapper
├── dashboard         → Dashboard overview
├── users            → User management
├── products         → Product management
├── orders           → Order management
├── reports          → Analytics/Reports
├── settings         → Admin settings
├── gallery          → Gallery management
└── highlights       → Feature highlights
```

### **Manager Routes:** (Protected by `authGuard`)
```
/manager/login        → Manager login
/manager/             → Manager layout wrapper
├── dashboard         → Dashboard overview
├── users            → User management
├── products         → Product management
├── orders           → Order management
├── reports          → Analytics/Reports
├── settings         → Manager settings
├── gallery          → Gallery management
└── highlights       → Feature highlights
```

---

## **🔐 Security Architecture**

### **Authentication Flow:**
1. **JWT Tokens**: Used for stateless authentication (backend generates JWT on login)
2. **Auth Interceptor** (`auth-interceptor`): Automatically adds JWT to HTTP headers
3. **Auth Guard** (`auth-guard`): Protects admin/manager routes, validates tokens
4. **Spring Security**: Backend enforces authorization rules

### **Authentication Stack:**
- Frontend: `authInterceptor` → Adds token to requests
- Backend: Spring Security → Validates tokens using JJWT
- Protection: Route guards on sensitive admin/manager pages

---

## **📱 Features & Functionality**

### **Customer-Facing:**
- Browse beauty and treatment services
- View service packages and pricing
- Book appointments
- Shopping cart for services
- Gallery of work
- Contact & information pages

### **Admin Panel:**
- Dashboard with analytics
- User management
- Product/Service management
- Order tracking
- Reporting & analytics
- Gallery management
- System settings

### **Manager Panel:**
- Similar to admin but potentially with limited permissions
- Dashboard
- Service and order management
- Reports

---

## **🛠️ Build & Run Commands**

### **Frontend (Angular):**
```bash
cd demo
npm install              # Install dependencies
npm start               # ng serve → Dev server at http://localhost:4200
npm run build           # Production build
npm test                # Run unit tests
```

### **Backend (Spring Boot):**
```bash
cd Glamfit-backend
./mvnw spring-boot:run  # Run the application
./mvnw clean package    # Build JAR
./mvnw test             # Run tests
```

---

## **📊 Database:**
- **Type**: MySQL
- **Configuration**: Handled in `src/main/resources/application.properties` or `application.yml`
- **ORM**: Hibernate (via Spring Data JPA)
- **Features**: JPA entities, relationships, and migrations

---

## **✨ Key Technical Highlights**

1. **Standalone Angular Components**: Uses latest Angular standalone API (no NgModules)
2. **Reactive Forms**: Angular reactive forms for complex form handling
3. **TypeScript**: Fully typed for better developer experience
4. **TailwindCSS**: Utility-first responsive design
5. **JWT Authentication**: Secure token-based auth
6. **Interceptors**: Centralized HTTP request/response handling
7. **Route Guards**: Protected routes for admin/manager areas
8. **RESTful API**: Spring Boot REST endpoints
9. **JPA ORM**: Database abstraction layer
10. **Maven Build**: Standardized Java build process

---

## **📈 Project Maturity**

- **Status**: Early development (0.0.1-SNAPSHOT)
- **Architecture**: Well-structured with clear separation of concerns
- **Scalability**: Designed for growth with admin/manager role support
- **Security**: JWT + Spring Security implementation

This is a **professional-grade salon/beauty management SaaS application** with comprehensive admin capabilities! 🎨✨
