import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Admin password validation (simple for demo)
const loginSchema = z.object({
  password: z.string().min(4, "Password must be at least 4 characters"),
});

// Schemas for different content types
const heroSchema = z.object({
  heading: z.string().min(5, "Heading must be at least 5 characters"),
  subheading: z.string().min(10, "Subheading must be at least 10 characters"),
});

const aboutSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description1: z.string().min(10, "Description must be at least 10 characters"),
  description2: z.string().min(10, "Description must be at least 10 characters"),
  stats: z.array(
    z.object({
      value: z.string().min(1, "Value is required"),
      label: z.string().min(1, "Label is required"),
    })
  ).min(1, "At least one stat is required")
});

const portfolioItemSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  imageUrl: z.string().url("Please enter a valid URL"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  projectUrl: z.string().url("Please enter a valid URL"),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type HeroFormValues = z.infer<typeof heroSchema>;
type AboutFormValues = z.infer<typeof aboutSchema>;
type PortfolioItemFormValues = z.infer<typeof portfolioItemSchema>;

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: "",
    },
  });

  // Hero section form
  const heroForm = useForm<HeroFormValues>({
    resolver: zodResolver(heroSchema),
    defaultValues: {
      heading: "Innovative Solutions for Tomorrow's Challenges",
      subheading: "CoreTech delivers cutting-edge technology solutions that transform how businesses operate in the digital landscape.",
    },
  });

  // About section form
  const aboutForm = useForm<AboutFormValues>({
    resolver: zodResolver(aboutSchema),
    defaultValues: {
      title: "About CoreTech",
      description1: "Founded in 2010, CoreTech has been at the forefront of technology innovation, helping businesses navigate the complex digital landscape.",
      description2: "Our mission is to empower organizations through technology, providing solutions that drive efficiency, growth, and competitive advantage.",
      stats: [
        { value: "200+", label: "Projects Completed" },
        { value: "98%", label: "Client Satisfaction" },
        { value: "50+", label: "Expert Team Members" },
        { value: "12+", label: "Years of Excellence" },
      ],
    },
  });

  // Portfolio item form (for adding new portfolio items)
  const portfolioForm = useForm<PortfolioItemFormValues>({
    resolver: zodResolver(portfolioItemSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
      tags: [],
      projectUrl: "",
    },
  });

  const handleLogin = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      // Simple password check - in a real app, this would call the backend
      if (data.password === "admin123") {
        setIsAuthenticated(true);
        toast({
          title: "Login Successful",
          description: "Welcome to the admin panel",
        });
      } else {
        toast({
          title: "Login Failed",
          description: "Incorrect password",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: "An error occurred during login",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateHeroSection = async (data: HeroFormValues) => {
    setIsSubmitting(true);
    try {
      // In a real app, this would call an API endpoint
      console.log("Updating hero section:", data);
      toast({
        title: "Success",
        description: "Hero section updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update hero section",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateAboutSection = async (data: AboutFormValues) => {
    setIsSubmitting(true);
    try {
      // In a real app, this would call an API endpoint
      console.log("Updating about section:", data);
      toast({
        title: "Success",
        description: "About section updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update about section",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addPortfolioItem = async (data: PortfolioItemFormValues) => {
    setIsSubmitting(true);
    try {
      // In a real app, this would call an API endpoint
      console.log("Adding portfolio item:", data);
      toast({
        title: "Success",
        description: "Portfolio item added successfully",
      });
      portfolioForm.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add portfolio item",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center">
        <div className="container mx-auto px-4">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                CoreTech Admin Login
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-6">
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter admin password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">CoreTech CMS Admin Panel</h1>
        
        <Tabs defaultValue="hero" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="hero">Hero Section</TabsTrigger>
            <TabsTrigger value="about">About Section</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio Items</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          {/* Hero Section Tab */}
          <TabsContent value="hero">
            <Card>
              <CardHeader>
                <CardTitle>Edit Hero Section</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...heroForm}>
                  <form onSubmit={heroForm.handleSubmit(updateHeroSection)} className="space-y-6">
                    <FormField
                      control={heroForm.control}
                      name="heading"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Heading</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={heroForm.control}
                      name="subheading"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subheading</FormLabel>
                          <FormControl>
                            <Textarea rows={3} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* About Section Tab */}
          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>Edit About Section</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...aboutForm}>
                  <form onSubmit={aboutForm.handleSubmit(updateAboutSection)} className="space-y-6">
                    <FormField
                      control={aboutForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={aboutForm.control}
                      name="description1"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description (Paragraph 1)</FormLabel>
                          <FormControl>
                            <Textarea rows={3} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={aboutForm.control}
                      name="description2"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description (Paragraph 2)</FormLabel>
                          <FormControl>
                            <Textarea rows={3} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Stats fields would be dynamically added/removed in a real application */}
                    <div className="border p-4 rounded-lg">
                      <h3 className="font-semibold mb-4">Stats (First stat shown as example)</h3>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <FormField
                          control={aboutForm.control}
                          name={`stats.0.value`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Stat Value</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={aboutForm.control}
                          name={`stats.0.label`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Stat Label</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Portfolio Items Tab */}
          <TabsContent value="portfolio">
            <Card>
              <CardHeader>
                <CardTitle>Add New Portfolio Item</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...portfolioForm}>
                  <form onSubmit={portfolioForm.handleSubmit(addPortfolioItem)} className="space-y-6">
                    <FormField
                      control={portfolioForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Title</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., luvr" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={portfolioForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe the project..." 
                              rows={3} 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={portfolioForm.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Image URL</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="https://example.com/image.jpg" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Tags would be dynamically added in a real application */}
                    <FormField
                      control={portfolioForm.control}
                      name="tags"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tags (comma separated)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Web App, Mobile App, UI/UX" 
                              value={field.value?.join(", ") || ""}
                              onChange={(e) => {
                                const value = e.target.value;
                                field.onChange(
                                  value.split(",").map((tag) => tag.trim()).filter(Boolean)
                                );
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={portfolioForm.control}
                      name="projectUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project URL</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="https://example.com/project" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Adding..." : "Add Portfolio Item"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Admin Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsAuthenticated(false)}
                  >
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;