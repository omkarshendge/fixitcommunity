
# CivicConnect - Community Infrastructure Reporting Platform

CivicConnect is a web application that enables citizens to report infrastructure issues in their communities and track government responses. By connecting communities with local authorities, we aim to improve infrastructure maintenance and responsiveness.

![CivicConnect Interface](public/placeholder.svg)

## Features

- **Report Infrastructure Issues**: Submit detailed reports with images, locations, and descriptions
- **Track Issue Status**: Monitor the progress of reported issues from pending to resolved
- **Community Dashboard**: View statistics and recent reports in your community
- **User Authentication**: Secure login and registration system
- **Upvote System**: Support important issues to increase their visibility
- **Comments**: Discuss issues with other community members and government representatives

## Technology Stack

This project is built with:

- **React**: Front-end UI library
- **React Router**: For navigation between pages
- **Tailwind CSS**: For responsive styling
- **shadcn/ui**: Component library for consistent UI design
- **Lucide React**: For beautiful icons
- **React Hook Form**: For form validation and submission
- **React Query**: For data fetching and state management

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/civic-connect.git
   cd civic-connect
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:8080
   ```

## Project Structure

```
src/
├── components/         # Reusable UI components
├── pages/              # Page components
├── types/              # Type definitions
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── App.jsx             # Main application component
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Thanks to all contributors who have helped shape this project
- Special thanks to the shadcn/ui team for their excellent component library
- The Lovable AI platform for assisting with development

