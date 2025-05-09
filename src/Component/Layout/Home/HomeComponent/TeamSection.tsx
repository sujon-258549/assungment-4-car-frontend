import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

const TeamSection = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Lead Mechanic",
      bio: "20+ years in automotive repair. ASE Master Certified.",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      social: { linkedin: "#", twitter: "#", github: "#" },
      specialty: "German Automobiles",
    },
    {
      id: 2,
      name: "Maria Garcia",
      role: "Service Manager",
      bio: "Customer service expert in auto maintenance.",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      social: { linkedin: "#", twitter: "#", github: "#" },
      specialty: "Process Optimization",
    },
    {
      id: 3,
      name: "Jamal Williams",
      role: "Electrical Specialist",
      bio: "Expert in vehicle electronics and ADAS.",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      social: { linkedin: "#", twitter: "#", github: "#" },
      specialty: "Hybrid/EV Systems",
    },
    {
      id: 4,
      name: "Sarah Chen",
      role: "Body Shop Tech",
      bio: "Precision collision repair & paint matching.",
      image:
        "https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      social: { linkedin: "#", twitter: "#", github: "#" },
      specialty: "Luxury Restoration",
    },
  ];

  return (
    <section className="py-12 ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2
            className="text-3xl font-bold text-black
           sm:text-4xl"
          >
            Our Expert Team
          </h2>
          <p className="mt-2 text-gray-600">
            Skilled professionals for your vehicle
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold text-white">{member.name}</h3>
                <p className="text-blue-400 text-sm">{member.role}</p>
                <p className="text-gray-300 text-xs mt-2">{member.bio}</p>

                <div className="mt-3">
                  <p className="text-xs text-gray-400">
                    <span className="font-medium">Specialty:</span>{" "}
                    {member.specialty}
                  </p>
                </div>

                <div className="mt-4 flex justify-center space-x-3">
                  <a
                    href={member.social.linkedin}
                    className="text-gray-400 hover:text-blue-500"
                  >
                    <FaLinkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={member.social.twitter}
                    className="text-gray-400 hover:text-blue-300"
                  >
                    <FaTwitter className="w-4 h-4" />
                  </a>
                  <a
                    href={member.social.github}
                    className="text-gray-400 hover:text-white"
                  >
                    <FaGithub className="w-4 h-4" />
                  </a>
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
