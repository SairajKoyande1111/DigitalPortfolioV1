import { Link, useParams } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { SiInstagram } from "react-icons/si";

import solastaaLogo from "@assets/image_1765458288537.png";
import gplusLogo from "@assets/image_1765458319744.png";
import mokshaLogo from "@assets/image_1765458390096.png";
import spinexLogo from "@assets/image_1765458434786.png";
import manekLogo from "@assets/image_1765458467379.png";
import kangarooLogo from "@assets/image_1765458494060.png";
import triveniLogo from "@assets/image_1765458541581.png";
import oraLogo from "@assets/image_1765458576554.png";
import swarnimaLogo from "@assets/image_1765458606810.png";
import newtownLogo from "@assets/image_1765458630484.png";
import serenadeLogo from "@assets/image_1765458655848.png";
import southstoriesLogo from "@assets/image_1765459028962.png";
import viviLogo from "@assets/image_1765459090394.png";
import blahLogo from "@assets/image_1765459113057.png";
import shiprasLogo from "@assets/image_1765459131739.png";
import winstonLogo from "@assets/Untitled_design_(17)_1765459193483.png";

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
  instagramHandle: string;
  logoUrl: string;
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
  // Salon
  { id: "solastaa-salon", categoryId: "salon", instagramHandle: "solastaa.salon", logoUrl: solastaaLogo, instagramUrl: "https://www.instagram.com/solastaa.salon" },
  
  // Healthcare
  { id: "gplus-heart-hospital", categoryId: "healthcare", instagramHandle: "gplushearthospital", logoUrl: gplusLogo, instagramUrl: "https://www.instagram.com/gplushearthospital" },
  { id: "moksha-skin-hair", categoryId: "healthcare", instagramHandle: "moksha.skin.hair.clinic", logoUrl: mokshaLogo, instagramUrl: "https://www.instagram.com/moksha.skin.hair.clinic" },
  { id: "spinex-clinic", categoryId: "healthcare", instagramHandle: "spinex_clinic", logoUrl: spinexLogo, instagramUrl: "https://www.instagram.com/spinex_clinic" },
  { id: "manek-skin-clinic", categoryId: "healthcare", instagramHandle: "manekskinclinic", logoUrl: manekLogo, instagramUrl: "https://www.instagram.com/manekskinclinic" },
  
  // Pre-Schools
  { id: "kangaroo-kids", categoryId: "preschools", instagramHandle: "kangaroo_kids_kalyan", logoUrl: kangarooLogo, instagramUrl: "https://www.instagram.com/kangaroo_kids_kalyan" },
  
  // Hospitality
  { id: "triveni-banquet", categoryId: "hospitality", instagramHandle: "trivenibanquet", logoUrl: triveniLogo, instagramUrl: "https://www.instagram.com/trivenibanquet" },
  
  // Real Estate
  { id: "ora-makers", categoryId: "real-estate", instagramHandle: "ora_makers", logoUrl: oraLogo, instagramUrl: "https://www.instagram.com/ora_makers" },
  { id: "swarnima-era", categoryId: "real-estate", instagramHandle: "swarnimaera", logoUrl: swarnimaLogo, instagramUrl: "https://www.instagram.com/swarnimaera" },
  { id: "newtown-bilaspur", categoryId: "real-estate", instagramHandle: "newtown.bilaspur", logoUrl: newtownLogo, instagramUrl: "https://www.instagram.com/newtown.bilaspur" },
  
  // Skincare
  { id: "serenade-naturals", categoryId: "skincare", instagramHandle: "serenadenaturals", logoUrl: serenadeLogo, instagramUrl: "https://www.instagram.com/serenadenaturals" },
  
  // Restaurants
  { id: "south-stories", categoryId: "restaurant", instagramHandle: "southstoriesindia", logoUrl: southstoriesLogo, instagramUrl: "https://www.instagram.com/southstoriesindia" },
  { id: "vivi-all-day-bistro", categoryId: "restaurant", instagramHandle: "vivialldaybistro", logoUrl: viviLogo, instagramUrl: "https://www.instagram.com/vivialldaybistro" },
  { id: "blah-bombay", categoryId: "restaurant", instagramHandle: "blahbombay", logoUrl: blahLogo, instagramUrl: "https://www.instagram.com/blahbombay" },
  { id: "shipras-restaurant", categoryId: "restaurant", instagramHandle: "shiprasrestaurant", logoUrl: shiprasLogo, instagramUrl: "https://www.instagram.com/shiprasrestaurant" },
  
  // Gyms
  { id: "train-with-winston", categoryId: "gyms", instagramHandle: "train_with_winston", logoUrl: winstonLogo, instagramUrl: "https://www.instagram.com/train_with_winston" },
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
              <Card
                className="overflow-hidden"
                data-testid={`brand-card-${brand.id}`}
              >
                <a 
                  href={brand.instagramUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block cursor-pointer"
                >
                  <img
                    src={brand.logoUrl}
                    alt={brand.instagramHandle}
                    className="w-full h-auto object-contain"
                    loading="lazy"
                  />
                </a>
                <a 
                  href={brand.instagramUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3 cursor-pointer hover-elevate"
                  data-testid={`instagram-link-${brand.id}`}
                >
                  <SiInstagram className="w-5 h-5 text-pink-600" />
                  <span className="text-sm text-muted-foreground">@{brand.instagramHandle}</span>
                </a>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
