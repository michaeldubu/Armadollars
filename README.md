# Andy's Armadollars

An employee reward and management system for Texas Roadhouse #647.

## Features

- Employee reward tracking system
- Task management
- Complaint handling
- Administrative dashboard
- Manager dashboard
- Server dashboard

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm 7.x or later

### Installation

1. Clone the repository:
```bash
git clone https://github.com/michaeldubu/Armadollars.git
```

2. Install dependencies:
```bash
cd Armadollars
npm install
```

3. Create a `.env.local` file:
```bash
cp .env.example .env.local
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

The application can be deployed using the included deployment script:
```bash
bash deployment-script.sh
```

Make sure to update the domain name and SSL certificate details in the deployment script.
