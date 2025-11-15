### Vehicle Fleet Monitoring Dashboard

Objective A professional web-based dashboard for real-time vehicle monitoring and fleet management with role-based access control.

---

### Technology Stack

Frontend
- React - Modern UI library for building interactive interfaces
- TypeScript - Type-safe JavaScript for better code quality
- Tailwind CSS - Utility-first CSS framework for responsive design
- Recharts - Data visualization library for telemetry charts
- React Router - Client-side routing and navigation
- Shadcnui - High-quality, accessible UI component library

Backend (Lovable Cloud - Powered by Supabase)
- PostgreSQL Database - Relational database for storing vehicles, users, and telemetry
- Row Level Security (RLS) - Database-level security policies
- JWT Authentication - Secure token-based authentication
- Edge Functions - Serverless backend API endpoints

---

### Application Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   Frontend Layer                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │ Login Screen │  │ Admin Panel  │  │ User Dashboard│ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
│         │                  │                 │          │
│         └──────────────────┴─────────────────┘          │
│                      │                                   │
│              ┌───────▼────────┐                         │
│              │  Auth Context  │                         │
│              │ (State Mgmt)   │                         │
│              └───────┬────────┘                         │
└──────────────────────┼──────────────────────────────────┘
                       │
              ┌────────▼─────────┐
              │  Protected Routes │
              └────────┬─────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│                   Backend Layer                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │ JWT Auth     │  │ PostgreSQL   │  │ Edge Functions│ │
│  │ (Tokens)     │  │ Database     │  │ (APIs)        │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

### Core Features Implemented

#### 1. Authentication & Authorization
- JWT token-based authentication system
- Role-based access control (Admin vs User)
- Protected routes that redirect unauthorized users
- Secure session management with localStorage
- Auto-redirect based on user role

Demo Credentials
- Admin `admin@fleet.com`  `admin123`
- User `user@fleet.com`  `user123`

#### 2. Admin Panel (Admin-only access)
- Vehicle CRUD Operations
  - Create new vehicles with name and registration number
  - Assign vehicles to specific users
  - Edit vehicle details and reassignments
  - Delete vehicles from the system
- Fleet Statistics Dashboard
  - Total vehicles count
  - Active vehicles monitoring
  - User management overview
- Data Table Interface
  - Sortable and filterable vehicle list
  - Quick action buttons (EditDelete)
  - Status indicators (ActiveInactive)

#### 3. User Dashboard (User access)
- Vehicle Overview
  - Grid display of assigned vehicles
  - Real-time status indicators
  - Last update timestamps
- Key Metrics Display
  - Current speed (kmh)
  - Battery level (percentage with color-coded indicators)
  - Engine temperature (°C)
  - GPS location (citystate)
- Fleet Statistics
  - Average speed across all vehicles
  - Average battery level
  - Total and active vehicle counts

#### 4. Vehicle Details Page
- Comprehensive Metrics Dashboard
  - 4 primary metric cards (Speed, Battery, Temperature, Last Updated)
  - Battery level with visual progress bar
- Data Visualization Charts
  - Speed History Line chart showing 24-hour speed trends
  - Battery Discharge Area chart tracking battery consumption
  - Temperature Monitoring Line chart for engine temperature
  - All charts use responsive design with proper tooltips
- GPS Location Display
  - Current coordinates (latitudelongitude)
  - Location name display
  - Map integration-ready placeholder
- Vehicle Metadata
  - Complete vehicle information
  - Assignment details
  - Real-time sync status

---

### Security Implementation

Client-Side Security
- Protected routes using React Router guards
- Context-based authentication state management
- Automatic token validation on mount
- Secure logout clearing all session data

Backend Security (Ready for Cloud integration)
- Row Level Security (RLS) policies on database tables
- JWT token verification for API requests
- User-scoped data access (users only see their vehicles)
- Admin-only operations enforcement at database level

---

### Data Flow Example

User Login Flow
```
1. User enters credentials → Login component
2. AuthContext validates → Generates JWT token
3. Token stored in localStorage → User state updated
4. Router checks role → Redirects to appropriate dashboard
5. Protected routes verify token → Allows access
```

Vehicle Data Retrieval Flow
```
1. User Dashboard loads → Fetches user's vehicles
2. Database applies RLS → Returns only assigned vehicles
3. Component displays cards → Shows real-time metrics
4. User clicks View Details → Navigates to detailed view
5. Charts render telemetry → Visualizes 24-hour history
```

---

### API Integration Design

The application is designed to integrate with backend APIs

Authentication Endpoints
- `POST login` - User authentication
- Returns JWT token + user role

Vehicle Management Endpoints
- `GET vehicles` - List all vehicles (admin)
- `POST vehicles` - Create new vehicle (admin)
- `PUT vehiclesid` - Update vehicle (admin)
- `DELETE vehiclesid` - Delete vehicle (admin)
- `GET usersidvehicles` - Get user's vehicles

Telemetry Data Endpoints
- `GET vehiclesidtelemetry` - Fetch vehicle metrics
- Returns speed[], battery[], temperature[], gps coordinates

---

### Design System

Color Scheme
- Primary Tech Blue (`hsl(210, 90%, 48%)`) - Professional, trustworthy
- Accent Teal (`hsl(174, 70%, 50%)`) - Modern, energetic
- Success Green - Positive indicators
- Warning Orange - Attention states
- Destructive Red - Critical alerts

Design Principles
- Consistent spacing and typography via Tailwind
- Semantic color tokens (no hardcoded colors)
- Responsive grid layouts (mobile-first)
- Accessible UI components (ARIA labels, keyboard navigation)
- Professional automotivetech aesthetic

---

### How to Run the Application

```bash

# Install dependencies
npm install

# Start development server
npm run dev

# Access at httplocalhost8080
```

Login with demo credentials to explore both roles!

---

Add Code Documentation
Create Demo Guide
Write Technical Spec
