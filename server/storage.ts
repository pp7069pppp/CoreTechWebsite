import { users, type User, type InsertUser, type InsertContactMessage, type ContactMessage, type SiteContent, type InsertSiteContent } from "@shared/schema";
import fs from 'fs/promises';
import path from 'path';

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

export class FileStorage implements IStorage {
  private contentPath: string;
  private usersPath: string;
  private messagesPath: string;

  constructor() {
    this.contentPath = path.join(process.cwd(), 'server', 'data', 'content.json');
    this.usersPath = path.join(process.cwd(), 'server', 'data', 'users.json');
    this.messagesPath = path.join(process.cwd(), 'server', 'data', 'messages.json');
  }

  private async readJsonFile(filePath: string): Promise<any> {
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return {};
      }
      throw error;
    }
  }

  private async writeJsonFile(filePath: string, data: any): Promise<void> {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  async getUser(id: number): Promise<User | undefined> {
    const users = await this.readJsonFile(this.usersPath);
    return users[id];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const users = await this.readJsonFile(this.usersPath);
    return Object.values(users).find((user: any) => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const users = await this.readJsonFile(this.usersPath);
    const id = Object.keys(users).length + 1;
    const user: User = { ...insertUser, id };
    users[id] = user;
    await this.writeJsonFile(this.usersPath, users);
    return user;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const messages = await this.readJsonFile(this.messagesPath);
    const id = Object.keys(messages).length + 1;
    const timestamp = new Date().toISOString();
    const message: ContactMessage = { 
      ...insertMessage, 
      id, 
      createdAt: timestamp 
    };
    messages[id] = message;
    await this.writeJsonFile(this.messagesPath, messages);
    return message;
  }

  async getAllContactMessages(): Promise<ContactMessage[]> {
    const messages = await this.readJsonFile(this.messagesPath);
    return Object.values(messages).sort((a: any, b: any) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getSiteContent(section: string): Promise<any | undefined> {
    const content = await this.readJsonFile(this.contentPath);
    return content[section];
  }

  async setSiteContent(section: string, newContent: any): Promise<any> {
    const content = await this.readJsonFile(this.contentPath);
    content[section] = newContent;
    await this.writeJsonFile(this.contentPath, content);
    return newContent;
  }

  async getAllSiteContent(): Promise<Record<string, any>> {
    return await this.readJsonFile(this.contentPath);
  }
}

export const storage = new FileStorage();
