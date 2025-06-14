# Perla Dunării AI Tourism Platform

## Overview

This is a full-stack web application built for tourism analytics and management. The platform provides an AI-powered dashboard for monitoring tourism data, managing user experiences, and analyzing visitor patterns. It features a React TypeScript frontend with a comprehensive UI component library and an Express.js backend with PostgreSQL database support.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and theming
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API structure with `/api` prefix
- **Development Server**: Custom Vite integration for hot module replacement
- **Error Handling**: Centralized error middleware with structured responses

### Data Layer
- **Database**: PostgreSQL (configured for deployment)
- **ORM**: Drizzle ORM for type-safe database interactions
- **Schema**: Centralized schema definitions in TypeScript
- **Development Storage**: In-memory storage implementation for development
- **Migrations**: Drizzle Kit for database schema management

## Key Components

### Frontend Components
- **Dashboard**: Main analytics interface with real-time tourism data visualization
- **UI Library**: Complete set of reusable components including forms, dialogs, charts, and data displays
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Accessibility**: Full ARIA compliance through Radix UI primitives

### Backend Services
- **Storage Interface**: Abstracted storage layer supporting both memory and database implementations
- **Route Registration**: Modular route system for API endpoints
- **Static File Serving**: Integrated static file serving for production builds
- **Development Tools**: Request logging and performance monitoring

### Database Schema
- **Users Table**: Basic user authentication with username/password
- **Extensible Design**: Schema designed for easy extension with additional tourism-related entities
- **Type Safety**: Full TypeScript integration with Drizzle schema definitions

## Data Flow

1. **Client Requests**: Frontend makes API calls through TanStack Query
2. **API Processing**: Express routes handle requests using the storage interface
3. **Data Access**: Storage layer abstracts database operations
4. **Response**: Structured JSON responses with proper error handling
5. **State Management**: Client updates UI state through React Query cache

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL driver for Neon database
- **@tanstack/react-query**: Server state management
- **drizzle-orm**: Type-safe ORM for database operations
- **express**: Web application framework
- **react**: Frontend framework
- **vite**: Build tool and development server

### UI Dependencies
- **@radix-ui/react-***: Accessible UI primitives
- **lucide-react**: Icon library
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Utility for conditional CSS classes

### Development Dependencies
- **typescript**: Type checking and compilation
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production builds

## Deployment Strategy

### Development Environment
- **Command**: `npm run dev`
- **Port**: 5000 (configured in .replit)
- **Features**: Hot module replacement, TypeScript compilation, API proxy

### Production Build
- **Frontend Build**: Vite compiles React app to static files
- **Backend Build**: esbuild bundles Express server with external dependencies
- **Output**: `dist/` directory with both client and server builds

### Platform Configuration
- **Replit Environment**: Configured for Node.js 20 with PostgreSQL 16
- **Auto-scaling**: Deployment target set to autoscale
- **Port Mapping**: Internal port 5000 mapped to external port 80

### Database Setup
- **Schema Management**: `npm run db:push` applies schema changes
- **Environment Variables**: `DATABASE_URL` required for PostgreSQL connection
- **Fallback**: Memory storage for development without database

## Changelog

```
Changelog:
- June 14, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```