# Trust HealthCare - Frontend

_A modern and accessible medical appointment scheduling system_

## 🚀 Technologies Used

- **Framework**: Next.js (React)
- **Languages**: TypeScript, JavaScript
- **State Management**: React Context API
- **Styling**: Tailwind CSS
- **Authentication**: JWT Authentication
- **API Client**: Axios
- **Form Handling**: React Hook Form & Yup
- **Image Uploads**: Amazon S3 (previously Cloudinary)
- **Testing**: Jest, React Testing Library
- **Deployment**: Vercel

## 📦 Key Features

- User authentication (JWT-based login & registration)
- Patient appointment scheduling system
- Doctor profile management
- Medical records access
- Real-time notifications & messaging
- Secure image and file uploads (Amazon S3)
- Responsive UI/UX with accessibility best practices

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Thobbytosin/trust-healthcare-frontend.git
   cd trust-healthcare-frontend
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Environment Setup**
   - Create a `.env.local` file and configure environment variables based on `.env.example`
4. **Run the development server**
   ```bash
   npm run dev
   ```

## 📡 API Integration

The frontend communicates with the backend via RESTful API endpoints. Ensure that the backend is running and update API base URLs in the `.env.local` file.

## 🧪 Testing

Run unit and integration tests:

```bash
   npm test
```

## 🚀 Deployment

The project is deployed on **Vercel**. To deploy:

1. Push changes to the repository
2. Connect the repo to Vercel (if not already linked)
3. Deploy using Vercel CLI:
   ```bash
   vercel --prod
   ```

## 🤝 Contributing

- Fork the project
- Create your feature branch (`git checkout -b feature/AmazingFeature`)
- Commit your changes (`git commit -m 'Add some AmazingFeature'`)
- Push to the branch (`git push origin feature/AmazingFeature`)
- Open a Pull Request

## 📜 License

Distributed under the MIT License. See LICENSE for more information.

## 📬 Contact

Project Maintainer - **Falode Tobi**  
Project Link: https://github.com/Thobbytosin/trust-healthcare-frontend
