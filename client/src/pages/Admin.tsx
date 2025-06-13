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
  tags: z.array(z.string()),
  projectUrl: z.string().url({ message: "Please enter a valid URL" }),
});

const serviceSchema = z.object({
  icon: z.string(),
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }),
});

const teamMemberSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  role: z.string().min(3, { message: "Role must be at least 3 characters" }),
  bio: z.string().min(20, { message: "Bio must be at least 20 characters" }),
  imageUrl: z.string().url({ message: "Please enter a valid URL" }),
  socialLinks: z.array(
    z.object({
      type: z.string(),
      url: z.string().url({ message: "Please enter a valid URL" }),
    })
  ),
});

const testimonialSchema = z.object({
  content: z.string().min(20, { message: "Content must be at least 20 characters" }),
  authorName: z.string().min(3, { message: "Author name must be at least 3 characters" }),
  authorRole: z.string().min(3, { message: "Author role must be at least 3 characters" }),
  authorImageUrl: z.string().url({ message: "Please enter a valid URL" }),
});

const contactSchema = z.object({
  address: z.string().min(10, { message: "Address must be at least 10 characters" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  phone: z.string().min(10, { message: "Phone must be at least 10 characters" }),
  socialLinks: z.array(
    z.object({
      type: z.string(),
      url: z.string().url({ message: "Please enter a valid URL" }),
    })
  ),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type HeroFormValues = z.infer<typeof heroSchema>;
type AboutFormValues = z.infer<typeof aboutSchema>;
type PortfolioItemFormValues = z.infer<typeof portfolioItemSchema>;
type ServiceFormValues = z.infer<typeof serviceSchema>;
type TeamMemberFormValues = z.infer<typeof teamMemberSchema>;
type TestimonialFormValues = z.infer<typeof testimonialSchema>;
type ContactFormValues = z.infer<typeof contactSchema>;

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Form hooks
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { password: "" },
  });

  const heroForm = useForm<HeroFormValues>({
    resolver: zodResolver(heroSchema),
    defaultValues: { heading: "", subheading: "" },
  });

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

  const serviceForm = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      icon: "",
      title: "",
      description: "",
    },
  });

  const teamMemberForm = useForm<TeamMemberFormValues>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: {
      name: "",
      role: "",
      bio: "",
      imageUrl: "",
      socialLinks: [{ type: "", url: "" }],
    },
  });

  const testimonialForm = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      content: "",
      authorName: "",
      authorRole: "",
      authorImageUrl: "",
    },
  });

  const contactForm = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      address: "",
      email: "",
      phone: "",
      socialLinks: [{ type: "", url: "" }],
    },
  });

  // Fetch content for each section
  const { data: heroData } = useQuery<ApiResponse<HeroFormValues>>({
    queryKey: ['/api/cms/content/hero'],
    enabled: isAuthenticated && activeTab === "hero",
  });

  const { data: aboutData } = useQuery<ApiResponse<AboutFormValues>>({
    queryKey: ['/api/cms/content/about'],
    enabled: isAuthenticated && activeTab === "about",
  });

  const { data: portfolioData } = useQuery<ApiResponse<PortfolioItemFormValues[]>>({
    queryKey: ['/api/cms/content/portfolio'],
    enabled: isAuthenticated && activeTab === "portfolio",
  });

  const { data: servicesData } = useQuery<ApiResponse<ServiceFormValues[]>>({
    queryKey: ['/api/cms/content/services'],
    enabled: isAuthenticated && activeTab === "services",
  });

  const { data: teamData } = useQuery<ApiResponse<TeamMemberFormValues[]>>({
    queryKey: ['/api/cms/content/team'],
    enabled: isAuthenticated && activeTab === "team",
  });

  const { data: testimonialsData } = useQuery<ApiResponse<TestimonialFormValues[]>>({
    queryKey: ['/api/cms/content/testimonials'],
    enabled: isAuthenticated && activeTab === "testimonials",
  });

  const { data: contactData } = useQuery<ApiResponse<ContactFormValues>>({
    queryKey: ['/api/cms/content/contact'],
    enabled: isAuthenticated && activeTab === "contact",
  });

  // Update form data when content is fetched
  useEffect(() => {
    if (heroData?.success && heroData?.data) {
      heroForm.reset(heroData.data);
    }
  }, [heroData, heroForm]);

  useEffect(() => {
    if (aboutData?.success && aboutData?.data) {
      aboutForm.reset(aboutData.data);
    }
  }, [aboutData, aboutForm]);

  // Handle login
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

  // Update content handlers
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

  // Add state to track editing mode
  const [editingItem, setEditingItem] = useState<{ id: number; type: string } | null>(null);

  // Update portfolio form submission
  const handlePortfolioSubmit = async (data: PortfolioItemFormValues) => {
    try {
      const portfolioResponse = await apiRequest('/api/cms/content/portfolio', {
        method: 'GET',
      });
      
      let portfolioItems = [];
      if (portfolioResponse.success && portfolioResponse.data) {
        portfolioItems = portfolioResponse.data;
      }
      
      let updatedItems;
      if (editingItem?.type === 'portfolio') {
        // Update existing item
        updatedItems = portfolioItems.map((item: any) => 
          item.id === editingItem.id ? { ...item, ...data } : item
        );
      } else {
        // Add new item
        const newItem = {
          id: portfolioItems.length > 0 ? Math.max(...portfolioItems.map((item: any) => item.id)) + 1 : 1,
          ...data,
        };
        updatedItems = [...portfolioItems, newItem];
      }
      
      const response = await apiRequest('/api/cms/content/portfolio', {
        method: 'POST',
        body: JSON.stringify(updatedItems),
      });

      if (response.success) {
        toast({
          title: "Success",
          description: editingItem ? "Portfolio item updated successfully" : "Portfolio item added successfully",
        });
        portfolioForm.reset();
        setEditingItem(null);
        queryClient.invalidateQueries({ queryKey: ['/api/cms/content/portfolio'] });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: editingItem ? "Failed to update portfolio item" : "Failed to add portfolio item",
        variant: "destructive",
      });
    }
  };

  // Update service form submission
  const handleServiceSubmit = async (data: ServiceFormValues) => {
    try {
      const servicesResponse = await apiRequest('/api/cms/content/services', {
        method: 'GET',
      });
      
      let services = [];
      if (servicesResponse.success && servicesResponse.data) {
        services = servicesResponse.data;
      }
      
      let updatedServices;
      if (editingItem?.type === 'service') {
        // Update existing service
        updatedServices = services.map((service: any) => 
          service.id === editingItem.id ? { ...service, ...data } : service
        );
      } else {
        // Add new service
        const newService = {
          id: services.length > 0 ? Math.max(...services.map((s: any) => s.id)) + 1 : 1,
          ...data,
        };
        updatedServices = [...services, newService];
      }
      
      const response = await apiRequest('/api/cms/content/services', {
        method: 'POST',
        body: JSON.stringify(updatedServices),
      });

      if (response.success) {
        toast({
          title: "Success",
          description: editingItem ? "Service updated successfully" : "Service added successfully",
        });
        serviceForm.reset();
        setEditingItem(null);
        queryClient.invalidateQueries({ queryKey: ['/api/cms/content/services'] });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: editingItem ? "Failed to update service" : "Failed to add service",
        variant: "destructive",
      });
    }
  };

  // Update team member form submission
  const handleTeamMemberSubmit = async (data: TeamMemberFormValues) => {
    try {
      const teamResponse = await apiRequest('/api/cms/content/team', {
        method: 'GET',
      });
      
      let teamMembers = [];
      if (teamResponse.success && teamResponse.data) {
        teamMembers = teamResponse.data;
      }
      
      let updatedMembers;
      if (editingItem?.type === 'team') {
        // Update existing member
        updatedMembers = teamMembers.map((member: any) => 
          member.id === editingItem.id ? { ...member, ...data } : member
        );
      } else {
        // Add new member
        const newMember = {
          id: teamMembers.length > 0 ? Math.max(...teamMembers.map((m: any) => m.id)) + 1 : 1,
          ...data,
        };
        updatedMembers = [...teamMembers, newMember];
      }
      
      const response = await apiRequest('/api/cms/content/team', {
        method: 'POST',
        body: JSON.stringify(updatedMembers),
      });

      if (response.success) {
        toast({
          title: "Success",
          description: editingItem ? "Team member updated successfully" : "Team member added successfully",
        });
        teamMemberForm.reset();
        setEditingItem(null);
        queryClient.invalidateQueries({ queryKey: ['/api/cms/content/team'] });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: editingItem ? "Failed to update team member" : "Failed to add team member",
        variant: "destructive",
      });
    }
  };

  // Update testimonial form submission
  const handleTestimonialSubmit = async (data: TestimonialFormValues) => {
    try {
      const testimonialsResponse = await apiRequest('/api/cms/content/testimonials', {
        method: 'GET',
      });
      
      let testimonials = [];
      if (testimonialsResponse.success && testimonialsResponse.data) {
        testimonials = testimonialsResponse.data;
      }
      
      let updatedTestimonials;
      if (editingItem?.type === 'testimonial') {
        // Update existing testimonial
        updatedTestimonials = testimonials.map((testimonial: any) => 
          testimonial.id === editingItem.id ? { ...testimonial, ...data } : testimonial
        );
      } else {
        // Add new testimonial
        const newTestimonial = {
          id: testimonials.length > 0 ? Math.max(...testimonials.map((t: any) => t.id)) + 1 : 1,
          ...data,
        };
        updatedTestimonials = [...testimonials, newTestimonial];
      }
      
      const response = await apiRequest('/api/cms/content/testimonials', {
        method: 'POST',
        body: JSON.stringify(updatedTestimonials),
      });

      if (response.success) {
        toast({
          title: "Success",
          description: editingItem ? "Testimonial updated successfully" : "Testimonial added successfully",
        });
        testimonialForm.reset();
        setEditingItem(null);
        queryClient.invalidateQueries({ queryKey: ['/api/cms/content/testimonials'] });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: editingItem ? "Failed to update testimonial" : "Failed to add testimonial",
        variant: "destructive",
      });
    }
  };

  // Add more stats fields
  const addStatField = () => {
    const currentStats = aboutForm.getValues("stats") || [];
    aboutForm.setValue("stats", [...currentStats, { value: "", label: "" }]);
  };

  // Remove stat field
  const removeStatField = (index: number) => {
    const currentStats = aboutForm.getValues("stats") || [];
    if (currentStats.length > 1) {
      aboutForm.setValue(
        "stats",
        currentStats.filter((_, i) => i !== index)
      );
    }
  };

  // Add a function to handle cancel
  const handleCancel = () => {
    setEditingItem(null);
    portfolioForm.reset();
    serviceForm.reset();
    teamMemberForm.reset();
    testimonialForm.reset();
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
          <TabsTrigger value="contact">Contact</TabsTrigger>
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
          <div className="space-y-6">
            {/* Existing Portfolio Items */}
            <Card>
              <CardHeader>
                <CardTitle>Existing Portfolio Items</CardTitle>
                <CardDescription>Manage your portfolio projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {portfolioData?.data?.map((item: any) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            portfolioForm.reset(item);
                            setEditingItem({ id: item.id, type: 'portfolio' });
                            setActiveTab("portfolio");
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={async () => {
                            try {
                              const updatedItems = portfolioData.data.filter((i: any) => i.id !== item.id);
                              const response = await apiRequest('/api/cms/content/portfolio', {
                                method: 'POST',
                                body: JSON.stringify(updatedItems),
                              });

                              if (response.success) {
                                toast({
                                  title: "Success",
                                  description: "Portfolio item deleted successfully",
                                });
                                queryClient.invalidateQueries({ queryKey: ['/api/cms/content/portfolio'] });
                              }
                            } catch (error) {
                              toast({
                                title: "Error",
                                description: "Failed to delete portfolio item",
                                variant: "destructive",
                              });
                            }
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Add/Edit Portfolio Item */}
            <Card>
              <CardHeader>
                <CardTitle>{editingItem?.type === 'portfolio' ? 'Edit Portfolio Item' : 'Add Portfolio Item'}</CardTitle>
                <CardDescription>
                  {editingItem?.type === 'portfolio' ? 'Edit existing portfolio project' : 'Add a new portfolio project'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...portfolioForm}>
                  <form onSubmit={portfolioForm.handleSubmit(handlePortfolioSubmit)} className="space-y-6">
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
                            <Input 
                              placeholder="Web App, Mobile, UI/UX (comma separated)" 
                              onChange={(e) => {
                                const tags = e.target.value.split(',').map(tag => tag.trim());
                                field.onChange(tags);
                              }}
                              value={field.value.join(', ')}
                            />
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
                    <div className="flex gap-2">
                      <Button type="submit" disabled={portfolioForm.formState.isSubmitting}>
                        {portfolioForm.formState.isSubmitting 
                          ? (editingItem?.type === 'portfolio' ? "Updating..." : "Adding...") 
                          : (editingItem?.type === 'portfolio' ? "Update Portfolio Item" : "Add Portfolio Item")}
                      </Button>
                      {editingItem?.type === 'portfolio' && (
                        <Button type="button" variant="outline" onClick={handleCancel}>
                          Cancel
                        </Button>
                      )}
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Services Tab */}
        <TabsContent value="services">
          <div className="space-y-6">
            {/* Existing Services */}
            <Card>
              <CardHeader>
                <CardTitle>Existing Services</CardTitle>
                <CardDescription>Manage your services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {servicesData?.data?.map((service: any) => (
                    <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{service.title}</h3>
                        <p className="text-sm text-gray-500">{service.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            serviceForm.reset(service);
                            setEditingItem({ id: service.id, type: 'service' });
                            setActiveTab("services");
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={async () => {
                            try {
                              const updatedServices = servicesData.data.filter((s: any) => s.id !== service.id);
                              const response = await apiRequest('/api/cms/content/services', {
                                method: 'POST',
                                body: JSON.stringify(updatedServices),
                              });

                              if (response.success) {
                                toast({
                                  title: "Success",
                                  description: "Service deleted successfully",
                                });
                                queryClient.invalidateQueries({ queryKey: ['/api/cms/content/services'] });
                              }
                            } catch (error) {
                              toast({
                                title: "Error",
                                description: "Failed to delete service",
                                variant: "destructive",
                              });
                            }
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Add/Edit Service */}
            <Card>
              <CardHeader>
                <CardTitle>{editingItem?.type === 'service' ? 'Edit Service' : 'Add Service'}</CardTitle>
                <CardDescription>
                  {editingItem?.type === 'service' ? 'Edit existing service' : 'Add a new service'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...serviceForm}>
                  <form onSubmit={serviceForm.handleSubmit(handleServiceSubmit)} className="space-y-6">
                    <FormField
                      control={serviceForm.control}
                      name="icon"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Icon</FormLabel>
                          <FormControl>
                            <Input placeholder="Icon name (e.g., code, smartphone)" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={serviceForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Service title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={serviceForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Service description" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex gap-2">
                      <Button type="submit" disabled={serviceForm.formState.isSubmitting}>
                        {serviceForm.formState.isSubmitting 
                          ? (editingItem?.type === 'service' ? "Updating..." : "Adding...") 
                          : (editingItem?.type === 'service' ? "Update Service" : "Add Service")}
                      </Button>
                      {editingItem?.type === 'service' && (
                        <Button type="button" variant="outline" onClick={handleCancel}>
                          Cancel
                        </Button>
                      )}
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team">
          <div className="space-y-6">
            {/* Existing Team Members */}
            <Card>
              <CardHeader>
                <CardTitle>Existing Team Members</CardTitle>
                <CardDescription>Manage your team members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamData?.data?.map((member: any) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{member.name}</h3>
                        <p className="text-sm text-gray-500">{member.role}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            teamMemberForm.reset(member);
                            setEditingItem({ id: member.id, type: 'team' });
                            setActiveTab("team");
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={async () => {
                            try {
                              const updatedMembers = teamData.data.filter((m: any) => m.id !== member.id);
                              const response = await apiRequest('/api/cms/content/team', {
                                method: 'POST',
                                body: JSON.stringify(updatedMembers),
                              });

                              if (response.success) {
                                toast({
                                  title: "Success",
                                  description: "Team member deleted successfully",
                                });
                                queryClient.invalidateQueries({ queryKey: ['/api/cms/content/team'] });
                              }
                            } catch (error) {
                              toast({
                                title: "Error",
                                description: "Failed to delete team member",
                                variant: "destructive",
                              });
                            }
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Add/Edit Team Member */}
            <Card>
              <CardHeader>
                <CardTitle>{editingItem?.type === 'team' ? 'Edit Team Member' : 'Add Team Member'}</CardTitle>
                <CardDescription>
                  {editingItem?.type === 'team' ? 'Edit existing team member' : 'Add a new team member'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...teamMemberForm}>
                  <form onSubmit={teamMemberForm.handleSubmit(handleTeamMemberSubmit)} className="space-y-6">
                    <FormField
                      control={teamMemberForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Team member name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={teamMemberForm.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role</FormLabel>
                          <FormControl>
                            <Input placeholder="Team member role" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={teamMemberForm.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Team member bio" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={teamMemberForm.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Image URL</FormLabel>
                          <FormControl>
                            <Input placeholder="Team member image URL" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Social Links</h3>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const currentLinks = teamMemberForm.getValues("socialLinks") || [];
                            teamMemberForm.setValue("socialLinks", [...currentLinks, { type: "", url: "" }]);
                          }}
                        >
                          Add Social Link
                        </Button>
                      </div>
                      {teamMemberForm.watch("socialLinks")?.map((_, index) => (
                        <div key={index} className="flex gap-4 items-start">
                          <FormField
                            control={teamMemberForm.control}
                            name={`socialLinks.${index}.type`}
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormLabel>Platform</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., LinkedIn, Twitter" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={teamMemberForm.control}
                            name={`socialLinks.${index}.url`}
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormLabel>URL</FormLabel>
                                <FormControl>
                                  <Input placeholder="Social media profile URL" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          {teamMemberForm.watch("socialLinks").length > 1 && (
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="mt-8"
                              onClick={() => {
                                const currentLinks = teamMemberForm.getValues("socialLinks");
                                teamMemberForm.setValue(
                                  "socialLinks",
                                  currentLinks.filter((_, i) => i !== index)
                                );
                              }}
                            >
                              X
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" disabled={teamMemberForm.formState.isSubmitting}>
                        {teamMemberForm.formState.isSubmitting 
                          ? (editingItem?.type === 'team' ? "Updating..." : "Adding...") 
                          : (editingItem?.type === 'team' ? "Update Team Member" : "Add Team Member")}
                      </Button>
                      {editingItem?.type === 'team' && (
                        <Button type="button" variant="outline" onClick={handleCancel}>
                          Cancel
                        </Button>
                      )}
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Testimonials Tab */}
        <TabsContent value="testimonials">
          <div className="space-y-6">
            {/* Existing Testimonials */}
            <Card>
              <CardHeader>
                <CardTitle>Existing Testimonials</CardTitle>
                <CardDescription>Manage your testimonials</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {testimonialsData?.data?.map((testimonial: any) => (
                    <div key={testimonial.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="text-sm text-gray-500">{testimonial.content}</p>
                        <p className="font-medium mt-2">{testimonial.authorName}</p>
                        <p className="text-sm text-gray-500">{testimonial.authorRole}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            testimonialForm.reset(testimonial);
                            setEditingItem({ id: testimonial.id, type: 'testimonial' });
                            setActiveTab("testimonials");
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={async () => {
                            try {
                              const updatedTestimonials = testimonialsData.data.filter((t: any) => t.id !== testimonial.id);
                              const response = await apiRequest('/api/cms/content/testimonials', {
                                method: 'POST',
                                body: JSON.stringify(updatedTestimonials),
                              });

                              if (response.success) {
                                toast({
                                  title: "Success",
                                  description: "Testimonial deleted successfully",
                                });
                                queryClient.invalidateQueries({ queryKey: ['/api/cms/content/testimonials'] });
                              }
                            } catch (error) {
                              toast({
                                title: "Error",
                                description: "Failed to delete testimonial",
                                variant: "destructive",
                              });
                            }
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Add/Edit Testimonial */}
            <Card>
              <CardHeader>
                <CardTitle>{editingItem?.type === 'testimonial' ? 'Edit Testimonial' : 'Add Testimonial'}</CardTitle>
                <CardDescription>
                  {editingItem?.type === 'testimonial' ? 'Edit existing testimonial' : 'Add a new testimonial'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...testimonialForm}>
                  <form onSubmit={testimonialForm.handleSubmit(handleTestimonialSubmit)} className="space-y-6">
                    <FormField
                      control={testimonialForm.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Content</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Testimonial content" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={testimonialForm.control}
                      name="authorName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Author Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Author's name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={testimonialForm.control}
                      name="authorRole"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Author Role</FormLabel>
                          <FormControl>
                            <Input placeholder="Author's role/company" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={testimonialForm.control}
                      name="authorImageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Author Image URL</FormLabel>
                          <FormControl>
                            <Input placeholder="Author's image URL" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex gap-2">
                      <Button type="submit" disabled={testimonialForm.formState.isSubmitting}>
                        {testimonialForm.formState.isSubmitting 
                          ? (editingItem?.type === 'testimonial' ? "Updating..." : "Adding...") 
                          : (editingItem?.type === 'testimonial' ? "Update Testimonial" : "Add Testimonial")}
                      </Button>
                      {editingItem?.type === 'testimonial' && (
                        <Button type="button" variant="outline" onClick={handleCancel}>
                          Cancel
                        </Button>
                      )}
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Contact Tab */}
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Edit Contact Information</CardTitle>
              <CardDescription>Update contact information</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...contactForm}>
                <form onSubmit={contactForm.handleSubmit(async (data) => {
                  try {
                    const response = await apiRequest('/api/cms/content/contact', {
                      method: 'POST',
                      body: JSON.stringify(data),
                    });

                    if (response.success) {
                      toast({
                        title: "Success",
                        description: "Contact information updated successfully",
                      });
                      queryClient.invalidateQueries({ queryKey: ['/api/cms/content/contact'] });
                    } else {
                      toast({
                        title: "Error",
                        description: response.message || "Failed to update contact information",
                        variant: "destructive",
                      });
                    }
                  } catch (error) {
                    toast({
                      title: "Error",
                      description: "Failed to update contact information. Please try again.",
                      variant: "destructive",
                    });
                  }
                })} className="space-y-6">
                  <FormField
                    control={contactForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Company address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={contactForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Contact email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={contactForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="Contact phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Social Links</h3>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const currentLinks = contactForm.getValues("socialLinks") || [];
                          contactForm.setValue("socialLinks", [...currentLinks, { type: "", url: "" }]);
                        }}
                      >
                        Add Social Link
                      </Button>
                    </div>
                    {contactForm.watch("socialLinks")?.map((_, index) => (
                      <div key={index} className="flex gap-4 items-start">
                        <FormField
                          control={contactForm.control}
                          name={`socialLinks.${index}.type`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel>Platform</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., LinkedIn, Twitter" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={contactForm.control}
                          name={`socialLinks.${index}.url`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel>URL</FormLabel>
                              <FormControl>
                                <Input placeholder="Social media profile URL" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {contactForm.watch("socialLinks").length > 1 && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="mt-8"
                            onClick={() => {
                              const currentLinks = contactForm.getValues("socialLinks");
                              contactForm.setValue(
                                "socialLinks",
                                currentLinks.filter((_, i) => i !== index)
                              );
                            }}
                          >
                            X
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                  <Button type="submit" disabled={contactForm.formState.isSubmitting}>
                    {contactForm.formState.isSubmitting ? "Updating..." : "Update Contact Information"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}