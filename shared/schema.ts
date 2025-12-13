import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Service type definition
export interface Service {
  id: string;
  title: string;
  tagline: string;
  icon: string;
  slug: string;
}

// Project type definition
export interface Project {
  id: string;
  serviceId: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  galleryImages: string[];
  clientName: string;
  clientIndustry: string;
  clientLocation: string;
  websiteUrl: string;
  duration: string;
  completedDate: string;
  technologies: string[];
  features: string[];
  outcomes: string[];
}

// Sample services data
export const services: Service[] = [
  {
    id: "1",
    title: "Website Development",
    tagline: "Modern Web Solutions",
    icon: "Globe",
    slug: "website-development"
  },
  {
    id: "2",
    title: "Mobile Application Development",
    tagline: "iOS & Android Apps",
    icon: "Smartphone",
    slug: "mobile-application-development"
  },
  {
    id: "3",
    title: "Software Development",
    tagline: "Custom Software",
    icon: "Code",
    slug: "software-development"
  },
  {
    id: "4",
    title: "Digital Marketing",
    tagline: "Growth Strategies",
    icon: "TrendingUp",
    slug: "digital-marketing"
  }
];

// Sample projects data
export const projects: Project[] = [
  // Website Development Projects
  {
    id: "w1",
    serviceId: "1",
    name: "TechStart Corporate Site",
    shortDescription: "A modern corporate website with dynamic content management and seamless user experience.",
    fullDescription: "We developed a comprehensive corporate website for TechStart, a leading technology consulting firm. The project included a custom CMS, interactive service showcases, client testimonials section, and an integrated blog platform. The design focuses on clean aesthetics with powerful functionality to convert visitors into leads.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&h=400&fit=crop"
    ],
    clientName: "TechStart Inc.",
    clientIndustry: "Technology Consulting",
    clientLocation: "San Francisco, CA",
    websiteUrl: "https://techstart-demo.com",
    duration: "3 months",
    completedDate: "October 2024",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Sanity CMS"],
    features: ["Responsive Design", "Custom CMS", "SEO Optimization", "Contact Forms", "Analytics Dashboard", "Blog Platform"],
    outcomes: ["40% increase in lead generation", "60% faster page load times", "50% improvement in user engagement"]
  },
  {
    id: "w2",
    serviceId: "1",
    name: "GreenLeaf E-commerce Platform",
    shortDescription: "Full-featured e-commerce solution with inventory management and payment integration.",
    fullDescription: "GreenLeaf required a robust e-commerce platform to sell their organic products online. We built a complete solution featuring product catalogs, shopping cart functionality, secure payment processing, order tracking, and an admin dashboard for inventory management. The platform handles thousands of daily transactions seamlessly.",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=600&h=400&fit=crop"
    ],
    clientName: "GreenLeaf Organics",
    clientIndustry: "Organic Food & Beverages",
    clientLocation: "Portland, OR",
    websiteUrl: "https://greenleaf-organics.com",
    duration: "4 months",
    completedDate: "September 2024",
    technologies: ["Vue.js", "Node.js", "PostgreSQL", "Stripe", "AWS"],
    features: ["Product Catalog", "Shopping Cart", "Payment Gateway", "Order Tracking", "Inventory Management", "Customer Reviews"],
    outcomes: ["200% increase in online sales", "30% reduction in cart abandonment", "95% customer satisfaction rating"]
  },
  {
    id: "w3",
    serviceId: "1",
    name: "Artisan Portfolio Gallery",
    shortDescription: "Elegant portfolio website showcasing creative work with stunning visual presentations.",
    fullDescription: "Created a visually stunning portfolio website for a collective of digital artists. The site features immersive galleries, smooth animations, artist profiles, and commission request functionality. Special attention was paid to image optimization and lazy loading to ensure fast performance despite heavy visual content.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1561998338-13ad7883b20f?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1482160549825-59d1b23cb208?w=600&h=400&fit=crop"
    ],
    clientName: "Artisan Collective",
    clientIndustry: "Digital Art & Design",
    clientLocation: "New York, NY",
    websiteUrl: "https://artisan-collective.gallery",
    duration: "2 months",
    completedDate: "November 2024",
    technologies: ["Gatsby", "GraphQL", "Framer Motion", "Cloudinary", "Netlify"],
    features: ["Image Galleries", "Artist Profiles", "Commission Forms", "Lightbox Views", "Social Sharing", "Newsletter Integration"],
    outcomes: ["300% increase in portfolio views", "50% growth in commission requests", "Featured in design publications"]
  },

  // Mobile Application Development Projects
  {
    id: "m1",
    serviceId: "2",
    name: "FitTrack Health App",
    shortDescription: "Comprehensive fitness tracking app with workout plans and nutrition guidance.",
    fullDescription: "FitTrack is a full-featured health and fitness application that helps users achieve their wellness goals. The app includes workout tracking, custom exercise plans, nutrition logging, progress photos, and social challenges. Integration with wearable devices provides real-time health metrics and activity monitoring.",
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=400&fit=crop"
    ],
    clientName: "FitLife Technologies",
    clientIndustry: "Health & Fitness Tech",
    clientLocation: "Austin, TX",
    websiteUrl: "https://fittrack-app.io",
    duration: "6 months",
    completedDate: "August 2024",
    technologies: ["React Native", "Firebase", "HealthKit", "Google Fit", "Redux"],
    features: ["Workout Tracking", "Nutrition Logging", "Progress Photos", "Social Challenges", "Wearable Integration", "Custom Plans"],
    outcomes: ["500K+ downloads", "4.8 star rating", "85% user retention rate"]
  },
  {
    id: "m2",
    serviceId: "2",
    name: "QuickDeliver Logistics",
    shortDescription: "Real-time delivery tracking and fleet management mobile solution.",
    fullDescription: "Developed a comprehensive logistics application for QuickDeliver, enabling real-time package tracking, driver management, and route optimization. The app serves both customers and delivery personnel with tailored interfaces. Features include live GPS tracking, push notifications, proof of delivery, and performance analytics.",
    imageUrl: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&h=600&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop"
    ],
    clientName: "QuickDeliver Corp",
    clientIndustry: "Logistics & Delivery",
    clientLocation: "Chicago, IL",
    websiteUrl: "https://quickdeliver.app",
    duration: "5 months",
    completedDate: "July 2024",
    technologies: ["Flutter", "Dart", "Google Maps API", "Node.js", "MongoDB"],
    features: ["Live GPS Tracking", "Route Optimization", "Push Notifications", "Proof of Delivery", "Driver Dashboard", "Customer App"],
    outcomes: ["35% reduction in delivery times", "98% on-time delivery rate", "25% fuel cost savings"]
  },
  {
    id: "m3",
    serviceId: "2",
    name: "MindfulMoments Meditation",
    shortDescription: "Calming meditation app with guided sessions and sleep sounds.",
    fullDescription: "MindfulMoments provides a serene space for users to practice meditation and mindfulness. The app features guided meditation sessions, breathing exercises, sleep stories, ambient sounds, and progress tracking. Beautiful animations and a calming color palette create an immersive relaxation experience.",
    imageUrl: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&h=600&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1474418397713-7ede21d49118?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=600&h=400&fit=crop"
    ],
    clientName: "Wellness Digital",
    clientIndustry: "Mental Health & Wellness",
    clientLocation: "Los Angeles, CA",
    websiteUrl: "https://mindfulmoments.app",
    duration: "4 months",
    completedDate: "June 2024",
    technologies: ["Swift", "Kotlin", "AVFoundation", "Core Animation", "CloudKit"],
    features: ["Guided Meditations", "Sleep Stories", "Breathing Exercises", "Ambient Sounds", "Progress Tracking", "Offline Mode"],
    outcomes: ["1M+ active users", "Top 10 in Health category", "92% would recommend to friends"]
  },

  // Software Development Projects
  {
    id: "s1",
    serviceId: "3",
    name: "PRISM Post Production Management System",
    shortDescription: "Comprehensive studio management software for post-production houses managing film, TV, and advertisement editing workflows.",
    fullDescription: "PRISM is a comprehensive studio management software designed for post-production houses managing film, TV serial, web series, and advertisement editing workflows. The system provides end-to-end management of studio resources, bookings, billing, and conflict resolution with features including centralized booking management with conflict detection, real-time visibility of room and editor availability, automated chalan/invoice generation, and multi-company support for franchise operations.",
    imageUrl: "/attached_assets/Screenshot_2025-12-13_at_10.13.14_AM_1765600998382.png",
    galleryImages: [
      "/attached_assets/Screenshot_2025-12-13_at_10.14.35_AM_1765601079175.png",
      "/attached_assets/Screenshot_2025-12-13_at_10.16.42_AM_1765601205553.png",
      "/attached_assets/Screenshot_2025-12-13_at_10.18.07_AM_1765601290581.png",
      "/attached_assets/Screenshot_2025-12-13_at_10.18.16_AM_1765601299915.png",
      "/attached_assets/Screenshot_2025-12-13_at_10.18.34_AM_1765601318659.png",
      "/attached_assets/Screenshot_2025-12-13_at_10.18.45_AM_1765601329418.png",
      "/attached_assets/Screenshot_2025-12-13_at_10.18.57_AM_1765601340964.png",
      "/attached_assets/Screenshot_2025-12-13_at_10.19.08_AM_1765601351836.png",
      "/attached_assets/Screenshot_2025-12-13_at_10.19.19_AM_1765601361994.png",
      "/attached_assets/Screenshot_2025-12-13_at_10.19.42_AM_1765601385847.png",
      "/attached_assets/Screenshot_2025-12-13_at_10.20.11_AM_1765601414230.png",
      "/attached_assets/Screenshot_2025-12-13_at_10.20.19_AM_1765601422310.png",
      "/attached_assets/Screenshot_2025-12-13_at_10.20.36_AM_1765601438975.png"
    ],
    clientName: "Vishrani Computech",
    clientIndustry: "Media & Entertainment",
    clientLocation: "Mumbai, India",
    websiteUrl: "#",
    duration: "4 weeks",
    completedDate: "December 2024",
    technologies: ["React", "TypeScript", "Node.js", "Express.js", "MySQL", "Tailwind CSS", "Shadcn/ui", "AWS", "S3", "JWT Authentication"],
    features: [
      "Problem: Manual scheduling caused frequent double-bookings | Solution: Automated booking calendar with real-time conflict detection",
      "Problem: No visibility into room/editor availability | Solution: Live dashboard showing resource status across all locations",
      "Problem: Invoice generation was error-prone | Solution: Automated chalan/invoice generation with accurate billing",
      "Problem: Managing multiple studio locations separately | Solution: Multi-company support with centralized control",
      "Problem: Tracking editor leave was disorganized | Solution: Integrated leave management with booking impact analysis",
      "Problem: No standardized access control | Solution: Role-based permissions for different staff levels"
    ],
    outcomes: [
      "Problem: Double-bookings disrupted operations | Result: 100% elimination of scheduling conflicts",
      "Problem: Hours spent on manual invoicing | Result: 80% reduction in billing processing time",
      "Problem: No cross-location visibility | Result: Unified management across all studio locations",
      "Problem: Lost revenue from booking gaps | Result: 35% improvement in studio utilization"
    ]
  },

  // AutoShop Manager Project
  {
    id: "s2",
    serviceId: "3",
    name: "Mauli Car World - AutoShop Manager",
    shortDescription: "Complete car parts & service management system with inventory tracking, customer management, service workflow, and comprehensive business analytics.",
    fullDescription: "AutoShop Manager is a full-stack web application designed specifically for automotive repair shops and car parts businesses. The system helps manage car parts inventory and stock levels, customer relationships and vehicle records, service workflow from inquiry to completion, employee management and HR operations, sales orders and payment tracking, purchase orders and supplier management, task assignments and leave management, and customer communications and feedback. The application provides a professional dashboard interface with role-based access control supporting Admin, Manager, Inventory Manager, Sales Executive, HR Manager, and Service Staff roles, ensuring each user only sees and manages what's relevant to their responsibilities.",
    imageUrl: "/attached_assets/Screenshot_2025-12-13_at_2.52.05_PM_1765617730192.png",
    galleryImages: [
      "/attached_assets/Screenshot_2025-12-13_at_2.52.25_PM_1765617747558.png",
      "/attached_assets/Screenshot_2025-12-13_at_2.52.59_PM_1765617782614.png",
      "/attached_assets/Screenshot_2025-12-13_at_2.53.20_PM_1765617804010.png",
      "/attached_assets/Screenshot_2025-12-13_at_2.53.48_PM_1765617831907.png",
      "/attached_assets/Screenshot_2025-12-13_at_2.54.01_PM_1765617844771.png",
      "/attached_assets/Screenshot_2025-12-13_at_2.54.16_PM_1765617859276.png",
      "/attached_assets/Screenshot_2025-12-13_at_2.54.23_PM_1765617865423.png",
      "/attached_assets/Screenshot_2025-12-13_at_2.54.35_PM_1765617878076.png",
      "/attached_assets/Screenshot_2025-12-13_at_2.54.46_PM_1765617889880.png",
      "/attached_assets/Screenshot_2025-12-13_at_2.55.26_PM_1765617929392.png",
      "/attached_assets/Screenshot_2025-12-13_at_2.55.46_PM_1765617949161.png",
      "/attached_assets/Screenshot_2025-12-13_at_2.55.57_PM_1765617960031.png",
      "/attached_assets/Screenshot_2025-12-13_at_2.56.06_PM_1765617969242.png",
      "/attached_assets/Screenshot_2025-12-13_at_2.56.19_PM_1765617982310.png",
      "/attached_assets/Screenshot_2025-12-13_at_2.56.34_PM_1765617996829.png",
      "/attached_assets/Screenshot_2025-12-13_at_2.56.46_PM_1765618009429.png",
      "/attached_assets/Screenshot_2025-12-13_at_2.56.55_PM_1765618018339.png",
      "/attached_assets/Screenshot_2025-12-13_at_2.57.12_PM_1765618034978.png"
    ],
    clientName: "Mauli Car World",
    clientIndustry: "Automotive & Auto Parts",
    clientLocation: "Beed, Maharashtra, India",
    websiteUrl: "#",
    duration: "6 weeks",
    completedDate: "December 2024",
    technologies: ["React", "TypeScript", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "Shadcn/ui", "TanStack Query", "Zod"],
    features: [
      "Problem: No centralized inventory tracking | Solution: Real-time product catalog with stock levels, low stock alerts, and warehouse location tracking",
      "Problem: Customer vehicle records were scattered | Solution: Complete customer database with multiple vehicle registration and service history",
      "Problem: Service workflow was disorganized | Solution: Visual Kanban-style workflow board with four stages: Inquired, Working, Waiting, Completed",
      "Problem: Manual invoice creation was time-consuming | Solution: Automated invoice generation with payment status tracking and PDF export",
      "Problem: No visibility into business performance | Solution: Role-based analytics dashboard with sales reports, inventory status, and employee metrics",
      "Problem: Managing different staff access levels | Solution: Five distinct user roles with granular permissions for each module"
    ],
    outcomes: [
      "Problem: Stock levels were unknown until running out | Result: Real-time inventory alerts reduced stockouts by 90%",
      "Problem: Customer information was lost between visits | Result: Complete service history retention for repeat customers",
      "Problem: No tracking of service job progress | Result: Visual workflow reduced service completion time by 40%",
      "Problem: Revenue leakage from unpaid invoices | Result: Payment tracking improved collection rate by 60%"
    ]
  },

  // Digital Marketing Projects
  {
    id: "d1",
    serviceId: "4",
    name: "LaunchPad Brand Campaign",
    shortDescription: "Comprehensive digital marketing campaign for a tech startup launch.",
    fullDescription: "Executed a full-scale digital marketing campaign for LaunchPad's product launch. The campaign included social media strategy, content marketing, influencer partnerships, paid advertising, email marketing, and PR outreach. A/B testing and analytics drove continuous optimization throughout the campaign.",
    imageUrl: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=800&h=600&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
    ],
    clientName: "LaunchPad Technologies",
    clientIndustry: "SaaS / Technology",
    clientLocation: "Seattle, WA",
    websiteUrl: "https://launchpad-tech.io",
    duration: "3 months",
    completedDate: "November 2024",
    technologies: ["Google Ads", "Facebook Ads", "HubSpot", "Mailchimp", "Hootsuite", "Google Analytics"],
    features: ["Social Media Strategy", "Content Marketing", "Influencer Outreach", "Paid Advertising", "Email Campaigns", "PR Management"],
    outcomes: ["10M+ impressions", "500K website visits", "15K product signups"]
  },
  {
    id: "d2",
    serviceId: "4",
    name: "LocalEats Restaurant Marketing",
    shortDescription: "Local SEO and social media marketing for restaurant chain.",
    fullDescription: "Developed and executed a comprehensive local marketing strategy for a restaurant chain with 15 locations. The campaign focused on local SEO optimization, review management, social media engagement, influencer partnerships, and targeted advertising. Each location received customized campaigns while maintaining brand consistency.",
    imageUrl: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=600&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&h=400&fit=crop"
    ],
    clientName: "LocalEats Restaurant Group",
    clientIndustry: "Food & Hospitality",
    clientLocation: "Miami, FL",
    websiteUrl: "https://localeats-restaurants.com",
    duration: "6 months",
    completedDate: "October 2024",
    technologies: ["Google My Business", "Yelp", "Instagram", "TikTok", "SEMrush", "BrightLocal"],
    features: ["Local SEO", "Review Management", "Social Media Marketing", "Influencer Campaigns", "Geo-targeted Ads", "Analytics Dashboard"],
    outcomes: ["150% increase in foot traffic", "4.5 average rating across platforms", "200% growth in social followers"]
  },
  {
    id: "d3",
    serviceId: "4",
    name: "EcoWear Sustainability Campaign",
    shortDescription: "Purpose-driven marketing campaign for sustainable fashion brand.",
    fullDescription: "Created an impactful marketing campaign highlighting EcoWear's commitment to sustainable fashion. The campaign combined storytelling, video content, social causes, and community engagement. Partnerships with environmental organizations and eco-influencers amplified the message, driving both brand awareness and sales.",
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=400&fit=crop"
    ],
    clientName: "EcoWear Fashion",
    clientIndustry: "Sustainable Fashion",
    clientLocation: "Denver, CO",
    websiteUrl: "https://ecowear-fashion.com",
    duration: "4 months",
    completedDate: "September 2024",
    technologies: ["YouTube", "Pinterest", "Shopify", "Klaviyo", "Buffer", "Sprout Social"],
    features: ["Video Content", "Influencer Marketing", "Cause Marketing", "Community Building", "Email Automation", "Content Calendar"],
    outcomes: ["5M video views", "300% increase in brand mentions", "45% increase in sales"]
  }
];

// Helper function to get projects by service
export function getProjectsByServiceSlug(slug: string): Project[] {
  const service = services.find(s => s.slug === slug);
  if (!service) return [];
  return projects.filter(p => p.serviceId === service.id);
}

// Helper function to get project by ID
export function getProjectById(id: string): Project | undefined {
  return projects.find(p => p.id === id);
}

// Helper function to get service by slug
export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(s => s.slug === slug);
}
