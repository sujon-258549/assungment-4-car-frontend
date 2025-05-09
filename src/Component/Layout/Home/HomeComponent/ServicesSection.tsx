import {
  FaTools,
  FaCarAlt,
  FaOilCan,
  FaShieldAlt,
  FaChevronRight,
} from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: "Expert Maintenance",
      shortDescription:
        "Comprehensive vehicle servicing by certified technicians.",
      fullDescription:
        "Our certified technicians provide comprehensive vehicle servicing using only OEM parts. We perform 150-point inspections on every vehicle to ensure optimal performance and safety. Services include engine diagnostics, brake checks, suspension evaluation, and electrical system testing.",
      icon: <FaTools className="text-3xl text-blue-400" />,
      image:
        "https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      duration: "2-4 hours",
      priceRange: "$99 - $499",
      warranty: "12 months",
      benefits: [
        "Extended vehicle lifespan",
        "Improved fuel efficiency",
        "Enhanced safety",
        "Maintained resale value",
      ],
      toolsUsed: [
        "OEM diagnostic tools",
        "Laser alignment",
        "Computerized systems",
      ],
      certifications: ["ASE Certified", "Manufacturer Trained"],
      availability: "Mon-Sat: 7am-7pm",
      rating: 4.8,
      reviews: 142,
      popularServices: ["Oil change", "Brake service"],
      serviceAreas: ["Engine", "Transmission", "Brakes", "Suspension"],
      ecoFriendly: true,
      loanerCars: true,
      appointmentNeeded: false,
      serviceGuarantee: "100% satisfaction or we'll make it right",
    },
    {
      id: 2,
      title: "Custom Modifications",
      shortDescription: "Enhance your vehicle's performance and aesthetics.",
      fullDescription:
        "Transform your vehicle with our premium customization services. From performance upgrades to aesthetic enhancements, our specialists will bring your vision to life. We offer ECU tuning, suspension modifications, body kits installation, and premium audio systems.",
      icon: <FaCarAlt className="text-3xl text-red-400" />,
      image:
        "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      duration: "Varies by project",
      priceRange: "$199 - $5,000+",
      warranty: "6-24 months",
      benefits: [
        "Increased horsepower",
        "Unique styling",
        "Improved handling",
        "Personalized comfort",
      ],
      toolsUsed: ["Dyno testing", "3D modeling", "Precision cutting tools"],
      certifications: ["SEMA Certified", "Performance Specialist"],
      availability: "By appointment",
      rating: 4.9,
      reviews: 87,
      popularServices: ["ECU tuning", "Suspension l..."],
      serviceAreas: ["Performance", "Exterior", "Interior", "Audio"],
      ecoFriendly: false,
      loanerCars: false,
      appointmentNeeded: true,
      serviceGuarantee: "Quality craftsmanship guarantee",
    },
    {
      id: 3,
      title: "Oil & Fluids",
      shortDescription: "Premium quality oil changes and fluid replacements.",
      fullDescription:
        "Keep your engine running smoothly with our premium fluid services. We use only top-tier synthetic oils and manufacturer-approved fluids. Our service includes oil change, filter replacement, fluid level checks, and top-offs for all essential systems.",
      icon: <FaOilCan className="text-3xl text-amber-400" />,
      image:
        "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      duration: "30-60 minutes",
      priceRange: "$49 - $199",
      warranty: "6 months",
      benefits: [
        "Engine protection",
        "Smoother operation",
        "Prevent overheating",
        "Extend component life",
      ],
      toolsUsed: ["Fluid extractors", "Filter wrenches", "Diagnostic scanners"],
      certifications: ["Oil Specialist Certified"],
      availability: "Walk-ins welcome",
      rating: 4.7,
      reviews: 215,
      popularServices: ["Synthetic oil c..", "Transmission f.."],
      serviceAreas: ["Engine oil", "Transmission", "Coolant", "Brakes"],
      ecoFriendly: true,
      loanerCars: false,
      appointmentNeeded: false,
      serviceGuarantee: "Proper levels or free recheck",
    },
    {
      id: 4,
      title: "Extended Warranties",
      shortDescription: "Peace of mind with comprehensive coverage options.",
      fullDescription:
        "Protect your investment with our flexible warranty programs. Choose from various coverage levels to match your driving needs and budget. All plans include 24/7 roadside assistance, rental car coverage, and nationwide repair network access.",
      icon: <FaShieldAlt className="text-3xl text-green-400" />,
      image:
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      duration: "Instant activation",
      priceRange: "$29/month - $199/month",
      warranty: "Up to 10 years",
      benefits: [
        "Bumper-to-bumper coverage",
        "Transferable plans",
        "No deductible options",
        "Trip interruption benefits",
      ],
      toolsUsed: ["Coverage calculators", "Claim processing systems"],
      certifications: ["NADA Approved", "Better Business Bureau A+"],
      availability: "24/7 online",
      rating: 4.6,
      reviews: 178,
      popularServices: ["Powertrain ..", "Electrical systems"],
      serviceAreas: ["Mechanical", "Electrical", "Hybrid", "Rust"],
      ecoFriendly: false,
      loanerCars: true,
      appointmentNeeded: false,
      serviceGuarantee: "Claims paid within 48 hours",
    },
  ];

  return (
    <section className="py-16 ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-black sm:text-4xl">
            Our Premium Services
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Quality care for your vehicle at competitive prices
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-[#000] rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2 border border-gray-700"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-gray-900/80 p-3 rounded-full shadow-md backdrop-blur-sm">
                  {service.icon}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-300 mb-4">
                  {service.shortDescription.slice(0, 20)}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {service.popularServices.slice(0, 3).map((item, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-gray-700 text-gray-200 px-2 py-1 rounded"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <button className="w-full mt-2 flex items-center justify-between gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium py-2 px-4 rounded-lg bg-gray-900/50 hover:bg-gray-700/50">
                      <span>Read more</span>
                      <FaChevronRight className="text-sm" />
                    </button>
                  </DialogTrigger>
                  <DialogContent
                    style={{ zIndex: 999 }}
                    className="sm:max-w-2xl bg-gray-800 overflow-y-auto border border-gray-700 text-white my-[50px] max-h-[80vh]"
                  >
                    <DialogHeader>
                      <DialogTitle className="text-2xl">
                        {service.title}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                      <div className="relative h-64 rounded-lg overflow-hidden">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-lg mb-2">
                            Service Details
                          </h4>
                          <p className="text-gray-300">
                            {service.fullDescription}
                          </p>

                          <h4 className="font-semibold text-lg mt-4 mb-2">
                            Key Benefits
                          </h4>
                          <ul className="space-y-2 text-gray-300">
                            {service.benefits.map((benefit, i) => (
                              <li key={i} className="flex items-start">
                                <span className="text-blue-400 mr-2">✓</span>
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <div className="bg-gray-700/50 p-4 rounded-lg">
                            <h4 className="font-semibold text-lg mb-3">
                              Service Info
                            </h4>
                            <div className="space-y-3 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-400">Duration:</span>
                                <span className="text-white">
                                  {service.duration}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">
                                  Price Range:
                                </span>
                                <span className="text-white">
                                  {service.priceRange}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Warranty:</span>
                                <span className="text-white">
                                  {service.warranty}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Rating:</span>
                                <span className="text-white">
                                  {service.rating}/5 ({service.reviews} reviews)
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">
                                  Availability:
                                </span>
                                <span className="text-white">
                                  {service.availability}
                                </span>
                              </div>
                            </div>
                          </div>

                          <h4 className="font-semibold text-lg mt-4 mb-2">
                            Popular Services
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {service.popularServices.map((item, idx) => (
                              <span
                                key={idx}
                                className="text-xs bg-gray-700 text-gray-200 px-2 py-1 rounded"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
