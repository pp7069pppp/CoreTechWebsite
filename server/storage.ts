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
    for (const [key, value] of this.siteContent.entries()) {
      content[key] = value;
    }
    return content;
  }
}

export const storage = new MemStorage();
