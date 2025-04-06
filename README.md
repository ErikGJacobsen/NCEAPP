# VueMap - Interactive Map Application

A Vue.js application with an interactive map interface, built with modern web technologies and Docker support.

## Features

- Interactive SVG map with clickable regions
- Vue.js 3 with TypeScript support
- Docker containerization
- Nginx for production serving
- Responsive design
- State management with Pinia
- Automated Docker builds via GitHub Actions

## Tech Stack

- Vue.js 3.5.13
- TypeScript 5.8.0
- Vite 6.2.1
- Pinia for state management
- Docker with Nginx

## Getting Started

### Prerequisites

- Node.js 18 or higher
- Docker

### Development

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

### Docker Deployment

#### Using Pre-built Image

Pull and run the latest image from GitHub Container Registry:
```bash
docker pull ghcr.io/erikgjacobsen/nceapp:latest
docker run -d -p 8080:80 --name vuemap ghcr.io/erikgjacobsen/nceapp:latest
```

#### Building Locally

1. Build the Docker image:
```bash
docker build -t vuemap .
```

2. Run the container:
```bash
docker run -d -p 8080:80 --name vuemap vuemap
```

The application will be available at http://localhost:8080

## Docker Tags

The following tags are available on the GitHub Container Registry:
- `latest`: Latest stable version from the main branch
- `vX.Y.Z`: Specific version releases
- `main`: Latest build from the main branch
- `sha-XXXXXXX`: Specific commit builds

## Project Structure

```
/src
  /assets      - Static assets and SVG maps
  /components  - Vue components
  /router      - Route definitions
  /stores      - Pinia stores
  /views       - Page components
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
