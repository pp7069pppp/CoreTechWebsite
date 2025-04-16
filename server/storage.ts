import { users, type User, type InsertUser, type InsertContactMessage, type ContactMessage, type SiteContent, type InsertSiteContent } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getAllContactMessages(): Promise<ContactMessage[]>;
  getSiteContent(section: string): Promise<any | undefined>;
  setSiteContent(section: string, content: any): Promise<any>;
  getAllSiteContent(): Promise<Record<string, any>>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactMessages: Map<number, ContactMessage>;
  private siteContent: Map<string, any>;
  currentUserId: number;
  currentContactMessageId: number;

  constructor() {
    this.users = new Map();
    this.contactMessages = new Map();
    this.siteContent = new Map();
    this.currentUserId = 1;
    this.currentContactMessageId = 1;
    
    // Initialize with default site content
    this.initDefaultContent();
  }

  private initDefaultContent() {
    // Hero section
    this.siteContent.set('hero', {
      heading: "Innovative Solutions for Tomorrow's Challenges",
      subheading: "CoreTech delivers cutting-edge technology solutions that transform how businesses operate in the digital landscape."
    });

    // About section
    this.siteContent.set('about', {
      title: "About CoreTech",
      description1: "Founded in 2010, CoreTech has been at the forefront of technology innovation, helping businesses navigate the complex digital landscape.",
      description2: "Our mission is to empower organizations through technology, providing solutions that drive efficiency, growth, and competitive advantage.",
      stats: [
        { value: "200+", label: "Projects Completed" },
        { value: "98%", label: "Client Satisfaction" },
        { value: "50+", label: "Expert Team Members" },
        { value: "12+", label: "Years of Excellence" },
      ],
      imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    });

    // Portfolio items
    this.siteContent.set('portfolio', [
      {
        id: 1,
        title: "luvr",
        description: "A modern dating application connecting like-minded individuals through advanced matching algorithms.",
        imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        tags: ["Mobile App", "UI/UX", "React Native"],
        projectUrl: "#"
      },
      {
        id: 2,
        title: "SplitBuddy",
        description: "Expense sharing application that makes it easy to split bills with friends and track shared expenses.",
        imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        tags: ["Web App", "Mobile App", "FinTech"],
        projectUrl: "#"
      },
      {
        id: 3,
        title: "ezHisab",
        description: "Comprehensive accounting solution for small businesses with inventory and financial management.",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        tags: ["Web App", "Accounting", "Dashboard"],
        projectUrl: "#"
      },
      {
        id: 4,
        title: "ezPOS",
        description: "Point of sale system designed for retail businesses with inventory and sales tracking capabilities.",
        imageUrl: "https://images.unsplash.com/photo-1556742031-c6961e8560b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        tags: ["POS", "Retail", "Cloud Solution"],
        projectUrl: "#"
      },
      {
        id: 5,
        title: "ezExam",
        description: "Online examination platform for educational institutions with automated grading and reporting features.",
        imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        tags: ["EdTech", "Assessment", "Cloud Platform"],
        projectUrl: "#"
      }
    ]);

    // Services
    this.siteContent.set('services', [
      {
        id: 1,
        icon: "code",
        title: "Custom Software Development",
        description: "Tailored software solutions designed to meet your specific business needs and objectives."
      },
      {
        id: 2,
        icon: "smartphone",
        title: "Mobile App Development",
        description: "Intuitive and high-performance mobile applications for iOS and Android platforms."
      },
      {
        id: 3,
        icon: "layout",
        title: "Web Application Development",
        description: "Responsive and scalable web applications with modern interfaces and robust backends."
      },
      {
        id: 4,
        icon: "database",
        title: "Database Solutions",
        description: "Optimized database design, development, and management for efficient data handling."
      },
      {
        id: 5,
        icon: "cloud",
        title: "Cloud Computing Services",
        description: "Strategic cloud migration and management to enhance scalability and reduce costs."
      },
      {
        id: 6,
        icon: "shield",
        title: "Cybersecurity Solutions",
        description: "Comprehensive security measures to protect your systems and data from threats."
      }
    ]);

    // Team members
    this.siteContent.set('team', [
      {
        id: 1,
        name: "Alex Johnson",
        role: "CEO & Founder",
        bio: "With over 15 years of industry experience, Alex leads the strategic direction of CoreTech.",
        imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        socialLinks: [
          { type: "linkedin", url: "#" },
          { type: "twitter", url: "#" },
          { type: "github", url: "#" }
        ]
      },
      {
        id: 2,
        name: "Sarah Chen",
        role: "CTO",
        bio: "Sarah oversees all technical aspects of the company, bringing innovation and technical excellence.",
        imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        socialLinks: [
          { type: "linkedin", url: "#" },
          { type: "github", url: "#" }
        ]
      },
      {
        id: 3,
        name: "Michael Rodriguez",
        role: "Lead UX Designer",
        bio: "Michael creates intuitive and engaging user experiences that drive product adoption and satisfaction.",
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        socialLinks: [
          { type: "linkedin", url: "#" },
          { type: "dribbble", url: "#" },
          { type: "twitter", url: "#" }
        ]
      },
      {
        id: 4,
        name: "Priya Patel",
        role: "Lead Developer",
        bio: "Priya leads our development team, ensuring high code quality and efficient project delivery.",
        imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        socialLinks: [
          { type: "linkedin", url: "#" },
          { type: "github", url: "#" }
        ]
      }
    ]);

    // Testimonials
    this.siteContent.set('testimonials', [
      {
        id: 1,
        content: "CoreTech transformed our business with their innovative software solutions. Their team's expertise and dedication made the entire process smooth and efficient.",
        authorName: "Jennifer Smith",
        authorRole: "CEO, GreenTech Solutions",
        authorImageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 2,
        content: "Working with CoreTech was a game-changer for our company. Their mobile app development service exceeded our expectations and helped us reach a wider audience.",
        authorName: "David Lee",
        authorRole: "Marketing Director, Vertex Inc",
        authorImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      },
      {
        id: 3,
        content: "The cloud migration service provided by CoreTech significantly improved our system performance and reduced operational costs. Highly recommended!",
        authorName: "Sophia Wang",
        authorRole: "CTO, DataStream Analytics",
        authorImageUrl: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
      }
    ]);

    // Contact Info
    this.siteContent.set('contact', {
      address: "123 Innovation Drive, Tech Park, CA 94043",
      email: "info@coretech.com",
      phone: "+1 (555) 123-4567",
      socialLinks: [
        { type: "linkedin", url: "#" },
        { type: "twitter", url: "#" },
        { type: "facebook", url: "#" },
        { type: "instagram", url: "#" }
      ]
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentContactMessageId++;
    const timestamp = new Date().toISOString();
    const message: ContactMessage = { 
      ...insertMessage, 
      id, 
      createdAt: timestamp 
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getAllContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getSiteContent(section: string): Promise<any | undefined> {
    return this.siteContent.get(section);
  }

  async setSiteContent(section: string, content: any): Promise<any> {
    this.siteContent.set(section, content);
    return content;
  }

  async getAllSiteContent(): Promise<Record<string, any>> {
    const content: Record<string, any> = {};
    // Convert Map to array of entries and then iterate
    Array.from(this.siteContent.entries()).forEach(([key, value]) => {
      content[key] = value;
    });
    return content;
  }
}

export const storage = new MemStorage();
