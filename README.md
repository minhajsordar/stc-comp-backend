# STC Backend API

A RESTful API backend for the specialist marketplace built with Express.js 5, TypeORM, and PostgreSQL.

## Tech Stack

- **Framework:** Express.js 5.1.0
- **ORM:** TypeORM 0.3.28
- **Database:** PostgreSQL
- **File Upload:** Multer 2.0.2
- **Language:** TypeScript 5
- **Testing:** Jest 30

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database

### Installation

```bash
# Clone the repository
git clone https://github.com/minhajsordar/stc-comp-backend.git
cd express-ts-starter-main

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5005
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=stc_db
```

### Database Setup

Ensure PostgreSQL is running and the database exists:

```sql
CREATE DATABASE stc_db;
```

TypeORM will automatically sync the schema on startup.

### Running the Server

```bash
# Build TypeScript
npm run build

# Start development server (with auto-reload)
npm run dev

# Start production server
npm start
```

The API will be available at `http://localhost:5005/api`

## Project Structure

```
src/
├── config/               # Configuration files
│   └── upload.ts         # Multer file upload config
├── modules/              # Feature modules
│   ├── specialists/      # Specialist management
│   │   ├── specialist.entity.ts
│   │   ├── specialist.controller.ts
│   │   ├── specialist.service.ts
│   │   └── specialist.routes.ts
│   ├── media/            # Media/file management
│   │   ├── media.entity.ts
│   │   ├── media.controller.ts
│   │   ├── media.service.ts
│   │   └── media.routes.ts
│   └── service-offerings/ # Service offerings
│       ├── service-offering.entity.ts
│       ├── service-offering.controller.ts
│       ├── service-offering.service.ts
│       └── service-offering.routes.ts
├── routes/               # Route aggregation
│   └── index.ts          # Main router
└── index.ts              # Application entry point
```

## API Endpoints

### Specialists

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/specialists` | Get all specialists (paginated) |
| `GET` | `/api/specialists/published` | Get published specialists only |
| `GET` | `/api/specialists/:id` | Get specialist by ID |
| `GET` | `/api/specialists/slug/:slug` | Get specialist by slug |
| `POST` | `/api/specialists` | Create new specialist |
| `PUT` | `/api/specialists/:id` | Update specialist |
| `PUT` | `/api/specialists/:id/publish` | Publish specialist |
| `PUT` | `/api/specialists/:id/unpublish` | Unpublish specialist |
| `DELETE` | `/api/specialists/:id` | Soft delete specialist |

**Query Parameters for GET /specialists:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `search` - Search by title/description
- `status` - Filter by verification status
- `is_draft` - Filter drafts (true/false)

### Media

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/media/specialist/:specialistId` | Get media by specialist |
| `GET` | `/api/media/file/:id` | Get/download media file |
| `POST` | `/api/media/upload/:specialistId` | Upload media file |
| `POST` | `/api/media` | Create media record |
| `PUT` | `/api/media/specialist/:specialistId/order` | Update media display order |
| `DELETE` | `/api/media/:id` | Delete media |

### Service Offerings

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/service-offerings/master-list` | Get all master service offerings |
| `POST` | `/api/service-offerings/master-list` | Create master offering |
| `GET` | `/api/service-offerings/specialist/:specialistId` | Get offerings by specialist |
| `POST` | `/api/service-offerings/specialist/:specialistId` | Add offerings to specialist |
| `DELETE` | `/api/service-offerings/specialist/:specialistId/:offeringId` | Remove offering from specialist |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with nodemon |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Start production server |
| `npm run watch` | Watch mode for TypeScript compilation |
| `npm test` | Run Jest tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run clean` | Remove dist folder |

## Database Entities

### Specialist
- `id` - UUID primary key
- `title` - Specialist title
- `slug` - URL-friendly slug
- `description` - Description text
- `base_price`, `platform_fee`, `final_price` - Pricing
- `is_draft` - Draft status
- `is_verified` - Verification status
- `verification_status` - Verification state
- `average_rating`, `total_number_of_ratings` - Rating data
- `duration_days` - Service duration

### Media
- `id` - UUID primary key
- `specialist_id` - FK to specialist
- `file_name` - Original filename
- `file_size` - File size in bytes
- `mime_type` - MIME type
- `media_type` - Type (image/video)
- `display_order` - Display ordering

### ServiceOfferingsMasterList
- `id` - UUID primary key
- `title` - Offering title
- `description` - Offering description
- `s3_key`, `bucket_name` - S3 storage info