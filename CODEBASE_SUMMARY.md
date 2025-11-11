# CivicConnect - Complete Codebase Summary

## 📋 Project Overview

**CivicConnect** is a civic engagement platform that allows citizens to report and track civic issues (potholes, traffic problems, street lights, etc.) on an interactive map in real-time. It connects citizens with local authorities to drive community improvements.

---

## 🛠️ Technology Stack

### Core Framework & Build Tools
- **Vite** (v5.4.19) - Build tool and dev server
- **React** (v18.3.1) - UI framework
- **TypeScript** (v5.8.3) - Type safety
- **React Router DOM** (v6.30.1) - Client-side routing
- **@vitejs/plugin-react-swc** - Fast React compilation

### UI & Styling
- **Tailwind CSS** (v3.4.17) - Utility-first CSS framework
- **shadcn/ui** - Component library built on Radix UI
- **Radix UI** - Headless UI primitives (40+ components)
- **Lucide React** (v0.462.0) - Icon library
- **next-themes** (v0.3.0) - Theme management (dark/light mode)

### State Management & Data Fetching
- **@tanstack/react-query** (v5.83.0) - Server state management
- **React Context API** - Global auth state management
- **localStorage** - Client-side persistence for user-reported issues

### Backend & Database
- **Firebase** (v12.5.0) - Backend-as-a-Service
  - **Firebase Authentication** - User auth (Email/Password, Google OAuth)
  - **Firestore** - NoSQL database for issues
  - **Firebase Storage** - Image uploads
  - **Firebase Analytics** - Usage tracking

### Maps & Location
- **Leaflet** (v1.9.4) - Interactive maps
- **OpenStreetMap** - Map tiles (light mode)
- **CartoDB Dark Matter** - Dark map tiles (dark mode)
- **Browser Geolocation API** - User location detection

### Form Handling & Validation
- **React Hook Form** (v7.61.1) - Form state management
- **Zod** (v3.25.76) - Schema validation
- **@hookform/resolvers** - Form validation integration

### Additional Libraries
- **date-fns** (v3.6.0) - Date formatting
- **recharts** (v2.15.4) - Charts (for admin dashboard)
- **sonner** (v1.7.4) - Toast notifications
- **class-variance-authority** - Component variant management
- **clsx** & **tailwind-merge** - Conditional class utilities

### Development Tools
- **ESLint** (v9.32.0) - Code linting
- **TypeScript ESLint** - TypeScript-specific linting
- **PostCSS** & **Autoprefixer** - CSS processing
- **Netlify** - Deployment platform

---

## 📁 Project Structure

```
civicconnect-hero/
├── src/
│   ├── components/          # React components
│   │   ├── ui/              # shadcn/ui components (40+ components)
│   │   ├── Header.tsx       # Navigation header with auth
│   │   ├── Hero.tsx         # Landing page hero section
│   │   ├── Features.tsx    # Feature showcase
│   │   ├── About.tsx       # About section
│   │   ├── Footer.tsx      # Footer component
│   │   ├── PortalContent.tsx # Main portal with map
│   │   ├── ReportModal.tsx  # Issue reporting modal
│   │   ├── AuthModal.tsx    # Authentication modal
│   │   └── AdminIssuePanel.tsx # Admin issue management
│   ├── pages/               # Page components
│   │   ├── Index.tsx        # Landing page
│   │   ├── Portal.tsx       # Portal page wrapper
│   │   ├── AdminDashboard.tsx # Admin dashboard
│   │   └── NotFound.tsx     # 404 page
│   ├── contexts/
│   │   └── AuthContext.tsx  # Global authentication context
│   ├── lib/
│   │   ├── firebase.ts      # Firebase configuration & helpers
│   │   ├── issues.ts        # Issue CRUD operations
│   │   └── utils.ts         # Utility functions
│   ├── types/
│   │   └── issue.ts         # TypeScript type definitions
│   ├── hooks/               # Custom React hooks
│   ├── assets/              # Images and static assets
│   ├── App.tsx              # Root app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── public/                   # Static assets
├── pages/                    # HTML pages (portal.html)
└── Configuration files       # package.json, tsconfig, vite.config, etc.
```

---

## 🔑 Key Features & Functionality

### 1. **Authentication System**
- **Email/Password Authentication**
  - Login and signup functionality
  - Form validation and error handling
- **Google OAuth**
  - One-click Google sign-in
  - Automatic profile data retrieval
- **Auth State Management**
  - Global `AuthContext` provides user state across app
  - Persistent auth state via Firebase `onAuthStateChanged`
  - Auto-logout on session expiry
- **User Profile Display**
  - Shows user avatar, name, and email in header
  - User menu with logout option

### 2. **Interactive Map Portal**
- **Leaflet Map Integration**
  - Interactive map centered on Delhi, India (default: 28.7041, 77.1025)
  - Auto-detects user location via Geolocation API
  - Dark/light mode map tiles (CartoDB Dark Matter / OpenStreetMap)
- **Issue Reporting**
  - Click anywhere on map to report issue
  - Temporary marker shows selected location
  - Modal form for issue details
- **Issue Markers**
  - Color-coded markers by status:
    - 🟡 Yellow: Reported
    - 🔴 Red: In Progress
    - 🟢 Green: Resolved
  - Click markers to see issue details in popup
  - Click issue cards to zoom to location
- **Status Filtering**
  - Filter issues by status (All, Reported, In Progress, Resolved)
  - Real-time marker updates based on filter

### 3. **Issue Management**
- **Issue Types/Categories**
  - 🚗 Pothole
  - 🚦 Traffic Issue
  - 💡 Street Light
  - 💧 Water Supply
  - 🗑️ Garbage
  - 💨 Pollution
  - 📝 Other
- **Issue Data Structure**
  ```typescript
  {
    id: string;
    userId: string;
    userName: string;
    title: string;
    category: IssueCategory;
    description: string;
    location: { lat: number; lng: number };
    address?: string;
    status: "reported" | "inProgress" | "resolved";
    createdAt: Date;
    upvotes: number;
  }
  ```
- **Issue Operations**
  - Create new issues (authenticated users only)
  - View all issues (demo + user reports)
  - Update issue status (admin mode)
  - Delete own issues (users can delete their reports)
  - Filter by status

### 4. **Data Persistence**
- **localStorage**
  - Stores user-reported issues (not demo issues)
  - Persists across sessions
  - Clears on logout
- **Firebase Firestore** (configured but not fully integrated)
  - `issues` collection for issue storage
  - Functions: `createIssue()`, `getIssues()`, `resolveIssue()`
- **Firebase Storage** (configured)
  - Image uploads for issue reports
  - Resolution images for admin

### 5. **Admin Features**
- **Admin Mode Toggle**
  - Floating button in bottom-right corner
  - Click to enable/disable admin mode
- **Status Management**
  - Click issue cards to open status editor
  - Update status: Reported → In Progress → Resolved
- **Issue Resolution**
  - Upload resolution images
  - Mark issues as resolved
- **Admin Dashboard** (`/admin`)
  - View all issues
  - Resolve issues with images

### 6. **UI/UX Features**
- **Dark/Light Mode**
  - System preference detection
  - Manual toggle in header
  - Persisted in localStorage
  - Dark map tiles in dark mode
- **Responsive Design**
  - Mobile-first approach
  - Hamburger menu on mobile
  - Responsive grid layouts
- **Animations**
  - Fade-in animations
  - Slide-in animations
  - Smooth transitions
- **Accessibility**
  - ARIA labels
  - Keyboard navigation
  - Semantic HTML

### 7. **Landing Page**
- **Hero Section**
  - Full-screen hero with background image
  - Call-to-action button
  - Gradient overlay
- **Features Section**
  - Three feature cards with icons
  - Animated on scroll
- **About Section**
  - Mission statement
  - Intersection Observer animations
- **Screenshots Section**
  - App preview images
- **Footer**
  - Links and information

---

## 🔄 Application Flow

### 1. **Initial Load**
1. `main.tsx` initializes theme from localStorage
2. `App.tsx` sets up providers (QueryClient, AuthProvider, TooltipProvider)
3. Routes configured:
   - `/` → Landing page (Index)
   - `/portal` → Interactive map portal
   - `/admin` → Admin dashboard
   - `*` → 404 page

### 2. **Authentication Flow**
1. User clicks "Login" → Opens `AuthModal`
2. User can:
   - Login with email/password
   - Sign up with email/password
   - Sign in with Google
3. On success:
   - Firebase updates auth state
   - `AuthContext` receives user data
   - Modal closes automatically
   - User profile appears in header

### 3. **Issue Reporting Flow**
1. User navigates to `/portal`
2. Map loads with demo issues (always visible)
3. If authenticated, user's saved issues load from localStorage
4. User clicks map → `ReportModal` opens
5. User fills form (title, category, description, image, address)
6. On submit:
   - Issue created with unique ID
   - Added to issues state
   - Saved to localStorage (if authenticated)
   - Marker added to map
   - Modal closes

### 4. **Issue Viewing Flow**
1. Issues displayed as cards in grid
2. Status filter tabs at top
3. Clicking card zooms map to issue location
4. Markers on map show issue status
5. Click marker to see popup with details

### 5. **Admin Flow**
1. Click "Admin Mode" button
2. Click any issue card
3. Status editor modal opens
4. Select new status
5. Issue updates immediately
6. Marker color changes

---

## 🔐 Security & Authentication

### Firebase Configuration
- API keys stored in environment variables (with fallbacks)
- Firebase project: `civic-connect-2a466`
- Authentication methods:
  - Email/Password
  - Google OAuth (with scopes: profile, email)

### Access Control
- **Public Access**: View demo issues, view map
- **Authenticated Users**: Report issues, delete own issues
- **Admin Mode**: Update any issue status (client-side toggle, no server validation)

### Data Validation
- Form validation in `ReportModal`
- TypeScript types for type safety
- Firebase rules (should be configured on Firebase console)

---

## 🎨 Styling & Theming

### Tailwind Configuration
- Custom color system using CSS variables
- Dark mode via `class` strategy
- Custom animations (fade-in, slide-in)
- Responsive breakpoints
- Custom font: Rajdhani (Google Fonts)

### Design System
- **Colors**: HSL-based with semantic naming (primary, secondary, accent, etc.)
- **Components**: shadcn/ui components with consistent styling
- **Spacing**: Tailwind's spacing scale
- **Typography**: Rajdhani font family

---

## 📦 Dependencies Breakdown

### Production Dependencies (67 packages)
- **React Ecosystem**: React, React DOM, React Router
- **UI Components**: 40+ Radix UI components
- **Forms**: React Hook Form, Zod, @hookform/resolvers
- **Maps**: Leaflet
- **Backend**: Firebase (Auth, Firestore, Storage, Analytics)
- **State**: TanStack Query
- **Utils**: date-fns, clsx, tailwind-merge, class-variance-authority
- **Icons**: Lucide React
- **Charts**: Recharts
- **Notifications**: Sonner

### Development Dependencies
- **Build**: Vite, TypeScript, PostCSS, Autoprefixer
- **Linting**: ESLint, TypeScript ESLint
- **Styling**: Tailwind CSS, @tailwindcss/typography

---

## 🚀 Build & Deployment

### Build Commands
- `npm run dev` - Development server (port 8080)
- `npm run build` - Production build
- `npm run build:dev` - Development build
- `npm run build:prod` - Production build
- `npm run build:netlify` - Netlify-specific build
- `npm run preview` - Preview production build

### Deployment
- **Platform**: Netlify
- **Configuration**: `netlify.toml`
  - Build command: `npm run build:netlify`
  - Publish directory: `dist`
  - SPA redirect rules for client-side routing
- **Environment**: Node 18

---

## 🔧 Configuration Files

### `vite.config.ts`
- Base path: `./` (relative)
- Server: Port 8080, host `::`
- Path alias: `@` → `./src`
- React plugin: SWC for fast compilation

### `tsconfig.json`
- Path mapping: `@/*` → `./src/*`
- Relaxed strict mode (for development)
- Allows JavaScript files

### `tailwind.config.ts`
- Dark mode: class-based
- Content paths: all TS/TSX files
- Custom theme extensions
- Animation keyframes

### `netlify.toml`
- Build settings
- SPA redirect rules
- Asset handling

---

## 📝 Key Components Explained

### `App.tsx`
- Root component
- Sets up providers (QueryClient, AuthProvider, TooltipProvider)
- Configures React Router
- Renders global components (Toaster, Sonner, AuthModal)

### `AuthContext.tsx`
- Global authentication state
- Provides: `user`, `isAuthenticated`, `showAuthModal`, `logout`
- Listens to Firebase auth state changes
- Manages loading states

### `PortalContent.tsx`
- Main portal component (567 lines)
- Manages map instance (Leaflet)
- Handles issue state (demo + user issues)
- Status filtering
- Map click handlers
- Issue CRUD operations
- Admin mode functionality

### `ReportModal.tsx`
- Issue reporting form
- Requires authentication
- Fields: title, category, description, image, address
- Form validation
- Success/error handling

### `AuthModal.tsx`
- Authentication interface
- Email/password login & signup
- Google OAuth button
- Error handling
- Loading states

### `Header.tsx`
- Navigation bar
- Theme toggle
- User menu (when authenticated)
- Mobile responsive menu
- Login button (when not authenticated)

---

## 🗄️ Data Models

### Issue Type
```typescript
interface Issue {
  id: string;
  userId: string;
  userName: string;
  title: string;
  category: IssueCategory;
  description: string;
  location: { lat: number; lng: number };
  address?: string;
  status: "reported" | "inProgress" | "resolved";
  createdAt: Date;
  upvotes: number;
}
```

### User Type
```typescript
interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}
```

---

## 🔄 State Management

### Global State (Context)
- **AuthContext**: User authentication state
  - `user`: Current user object
  - `isAuthenticated`: Boolean flag
  - `showAuthModal`: Modal visibility
  - `isLoading`: Auth loading state

### Local State (useState)
- **PortalContent**: Issues array, filters, map state
- **ReportModal**: Form fields, loading, errors
- **AuthModal**: Form fields, loading, errors
- **Header**: Mobile menu, theme state, user menu

### Server State (React Query)
- Configured but not extensively used
- Ready for API integration

### Client Persistence
- **localStorage**: User-reported issues
- **localStorage**: Theme preference

---

## 🐛 Known Issues & TODOs

### Incomplete Features
1. **Firebase Integration**: 
   - Firestore functions exist but not fully integrated
   - Issues currently stored in localStorage only
   - TODO: Save to Firestore on issue creation

2. **Image Uploads**:
   - Image upload UI exists
   - Firebase Storage configured
   - TODO: Implement actual upload on report submission

3. **Admin Authentication**:
   - Admin mode is client-side toggle
   - No server-side admin verification
   - TODO: Implement proper admin role checking

4. **Issue Resolution**:
   - Admin can mark resolved
   - Resolution image upload exists
   - TODO: Connect to Firestore

### Demo Data
- 3 hardcoded demo issues always visible
- Demo issues cannot be deleted
- Demo issues have `id` starting with "demo-"

---

## 🎯 Key Functionalities Summary

1. ✅ User authentication (Email/Password, Google)
2. ✅ Interactive map with Leaflet
3. ✅ Issue reporting on map click
4. ✅ Issue status filtering
5. ✅ Issue markers on map
6. ✅ Dark/light theme toggle
7. ✅ Responsive design
8. ✅ Issue deletion (own issues)
9. ✅ Admin mode (status updates)
10. ⚠️ Firebase integration (partial)
11. ⚠️ Image uploads (UI ready, not connected)
12. ✅ localStorage persistence
13. ✅ Geolocation detection
14. ✅ Landing page with features

---

## 📊 Code Statistics

- **Total Components**: ~50+ (including UI components)
- **Pages**: 4 (Index, Portal, Admin, NotFound)
- **Contexts**: 1 (AuthContext)
- **Custom Hooks**: 2 (use-mobile, use-toast)
- **Type Definitions**: 1 file (issue.ts)
- **Firebase Services**: 3 (Auth, Firestore, Storage)
- **Lines of Code**: ~3000+ (estimated)

---

## 🚦 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Environment Variables**
   - Create `.env` file
   - Add Firebase config (or use defaults)

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

---

## 📚 Additional Notes

- **Map Default Location**: Delhi, India (28.7041, 77.1025)
- **Demo Issues**: Always visible, cannot be deleted
- **User Issues**: Stored in localStorage, cleared on logout
- **Theme**: Persists in localStorage
- **Routing**: Client-side routing with React Router
- **Deployment**: Configured for Netlify with SPA redirects

---

This codebase represents a fully functional civic engagement platform with modern React architecture, Firebase backend integration (partially implemented), and a polished UI using shadcn/ui components.

