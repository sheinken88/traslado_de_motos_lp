# MotoTransfer - Motorcycle Transport Service Landing Page

A premium motorcycle transport service landing page built with Next.js, TailwindCSS, and designed for the Argentine market.

## 🚀 Features

- **Modern Design**: Premium, adventure-focused design inspired by luxury off-road vehicle websites
- **Multi-language Support**: Spanish (default), English, and Portuguese with i18n structure ready
- **SEO Optimized**: Dynamic metadata, proper heading structure, and semantic HTML
- **Responsive**: Mobile-first design that works on all devices
- **Interactive Components**: Quote form, FAQ accordion, testimonials carousel
- **Performance**: Optimized images, lazy loading, and fast loading times

## 🎨 Design System

### Colors

- **Primary**: Black (#0D0D0D)
- **Accent**: Yellow (#FFD100)
- **Alert**: Red (#E53935)
- **Backgrounds**: Alternating black, white, grey

### Typography

- **Headings**: Bebas Neue (bold, clean)
- **Body**: Inter (readable, modern)

## 📁 Project Structure

\`\`\`
├── app/
│ ├── layout.tsx # Root layout with metadata
│ ├── page.tsx # Main landing page
│ └── globals.css # Global styles
├── components/
│ ├── Header.tsx # Navigation with language selector
│ ├── Hero.tsx # Hero section with CTA
│ ├── HowItWorks.tsx # 3-step process
│ ├── WhyChooseUs.tsx # Features grid
│ ├── Testimonials.tsx # Customer testimonials
│ ├── PopularDestinations.tsx # Route pricing table
│ ├── FAQ.tsx # Accordion FAQ section
│ ├── QuoteForm.tsx # Contact/quote form
│ ├── Footer.tsx # Footer with contact info
│ ├── WhatsAppButton.tsx # Floating WhatsApp button
│ └── Logo.tsx # Custom SVG logo
├── public/
│ └── locales/ # Translation files
│ ├── es/translation.json
│ ├── en/translation.json
│ └── pt/translation.json
└── README.md
\`\`\`

## 🌐 Multi-language Support

The project is structured for easy internationalization:

- **Default Language**: Spanish (Argentina)
- **Supported Languages**: English, Portuguese
- **Translation Files**: Located in `/public/locales/`
- **Language Selector**: Available in header (desktop and mobile)

### Adding New Languages

1. Create new translation file in `/public/locales/[locale]/translation.json`
2. Add locale to language selector in `Header.tsx`
3. Update metadata in `layout.tsx` for new locale

## 📝 Content Management

### Images to Replace

- Hero background: Motorcycle loading/transport scene
- Customer testimonial photos
- Destination route maps
- Process step illustrations

### Content to Customize

- Contact information (phone, email, address)
- WhatsApp number
- Pricing information
- Testimonial content
- FAQ answers
- Company details

## 🚀 Getting Started

1. **Install Dependencies**
   \`\`\`bash
   npm install
   \`\`\`

2. **Run Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Build for Production**
   \`\`\`bash
   npm run build
   npm start
   \`\`\`

## 📧 Email Integration

The quote form is integrated with Resend for email delivery to `heinken.sebastian@gmail.com`.

### Setup Email Service

1. **Get Resend API Key**

   - Sign up at [Resend](https://resend.com)
   - Get your API key from the dashboard

2. **Environment Configuration**
   Create a `.env.local` file:
   \`\`\`bash

   # Email service

   RESEND_API_KEY=your_resend_api_key_here

   # Google Sheets (existing)

   TRASLADO_DE_MOTOS_API_KEY=your_google_sheets_api_key
   GOOGLE_SHEETS_ID=your_google_sheets_id
   \`\`\`

3. **Domain Verification** (Optional but recommended)
   - Verify your domain in Resend dashboard
   - Update the `from` email in `app/api/contact/route.ts`

### How it Works

- Form submissions are sent to `/api/contact`
- Emails are sent to `heinken.sebastian@gmail.com`
- If no API key is configured, form data is logged to console
- Users always see success message for good UX

### Email Content Includes

- Customer contact information
- Trip details (origin, destination, bike type)
- Service preferences (insurance, pickup)
- Additional comments

## 🎯 SEO Optimization

The site includes:

- Dynamic metadata per page/language
- Semantic HTML structure
- Proper heading hierarchy (H1, H2, H3)
- Alt text for images
- Schema markup ready structure
- Fast loading times
- Mobile-first responsive design

## 📱 WhatsApp Integration

The floating WhatsApp button is configured to:

- Open WhatsApp with pre-filled message
- Include service inquiry text
- Work on both mobile and desktop

Update the phone number in `WhatsAppButton.tsx`:
\`\`\`typescript
const phoneNumber = "5491135939730" // Actual WhatsApp number
\`\`\`

## 🚀 Deployment

Ready for deployment to Vercel:

1. **Connect to Vercel**
   \`\`\`bash
   vercel
   \`\`\`

2. **Environment Variables** (if needed)

   - Add any API keys or configuration in Vercel dashboard

3. **Custom Domain**
   - Configure custom domain in Vercel settings

## 📊 Performance

- **Lighthouse Score**: Optimized for 90+ scores
- **Core Web Vitals**: Meets Google's performance standards
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic with Next.js App Router

## 🔧 Customization

### Brand Colors

Update colors in `tailwind.config.js`:
\`\`\`javascript
colors: {
black: '#0D0D0D', // Primary brand color
yellow: {
400: '#FFD100', // Accent color
300: '#FFED4E', // Hover state
},
}
\`\`\`

### Typography

Update fonts in `globals.css` and `tailwind.config.js`

### Logo

Replace the SVG in `Logo.tsx` with your custom logo

## 📞 Support

For technical support or customization requests, contact the development team.

---

**Built with ❤️ for the Argentine motorcycle community**
