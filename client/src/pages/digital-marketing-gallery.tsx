import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import restaurantsImage from "@assets/1_1765457400298.png";
import realEstateImage from "@assets/2_1765457400298.png";
import healthcareImage from "@assets/3_1765457400298.png";
import preschoolsImage from "@assets/4_1765457400299.png";
import skincareImage from "@assets/5_1765457400299.png";
import gymsImage from "@assets/6_1765457400300.png";
import salonsImage from "@assets/7_1765457400300.png";
import hospitalityImage from "@assets/8_1765457400300.png";

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

interface Category {
  id: string;
  name: string;
  imageUrl: string;
}

const categories: Category[] = [
  { id: "restaurant", name: "Restaurants", imageUrl: restaurantsImage },
  { id: "real-estate", name: "Real Estate", imageUrl: realEstateImage },
  { id: "healthcare", name: "Health Care", imageUrl: healthcareImage },
  { id: "preschools", name: "Pre Schools", imageUrl: preschoolsImage },
  { id: "hospitality", name: "Hospitality", imageUrl: hospitalityImage },
  { id: "skincare", name: "Skin Care", imageUrl: skincareImage },
  { id: "gyms", name: "Gyms", imageUrl: gymsImage },
  { id: "salon", name: "Salons", imageUrl: salonsImage },
];

export default function DigitalMarketingGallery() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/">
            <Button
              variant="ghost"
              className="mb-6 -ml-2 text-muted-foreground"
              data-testid="button-back-services"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
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
            Digital Marketing Portfolio
          </h2>
          <p className="text-sm sm:text-lg lg:text-xl text-muted-foreground">
            Driving Brand Growth Through Strategic Digital Campaigns
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={cardVariants}>
              <Link href={`/digital-marketing/${category.id}`}>
                <Card
                  className="overflow-hidden cursor-pointer"
                  data-testid={`category-card-${category.id}`}
                >
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-full h-auto object-contain"
                    loading="lazy"
                  />
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
