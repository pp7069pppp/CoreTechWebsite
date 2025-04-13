import { useState, useEffect } from "react";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { apiRequest, ApiResponse } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// Form Schemas
const loginSchema = z.object({
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const heroSchema = z.object({
  heading: z.string().min(5, { message: "Heading must be at least 5 characters" }),
  subheading: z.string().min(10, { message: "Subheading must be at least 10 characters" }),
});

const aboutSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  description1: z.string().min(20, { message: "Description must be at least 20 characters" }),
  description2: z.string().min(20, { message: "Description must be at least 20 characters" }),
  imageUrl: z.string().url({ message: "Please enter a valid URL" }),
  stats: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ).min(1, { message: "At least one stat is required" }),
});

const portfolioItemSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }),
  imageUrl: z.string().url({ message: "Please enter a valid URL" }),
  tags: z.string().transform(value => value.split(",").map(tag => tag.trim())),
  projectUrl: z.string().url({ message: "Please enter a valid URL" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type HeroFormValues = z.infer<typeof heroSchema>;
type AboutFormValues = z.infer<typeof aboutSchema>;
type PortfolioItemFormValues = z.infer<typeof portfolioItemSchema>;

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");
  const { toast } = useToast();
  const queryClient = useQueryClient();

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
      heading: "",
      subheading: "",
    },
  });

  // About section form
  const aboutForm = useForm<AboutFormValues>({
    resolver: zodResolver(aboutSchema),
    defaultValues: {
      title: "",
      description1: "",
      description2: "",
      imageUrl: "",
      stats: [{ value: "", label: "" }],
    },
  });

  // Portfolio item form
  const portfolioForm = useForm<PortfolioItemFormValues>({
    resolver: zodResolver(portfolioItemSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
      tags: "",
      projectUrl: "",
    },
  });

  // Fetch hero content
  const { data: heroData, isLoading: heroLoading } = useQuery<ApiResponse<HeroFormValues>>({
    queryKey: ['/api/cms/content/hero'],
    enabled: isAuthenticated && activeTab === "hero",
    refetchOnWindowFocus: false
  });

  // Apply hero data when received
  React.useEffect(() => {
    if (heroData?.success && heroData?.data) {
      heroForm.reset({
        heading: heroData.data.heading,
        subheading: heroData.data.subheading,
      });
    }
  }, [heroData, heroForm]);

  // Fetch about content
  const { data: aboutData, isLoading: aboutLoading } = useQuery<ApiResponse<AboutFormValues>>({
    queryKey: ['/api/cms/content/about'],
    enabled: isAuthenticated && activeTab === "about",
    refetchOnWindowFocus: false
  });

  // Apply about data when received
  React.useEffect(() => {
    if (aboutData?.success && aboutData?.data) {
      aboutForm.reset({
        title: aboutData.data.title,
        description1: aboutData.data.description1,
        description2: aboutData.data.description2,
        imageUrl: aboutData.data.imageUrl,
        stats: aboutData.data.stats,
      });
    }
  }, [aboutData, aboutForm]);

  // Handle login submission
  const handleLogin = async (data: LoginFormValues) => {
    try {
      const response = await apiRequest('/api/cms/login', {
        method: 'POST',
        body: JSON.stringify({ password: data.password }),
      });

      if (response.success) {
        setIsAuthenticated(true);
        toast({
          title: "Login successful",
          description: "Welcome to the admin panel",
        });
      } else {
        toast({
          title: "Login failed",
          description: response.message || "Invalid credentials",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to login. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Update hero section
  const updateHeroSection = async (data: HeroFormValues) => {
    try {
      const response = await apiRequest('/api/cms/content/hero', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (response.success) {
        toast({
          title: "Success",
          description: "Hero section updated successfully",
        });
        queryClient.invalidateQueries({ queryKey: ['/api/cms/content/hero'] });
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to update hero section",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update hero section. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Update about section
  const updateAboutSection = async (data: AboutFormValues) => {
    try {
      const response = await apiRequest('/api/cms/content/about', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (response.success) {
        toast({
          title: "Success",
          description: "About section updated successfully",
        });
        queryClient.invalidateQueries({ queryKey: ['/api/cms/content/about'] });
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to update about section",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update about section. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Add portfolio item
  const addPortfolioItem = async (data: PortfolioItemFormValues) => {
    try {
      // First get existing portfolio items
      const portfolioResponse = await apiRequest('/api/cms/content/portfolio', {
        method: 'GET',
      });
      
      let portfolioItems = [];
      if (portfolioResponse.success && portfolioResponse.data) {
        portfolioItems = portfolioResponse.data;
      }
      
      // Add new item with incremental ID
      const newItem = {
        id: portfolioItems.length > 0 ? Math.max(...portfolioItems.map(item => item.id)) + 1 : 1,
        ...data,
      };
      
      const allItems = [...portfolioItems, newItem];
      
      // Update portfolio items
      const response = await apiRequest('/api/cms/content/portfolio', {
        method: 'POST',
        body: JSON.stringify(allItems),
      });

      if (response.success) {
        toast({
          title: "Success",
          description: "Portfolio item added successfully",
        });
        portfolioForm.reset();
        queryClient.invalidateQueries({ queryKey: ['/api/cms/content/portfolio'] });
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to add portfolio item",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add portfolio item. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Add more stats fields to about form
  const addStatField = () => {
    const currentStats = aboutForm.getValues("stats") || [];
    aboutForm.setValue("stats", [...currentStats, { value: "", label: "" }]);
  };

  // Remove stat field from about form
  const removeStatField = (index: number) => {
    const currentStats = aboutForm.getValues("stats") || [];
    if (currentStats.length > 1) {
      aboutForm.setValue(
        "stats",
        currentStats.filter((_, i) => i !== index)
      );
    }
  };

  // If not authenticated, show login form
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>Enter your password to access the admin panel</CardDescription>
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
                        <Input type="password" placeholder="Enter password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={loginForm.formState.isSubmitting}>
                  {loginForm.formState.isSubmitting ? "Logging in..." : "Login"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">CoreTech CMS Admin</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        Manage your website content from this admin panel.
      </p>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          <TabsTrigger value="about">About Section</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
        </TabsList>

        {/* Hero Section Tab */}
        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle>Edit Hero Section</CardTitle>
              <CardDescription>Update the main hero section content</CardDescription>
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
                          <Input placeholder="Enter heading" {...field} />
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
                          <Textarea placeholder="Enter subheading" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={heroForm.formState.isSubmitting}>
                    {heroForm.formState.isSubmitting ? "Updating..." : "Update Hero Section"}
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
              <CardDescription>Update the about section content</CardDescription>
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
                          <Input placeholder="Enter title" {...field} />
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
                        <FormLabel>First Description Paragraph</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter first description paragraph" {...field} />
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
                        <FormLabel>Second Description Paragraph</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter second description paragraph" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={aboutForm.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter image URL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Stats</h3>
                      <Button type="button" variant="outline" onClick={addStatField} size="sm">
                        Add Stat
                      </Button>
                    </div>
                    
                    {aboutForm.watch("stats")?.map((_, index) => (
                      <div key={index} className="flex gap-4 items-start">
                        <FormField
                          control={aboutForm.control}
                          name={`stats.${index}.value`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel>Value</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. 200+" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={aboutForm.control}
                          name={`stats.${index}.label`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel>Label</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. Projects Completed" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {aboutForm.watch("stats").length > 1 && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="mt-8"
                            onClick={() => removeStatField(index)}
                          >
                            X
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <Button type="submit" disabled={aboutForm.formState.isSubmitting}>
                    {aboutForm.formState.isSubmitting ? "Updating..." : "Update About Section"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Portfolio Tab */}
        <TabsContent value="portfolio">
          <Card>
            <CardHeader>
              <CardTitle>Add Portfolio Item</CardTitle>
              <CardDescription>Add a new portfolio project</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...portfolioForm}>
                <form onSubmit={portfolioForm.handleSubmit(addPortfolioItem)} className="space-y-6">
                  <FormField
                    control={portfolioForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Project title" {...field} />
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
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Project description" {...field} />
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
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="Project image URL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={portfolioForm.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <FormControl>
                          <Input placeholder="Web App, Mobile, UI/UX (comma separated)" {...field} />
                        </FormControl>
                        <FormDescription>Enter tags separated by commas</FormDescription>
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
                          <Input placeholder="Project URL" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={portfolioForm.formState.isSubmitting}>
                    {portfolioForm.formState.isSubmitting ? "Adding..." : "Add Portfolio Item"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other Tabs will be implemented later */}
        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>Services Management</CardTitle>
              <CardDescription>Coming soon</CardDescription>
            </CardHeader>
            <CardContent>
              <p>The services management features will be implemented in the next update.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle>Team Management</CardTitle>
              <CardDescription>Coming soon</CardDescription>
            </CardHeader>
            <CardContent>
              <p>The team management features will be implemented in the next update.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testimonials">
          <Card>
            <CardHeader>
              <CardTitle>Testimonials Management</CardTitle>
              <CardDescription>Coming soon</CardDescription>
            </CardHeader>
            <CardContent>
              <p>The testimonials management features will be implemented in the next update.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}