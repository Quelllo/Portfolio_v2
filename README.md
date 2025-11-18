# Modern Portfolio Website

A sleek, animated portfolio website built with React, Tailwind CSS, and Framer Motion.

## ✨ Features

- **Smooth Animations**: Framer Motion powers all entrance, scroll, and hover animations
- **Responsive Design**: Fully responsive across all devices
- **Modern UI**: Clean, minimal design with a professional aesthetic
- **Interactive Elements**: Hover effects, smooth scrolling, and animated transitions
- **Sections**:
  - Hero with animated background
  - About with skills showcase
  - Projects with hover effects and grid layout
  - Contact form with social links
  - Sticky navigation with active section highlighting

## 🛠️ Tech Stack

- **React** (with Vite)
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icon library

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Customization

### Update Personal Information

1. **Hero Section** (`src/sections/Hero.jsx`)
   - Change "Your Name" to your name
   - Update the tagline

2. **About Section** (`src/sections/About.jsx`)
   - Replace the placeholder image/emoji with your photo
   - Update the biography text
   - Customize skills if needed

3. **Projects Section** (`src/sections/Projects.jsx`)
   - Replace dummy projects with your real projects
   - Update images, descriptions, tags, and links

4. **Contact Section** (`src/sections/Contact.jsx`)
   - Update social media links
   - Replace email address
   - **Set up EmailJS** (see below)

5. **Footer** (`src/components/Footer.jsx`)
   - Update copyright text with your name

### Customize Colors

Edit `tailwind.config.js` to change the accent color:

```js
theme: {
  extend: {
    colors: {
      accent: '#6366f1', // Change this hex value
    },
  },
},
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Navigation.jsx    # Sticky navigation with smooth scroll
│   └── Footer.jsx        # Footer component
├── sections/
│   ├── Hero.jsx         # Hero section with animations
│   ├── About.jsx        # About section with skills
│   ├── Projects.jsx     # Projects grid with hover effects
│   └── Contact.jsx      # Contact form and social links
├── App.jsx              # Main app component
├── main.jsx             # Entry point
└── index.css            # Global styles with Tailwind
```

## 🎨 Design Features

- **Gradient backgrounds** with animated shapes
- **Card hover effects** with scale and glow
- **Smooth scroll** to sections
- **Active section highlighting** in navigation
- **Responsive grid layouts**
- **Mobile-friendly** navigation menu
- **Entrance animations** when scrolling into view

## 📧 Setting Up Contact Form (EmailJS)

The contact form uses EmailJS to send emails without a backend. Follow these steps:

1. **Sign up for EmailJS** (free tier available)
   - Go to [https://www.emailjs.com/](https://www.emailjs.com/)
   - Create a free account

2. **Set up Email Service**
   - Go to "Email Services" in the dashboard
   - Add a service (Gmail, Outlook, etc.)
   - Copy the **Service ID**

3. **Create Email Template**
   - Go to "Email Templates"
   - Create a new template
   - Use these variables in your template:
     - `{{from_name}}` - Sender's name
     - `{{from_email}}` - Sender's email
     - `{{message}}` - Message content
     - `{{to_email}}` - Your email (enquiries@tomkonarski.com)
   - Copy the **Template ID**

4. **Get Public Key**
   - Go to "Account" → "General"
   - Copy your **Public Key**

5. **Add Environment Variables**
   - Create a `.env` file in the root directory
   - Add your credentials:
     ```
     VITE_EMAILJS_SERVICE_ID=your_service_id
     VITE_EMAILJS_TEMPLATE_ID=your_template_id
     VITE_EMAILJS_PUBLIC_KEY=your_public_key
     ```
   - **Important**: Add `.env` to `.gitignore` to keep your keys secure!

6. **Restart Dev Server**
   - Stop and restart `npm run dev` after adding environment variables

The form will now send emails to `enquiries@tomkonarski.com` when submitted!

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

## 📄 License

This project is open source and available for personal and commercial use.

---

Built with ❤️ using React, Tailwind CSS, and Framer Motion
