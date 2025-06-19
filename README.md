# California Fire Defense Landscaping Website

A comprehensive platform for creating fire-resistant landscapes using native California plants.

## Quick Start

1. Setup environment variables:
   - Copy `.env.example` files and add your API keys
   - Set up PostgreSQL database

2. Install dependencies:
   ```bash
   npm install
   cd apps/web && npm install
   cd ../api && npm install
   ```

3. Start development servers:
   ```bash
   npm run dev
   ```

4. Open http://localhost:3000 to view the application

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS, React-Leaflet
- **Backend**: Node.js, Express, Prisma, PostgreSQL
- **Database**: PostgreSQL with PostGIS extension
- **Deployment**: Vercel (frontend), Railway (backend)

## Development Tools

- **AI Assistance**: Cursor IDE, GitHub Copilot
- **Database**: Prisma ORM with PostgreSQL
- **Maps**: Leaflet with OpenStreetMap tiles
- **UI Components**: Shadcn/ui

## API Integrations

- CAL FIRE historical fire data
- CalFlora native plant database
- Weather APIs for fire risk assessment
- Geospatial services for location analysis

