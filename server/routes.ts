import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Handling contact form submissions
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.json({ success: true, message: "Message received successfully!" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: validationError.message
        });
      } else {
        console.error("Error processing contact form:", error);
        res.status(500).json({ 
          success: false, 
          message: "Server error processing your message. Please try again later."
        });
      }
    }
  });

  // Get all contact messages
  app.get("/api/contact", async (_req, res) => {
    try {
      const messages = await storage.getAllContactMessages();
      res.json(messages);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      res.status(500).json({ 
        success: false, 
        message: "Error fetching contact messages"
      });
    }
  });

  // CMS API Routes
  
  // Get all site content
  app.get("/api/cms/content", async (_req, res) => {
    try {
      const content = await storage.getAllSiteContent();
      res.json({ success: true, data: content });
    } catch (error) {
      console.error("Error fetching site content:", error);
      res.status(500).json({ 
        success: false, 
        message: "Error fetching site content" 
      });
    }
  });

  // Get specific section content
  app.get("/api/cms/content/:section", async (req, res) => {
    try {
      const { section } = req.params;
      const content = await storage.getSiteContent(section);
      
      if (!content) {
        return res.status(404).json({ 
          success: false, 
          message: `Content for section '${section}' not found` 
        });
      }
      
      res.json({ success: true, data: content });
    } catch (error) {
      console.error(`Error fetching content for section ${req.params.section}:`, error);
      res.status(500).json({ 
        success: false, 
        message: "Error fetching section content" 
      });
    }
  });

  // Update section content
  app.post("/api/cms/content/:section", async (req, res) => {
    try {
      const { section } = req.params;
      const content = req.body;
      
      // Simple validation - would use more specific validation in production
      if (!content || Object.keys(content).length === 0) {
        return res.status(400).json({ 
          success: false, 
          message: "Content data is required" 
        });
      }
      
      const updatedContent = await storage.setSiteContent(section, content);
      res.json({ 
        success: true, 
        message: `${section} content updated successfully`,
        data: updatedContent
      });
    } catch (error) {
      console.error(`Error updating content for section ${req.params.section}:`, error);
      res.status(500).json({ 
        success: false, 
        message: "Error updating section content" 
      });
    }
  });

  // Admin Authentication (Simple for demo purposes)
  app.post("/api/cms/login", (req, res) => {
    const { password } = req.body;
    
    // Simple password check for demo purposes
    // In a production app, would use proper authentication with hashed passwords
    if (password === "admin123") {
      res.json({ 
        success: true, 
        message: "Login successful", 
        token: "demo-token-1234567890" 
      });
    } else {
      res.status(401).json({ 
        success: false, 
        message: "Invalid credentials" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
