import { Linkedin, Twitter, Github, Dribbble } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

type TeamMember = {
  id: number;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  socialLinks: {
    type: 'linkedin' | 'twitter' | 'github' | 'dribbble';
    url: string;
  }[];
};

type ApiResponse = {
  success: boolean;
  data: TeamMember[];
};

const TeamSection = () => {
  const { data: teamData } = useQuery<ApiResponse>({
    queryKey: ['/api/cms/content/team'],
    refetchOnWindowFocus: false
  });

  const team = teamData?.data || [];

  const getSocialIcon = (type: string) => {
    switch (type) {
      case 'linkedin':
        return <Linkedin className="h-4 w-4" />;
      case 'twitter':
        return <Twitter className="h-4 w-4" />;
      case 'github':
        return <Github className="h-4 w-4" />;
      case 'dribbble':
        return <Dribbble className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <section id="team" className="py-16 transition-all">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Our Leadership Team</h2>
          <div className="mt-2 h-1 w-20 bg-primary mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Meet the experts who drive our vision and lead our talented team.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
              <img 
                src={member.imageUrl} 
                alt={member.name} 
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-primary mb-2">{member.role}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {member.bio}
                </p>
                <div className="flex space-x-3">
                  {member.socialLinks.map((link, linkIndex) => (
                    <a 
                      key={linkIndex} 
                      href={link.url} 
                      className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-all"
                    >
                      {getSocialIcon(link.type)}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
