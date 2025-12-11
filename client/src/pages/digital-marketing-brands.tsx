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
  // Restaurants
  { id: "south-stories", categoryId: "restaurant", name: "South Stories", imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=400&fit=crop", instagramUrl: "https://www.instagram.com/southstoriesindia" },
  { id: "vivi-all-day-bistro", categoryId: "restaurant", name: "Vivi All Day Bistro", imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=400&fit=crop", instagramUrl: "https://www.instagram.com/vivialldaybistro" },
  { id: "blah-bombay", categoryId: "restaurant", name: "Blah Bombay", imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=400&fit=crop", instagramUrl: "https://www.instagram.com/blahbombay/" },
  { id: "shipras-restaurant", categoryId: "restaurant", name: "Shipra's Restaurant", imageUrl: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=400&fit=crop", instagramUrl: "https://www.instagram.com/shiprasrestaurant?igsh=MW5vMTBzcnppYnpu" },
  
  // Real Estate
  { id: "ora-makers", categoryId: "real-estate", name: "Ora Makers", imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=400&fit=crop", instagramUrl: "https://www.instagram.com/ora_makers" },
  { id: "swarnima-era", categoryId: "real-estate", name: "Swarnima Era", imageUrl: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=400&fit=crop", instagramUrl: "https://www.instagram.com/swarnimaera" },
  { id: "newtown-bilaspur", categoryId: "real-estate", name: "Newtown", imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=400&fit=crop", instagramUrl: "https://www.instagram.com/newtown.bilaspur" },
  
  // Healthcare
  { id: "gplus-heart-hospital", categoryId: "healthcare", name: "G Plus Heart Hospital", imageUrl: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400&h=400&fit=crop", instagramUrl: "https://www.instagram.com/gplushearthospital" },
  { id: "moksha-skin-hair", categoryId: "healthcare", name: "Moksha Skin and Hair Clinic", imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=400&fit=crop", instagramUrl: "https://www.instagram.com/moksha.skin.hair.clinic" },
  { id: "spinex-clinic", categoryId: "healthcare", name: "SpineX Physiotherapy Clinic", imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=400&fit=crop", instagramUrl: "https://www.instagram.com/spinex_clinic" },
  { id: "manek-skin-clinic", categoryId: "healthcare", name: "Manek Skin Clinic", imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=400&fit=crop", instagramUrl: "https://www.instagram.com/manekskinclinic" },
  
  // Pre-Schools
  { id: "kangaroo-kids", categoryId: "preschools", name: "Kangaroo Kids", imageUrl: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=400&fit=crop", instagramUrl: "https://www.instagram.com/kangaroo_kids_kalyan" },
  
  // Hospitality
  { id: "triveni-banquet", categoryId: "hospitality", name: "Triveni Banquet", imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=400&fit=crop", instagramUrl: "https://www.instagram.com/trivenibanquet" },
  
  // Skincare
  { id: "serenade-naturals", categoryId: "skincare", name: "Serenade Naturals", imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=400&fit=crop", instagramUrl: "https://www.instagram.com/serenadenaturals" },
  
  // Gyms
  { id: "train-with-winston", categoryId: "gyms", name: "Train with Winston", imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop", instagramUrl: "https://www.instagram.com/train_with_winston?igsh=Nzdld3FydWdkYzdp" },
  
  // Salon
  { id: "solastaa-salon", categoryId: "salon", name: "Solastaa Salon", imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=400&fit=crop", instagramUrl: "https://www.instagram.com/solastaa.salon" },
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
