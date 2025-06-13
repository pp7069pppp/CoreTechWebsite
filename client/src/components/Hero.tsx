import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-background to-muted py-20">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="container relative mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Transforming Ideas into{" "}
            <span className="text-primary">Digital Reality</span>
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-muted-foreground">
            We help businesses leverage cutting-edge technology to drive growth,
            enhance efficiency, and create exceptional digital experiences.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/contact">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/services">Our Services</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 