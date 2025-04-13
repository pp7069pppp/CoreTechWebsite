import { useState, useEffect } from "react";
import { Quote } from "lucide-react";

type Testimonial = {
  content: string;
  author: string;
  role: string;
  image: string;
};

const TestimonialsSection = () => {
  const testimonials: Testimonial[] = [
    {
      content: "CoreTech transformed our business operations with their innovative cloud solution. Their team's expertise and dedication to our success was exceptional.",
      author: "Michael Johnson",
      role: "CEO, TechVision Inc.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    {
      content: "The mobile app developed by CoreTech helped us increase customer engagement by 200%. Their approach to understanding our business needs was refreshing.",
      author: "Sarah Williams",
      role: "Marketing Director, Innovate LLC",
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    {
      content: "Working with CoreTech on our cybersecurity infrastructure was a game-changer. They identified vulnerabilities we weren't aware of and implemented robust solutions.",
      author: "Alex Thompson",
      role: "CIO, SecureData Systems",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    }
  ];

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
                  {testimonials[currentSlide].content}
                </p>
                <div className="flex items-center">
                  <img 
                    src={testimonials[currentSlide].image} 
                    alt="Client" 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold">{testimonials[currentSlide].author}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{testimonials[currentSlide].role}</p>
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
