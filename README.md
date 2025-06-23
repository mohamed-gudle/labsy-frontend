# Labsy Frontend

A modern, AI-powered design platform for custom apparel and product customization. Built with Next.js 15, TypeScript, and cutting-edge design tools to deliver an exceptional user experience for creators, manufacturers, and customers.

## 🚀 Overview

Labsy Frontend is a comprehensive web application that enables users to design custom products, manage print areas, upload designs, and handle the complete lifecycle of custom merchandise. The platform serves multiple user types including designers, factory administrators, and end customers.

### Key Features

- **🎨 Interactive Design Editor**: Konva-powered canvas for real-time design editing
- **👤 Multi-User Authentication**: Firebase Auth with role-based access control
- **📱 Responsive Design**: Mobile-first approach with Tailwind CSS
- **🔧 Admin Product Management**: Complete CRUD operations for base products
- **🖼️ Advanced Print Area Configuration**: Visual print area selection and management
- **☁️ Cloud Integration**: Firebase authentication and cloud storage
- **🎯 Type-Safe Development**: Full TypeScript implementation with Zod validation

## 🛠️ Technology Stack

### Core Framework & Language
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[React 19](https://react.dev/)** - Latest React features and hooks

### UI & Styling
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Shadcn/ui](https://ui.shadcn.com/)** - Modern component library
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible components
- **[Lucide React](https://lucide.dev/)** - Beautiful icons

### Design & Canvas
- **[Konva](https://konvajs.org/)** - 2D canvas rendering engine
- **[React Konva](https://konvajs.org/docs/react/)** - React wrapper for Konva
- **[Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)** - Native canvas operations

### Authentication & Backend
- **[Firebase Auth](https://firebase.google.com/docs/auth)** - Authentication service
- **[Axios](https://axios-http.com/)** - HTTP client with interceptors
- **[SWR](https://swr.vercel.app/)** - Data fetching and caching

### Form Management & Validation
- **[React Hook Form](https://react-hook-form.com/)** - Performant forms
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)** - Validation resolvers

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[PostCSS](https://postcss.org/)** - CSS processing
- **[Yarn](https://yarnpkg.com/)** - Package manager

## 📁 Project Structure

The project follows a feature-based architecture with clear separation of concerns:

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   │   ├── sign-in/              # Sign in page
│   │   ├── sign-up/              # Sign up page
│   │   └── reset-password/       # Password reset
│   ├── (dashboard)/              # Protected dashboard routes
│   │   ├── admin/                # Admin-only features
│   │   │   └── base-products/    # Product management
│   │   ├── editor/[id]/          # Design editor
│   │   └── base-products/        # Product catalog
│   ├── globals.css               # Global styles
│   └── layout.tsx                # Root layout
│
├── components/                   # Reusable UI components
│   ├── ui/                       # Shadcn UI components
│   ├── auth/                     # Authentication components
│   ├── designs/                  # Design editor components
│   ├── base-products/            # Product components
│   ├── layout/                   # Layout components
│   └── assets/                   # SVG assets (t-shirt mockups)
│
├── lib/                          # Core utilities and configurations
│   ├── api/                      # API client functions
│   ├── schemas/                  # Zod validation schemas
│   ├── types/                    # TypeScript type definitions
│   ├── hooks/                    # Custom React hooks
│   ├── contexts/                 # React context providers
│   ├── firebase/                 # Firebase configuration
│   ├── axios.ts                  # HTTP client setup
│   └── utils.ts                  # Utility functions
│
├── context/                      # Global state management
│   └── auth-context.tsx          # Authentication context
│
├── guards/                       # Route protection
│   └── auth-guard.tsx            # Authentication guard
│
├── utils/                        # Feature-specific utilities
│   ├── auth/                     # Auth utility functions
│   ├── designs/                  # Design helper functions
│   └── products/                 # Product utilities
│
└── mocks/                        # Mock data and assets
    └── base-products.json        # Sample product data
```

## 🎯 Key Features Deep Dive

### 1. Interactive Design Editor
- **Konva-powered Canvas**: High-performance 2D rendering for design manipulation
- **Multi-layer Support**: Separate layers for base products, color overlays, and designs
- **Real-time Transformations**: Drag, resize, rotate designs with live preview
- **Print Area Constraints**: Designs automatically constrained to defined print areas
- **Color Overlay System**: Dynamic product color changes with blend modes

### 2. Authentication & Authorization
- **Firebase Integration**: Secure authentication with multiple providers
- **Role-based Access**: Different UI/UX for admins, creators, and customers
- **Protected Routes**: AuthGuard component for route-level protection
- **Token Management**: Automatic token refresh and error handling
- **Onboarding Flows**: User type-specific setup processes

### 3. Product Management
- **Visual Print Area Selection**: Interactive canvas for defining printable regions
- **Mockup Upload**: Support for high-resolution product images
- **Multi-format Support**: PNG, JPEG, SVG design file uploads
- **Coordinate System**: Precise print area positioning with real-time feedback
- **Responsive Preview**: Zoom, pan, and grid tools for accurate placement

### 4. Type Safety & Validation
- **Comprehensive Schemas**: Zod schemas for all data structures
- **Runtime Validation**: Client-side and server-side data validation
- **Type Inference**: Automatic TypeScript types from Zod schemas
- **Error Boundaries**: Graceful error handling with user-friendly messages

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.17 or later
- **Yarn** package manager
- **Firebase project** (for authentication)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd labsy-frontend
```

2. **Install dependencies**
```bash
yarn install
```

3. **Environment Configuration**
Create a `.env.local` file with the following variables:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001
```

4. **Start the development server**
```bash
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Available Scripts

```bash
# Development server with Turbopack
yarn dev

# Production build
yarn build

# Start production server
yarn start

# Code linting
yarn lint
```

## 🤖 AI Co-Developer Integration

This project leverages AI-powered development assistance throughout the codebase:

### GitHub Copilot Integration
- **Intelligent Code Completion**: Context-aware suggestions for TypeScript/React
- **Pattern Recognition**: Consistent coding patterns across components
- **Comment-driven Development**: Natural language comments generate implementation
- **Test Generation**: AI-assisted test case creation and validation

### AI-Enhanced Features
- **Smart Component Generation**: AI helps scaffold new components following project patterns
- **Type Inference**: Intelligent TypeScript type suggestions and corrections
- **Error Resolution**: AI-powered debugging and error fixing suggestions
- **Documentation**: Automated documentation generation for complex functions

### Best Practices for AI Development
1. **Clear Comments**: Use descriptive comments to guide AI suggestions
2. **Consistent Patterns**: Follow established patterns for better AI understanding
3. **Type Annotations**: Provide explicit types for better AI context
4. **Incremental Development**: Build features step-by-step for optimal AI assistance

## 🎨 Design System

### Color Palette
The application uses a sophisticated color system built on CSS custom properties:

- **Primary**: Blue-based palette for main actions
- **Secondary**: Gray-based palette for secondary elements
- **Accent**: Highlight colors for important UI elements
- **Semantic**: Success, warning, and error states

### Typography
- **Primary Font**: Inter - Clean, modern sans-serif
- **Secondary Font**: Poppins - Friendly, approachable headings
- **Font Scales**: Responsive typography with fluid scaling

### Component Architecture
- **Atomic Design**: Components organized by complexity (atoms, molecules, organisms)
- **Compound Components**: Complex UI patterns with multiple sub-components
- **Polymorphic Components**: Flexible components with `as` prop support
- **Theme Integration**: Consistent theming across all components

## 🔧 Configuration Files

### Next.js Configuration (`next.config.ts`)
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {}, // Turbopack for faster development
  },
  webpack: (config) => {
    // Canvas module aliasing for Konva compatibility
    config.resolve.alias.canvas = false;
    return config;
  },
};

export default nextConfig;
```

### Tailwind Configuration (`tailwind.config.js`)
- **Custom Color System**: Extended color palette with semantic naming
- **Typography Scale**: Responsive font sizes and line heights
- **Spacing System**: Consistent spacing based on 4px grid
- **Breakpoint System**: Mobile-first responsive breakpoints

### TypeScript Configuration (`tsconfig.json`)
- **Strict Mode**: Enabled for maximum type safety
- **Path Mapping**: Absolute imports with `@/` prefix
- **Modern Target**: ES2022 for latest JavaScript features

## 🔐 Authentication Flow

### User Journey
1. **Landing**: Public pages accessible to all users
2. **Authentication**: Firebase-powered sign up/sign in
3. **Onboarding**: Role-specific setup flow
4. **Dashboard**: Personalized experience based on user type
5. **Features**: Access to role-appropriate functionality

### Security Features
- **Route Protection**: AuthGuard component for protected routes
- **Token Validation**: Automatic token refresh and validation
- **Error Handling**: Graceful handling of authentication errors
- **Session Management**: Secure session handling with automatic cleanup

## 📊 State Management

### Context Providers
- **AuthProvider**: Global authentication state and methods
- **UploadedDesignsProvider**: Design management and storage
- **ThemeProvider**: Theme and styling configuration

### Custom Hooks
- **useAuth**: Authentication state and methods
- **useDesignStates**: Design editor state management
- **useColorOverlay**: Product color visualization
- **useCanvasSize**: Responsive canvas sizing

## 🧪 Development Workflow

### Code Quality
- **ESLint**: Configured with Next.js and TypeScript rules
- **TypeScript**: Strict mode for maximum type safety
- **Prettier**: Consistent code formatting (integrated with ESLint)
- **Husky**: Pre-commit hooks for quality checks

### Component Development
1. **Design First**: Start with Figma/design specifications
2. **Type Definition**: Define TypeScript interfaces
3. **Component Structure**: Build component with proper props
4. **Styling**: Apply Tailwind classes following design system
5. **Documentation**: Add JSDoc comments for complex logic
6. **Testing**: Create test cases for critical functionality

### AI-Assisted Development Tips
- Use descriptive variable names for better AI suggestions
- Write clear comments explaining complex business logic
- Break down large functions into smaller, focused utilities
- Leverage TypeScript types for better AI context understanding

## 🚀 Deployment

### Vercel Deployment (Recommended)
1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Environment Variables**: Add all required environment variables
3. **Build Settings**: Vercel automatically detects Next.js configuration
4. **Deploy**: Automatic deployments on main branch pushes

### Manual Deployment
```bash
# Build the application
yarn build

# Start production server
yarn start
```

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]
```

## 📈 Performance Optimizations

### Next.js Features
- **App Router**: Latest Next.js routing with improved performance
- **Turbopack**: Fast development builds
- **Image Optimization**: Automatic image optimization and lazy loading
- **Font Optimization**: Automatic font loading optimization

### Canvas Performance
- **Konva Optimization**: Efficient rendering with layer management
- **Image Caching**: Smart caching for uploaded designs and mockups
- **Lazy Loading**: Components and images loaded on demand
- **Memory Management**: Proper cleanup of canvas resources

### Bundle Optimization
- **Tree Shaking**: Automatic removal of unused code
- **Code Splitting**: Automatic route-based code splitting
- **Dynamic Imports**: Load heavy components on demand
- **Asset Optimization**: Optimized images, fonts, and static assets

## 🤝 Contributing

We welcome contributions from the community! Here's how to get started:

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Follow the coding standards and use AI assistance when helpful
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Coding Standards
- **TypeScript**: Use strict typing throughout
- **Component Naming**: Use PascalCase for components
- **File Naming**: Use kebab-case for files
- **Import Organization**: Group and sort imports logically
- **Comments**: Use JSDoc for complex functions and components

### AI Development Guidelines
- Leverage GitHub Copilot for code suggestions
- Use descriptive comments to guide AI assistance
- Review AI-generated code for accuracy and efficiency
- Maintain human oversight for critical business logic

## 📝 Changelog

See [Changelog.md](./Changelog.md) for detailed changes and version history.

## 📄 License

This project is proprietary software. All rights reserved.

---

**Built with ❤️ by the Labsy team using cutting-edge technologies and AI-powered development tools.**
