import { useState, useEffect } from "react";
import { Quote } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

type Testimonial = {
  id: number;
  content: string;
  authorName: string;
  authorRole: string;
  authorImageUrl: string;
};

type ApiResponse = {
  success: boolean;
  data: Testimonial[];
};

const TestimonialsSection = () => {
  const { data: testimonialsData } = useQuery<ApiResponse>({
    queryKey: ['/api/cms/content/testimonials'],
    refetchOnWindowFocus: false
  });

  const testimonials = testimonialsData?.data || [];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-all">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Client Testimonials</h2>
          <div className="mt-2 h-1 w-20 bg-primary mx-auto"></div>
        </div>
        
        <div className="testimonial-slider relative max-w-4xl mx-auto">
          <div className="testimonial-track overflow-hidden">
            <div className="testimonial-slide">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="text-primary text-4xl">
                    <Quote size={36} />
                  </div>
                </div>
                <p className="text-lg mb-6">
                  {testimonials[currentSlide]?.content}
                </p>
                <div className="flex items-center">
                  <img 
                    src={testimonials[currentSlide]?.authorImageUrl} 
                    alt="Client" 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold">{testimonials[currentSlide]?.authorName}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{testimonials[currentSlide]?.authorRole}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="testimonial-dots flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button 
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
