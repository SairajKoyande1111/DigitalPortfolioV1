import { Link, useParams } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

interface Brand {
  id: string;
  categoryId: string;
  name: string;
  imageUrl: string;
  instagramUrl: string;
}

const categoryNames: Record<string, string> = {
  "restaurant": "Restaurant",
  "real-estate": "Real Estate",
  "healthcare": "Healthcare",
  "preschools": "Pre Schools",
  "hospitality": "Hospitality",
  "skincare": "Skincare",
  "gyms": "Gyms",
  "salon": "Salon",
};

const brands: Brand[] = [
  { id: "spice-garden", categoryId: "restaurant", name: "Spice Garden", imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=400&fit=crop", instagramUrl: "https://instagram.com/spicegarden" },
  { id: "ocean-bites", categoryId: "restaurant", name: "Ocean Bites", imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=400&fit=crop", instagramUrl: "https://instagram.com/oceanbites" },
  { id: "urban-kitchen", categoryId: "restaurant", name: "Urban Kitchen", imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=400&fit=crop", instagramUrl: "https://instagram.com/urbankitchen" },
  { id: "dream-homes", categoryId: "real-estate", name: "Dream Homes", imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=400&fit=crop", instagramUrl: "https://instagram.com/dreamhomes" },
  { id: "prime-properties", categoryId: "real-estate", name: "Prime Properties", imageUrl: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=400&fit=crop", instagramUrl: "https://instagram.com/primeproperties" },
  { id: "care-plus", categoryId: "healthcare", name: "Care Plus Clinic", imageUrl: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400&h=400&fit=crop", instagramUrl: "https://instagram.com/careplusclinic" },
  { id: "wellness-hub", categoryId: "healthcare", name: "Wellness Hub", imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=400&fit=crop", instagramUrl: "https://instagram.com/wellnesshub" },
  { id: "little-stars", categoryId: "preschools", name: "Little Stars Academy", imageUrl: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=400&fit=crop", instagramUrl: "https://instagram.com/littlestarsacademy" },
  { id: "tiny-tots", categoryId: "preschools", name: "Tiny Tots Preschool", imageUrl: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=400&fit=crop", instagramUrl: "https://instagram.com/tinytots" },
  { id: "grand-resort", categoryId: "hospitality", name: "Grand Resort", imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=400&fit=crop", instagramUrl: "https://instagram.com/grandresort" },
  { id: "luxury-stays", categoryId: "hospitality", name: "Luxury Stays", imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=400&fit=crop", instagramUrl: "https://instagram.com/luxurystays" },
  { id: "glow-beauty", categoryId: "skincare", name: "Glow Beauty", imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=400&fit=crop", instagramUrl: "https://instagram.com/glowbeauty" },
  { id: "pure-skin", categoryId: "skincare", name: "Pure Skin Clinic", imageUrl: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=400&fit=crop", instagramUrl: "https://instagram.com/pureskinclinic" },
  { id: "fitzone", categoryId: "gyms", name: "FitZone", imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop", instagramUrl: "https://instagram.com/fitzone" },
  { id: "power-gym", categoryId: "gyms", name: "Power Gym", imageUrl: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=400&fit=crop", instagramUrl: "https://instagram.com/powergym" },
  { id: "style-studio", categoryId: "salon", name: "Style Studio", imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=400&fit=crop", instagramUrl: "https://instagram.com/stylestudio" },
  { id: "glamour-salon", categoryId: "salon", name: "Glamour Salon", imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop", instagramUrl: "https://instagram.com/glamoursalon" },
];

export default function DigitalMarketingBrands() {
  const params = useParams<{ categoryId: string }>();
  const categoryId = params.categoryId || "";
  const categoryName = categoryNames[categoryId] || "Category";
  
  const filteredBrands = brands.filter((b) => b.categoryId === categoryId);

  if (filteredBrands.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-foreground mb-4">
            No brands found in this category
          </h1>
          <Link href="/projects/digital-marketing">
            <Button variant="outline" data-testid="button-back">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Categories
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/projects/digital-marketing">
            <Button
              variant="ghost"
              className="mb-6 -ml-2 text-muted-foreground"
              data-testid="button-back-categories"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Categories
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-light tracking-[0.15em] sm:tracking-[0.2em] text-foreground mb-3">
            AIRAVATA TECHNOLOGIES
          </h1>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground mb-3">
            {categoryName}
          </h2>
          <p className="text-sm sm:text-lg lg:text-xl text-muted-foreground">
            Our Brand Partners in {categoryName} Industry
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {filteredBrands.map((brand) => (
            <motion.div key={brand.id} variants={cardVariants}>
              <a 
                href={brand.instagramUrl} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Card
                  className="group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  data-testid={`brand-card-${brand.id}`}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={brand.imageUrl}
                      alt={brand.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-lg font-bold text-white">
                        {brand.name}
                      </h3>
                    </div>
                  </div>
                </Card>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
