import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, UtensilsCrossed, Building2, HeartPulse, GraduationCap, Hotel, Sparkles, Dumbbell, Scissors, Play } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
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
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

interface Category {
  id: string;
  name: string;
  icon: typeof UtensilsCrossed;
  color: string;
}

interface Brand {
  id: string;
  categoryId: string;
  name: string;
  logo?: string;
  reels: Reel[];
}

interface Reel {
  id: string;
  thumbnailUrl: string;
  videoUrl?: string;
  title: string;
}

const categories: Category[] = [
  { id: "restaurant", name: "Restaurant", icon: UtensilsCrossed, color: "from-orange-500 to-red-500" },
  { id: "real-estate", name: "Real Estate", icon: Building2, color: "from-blue-500 to-indigo-500" },
  { id: "healthcare", name: "Healthcare", icon: HeartPulse, color: "from-emerald-500 to-teal-500" },
  { id: "preschools", name: "Pre Schools", icon: GraduationCap, color: "from-yellow-500 to-amber-500" },
  { id: "hospitality", name: "Hospitality", icon: Hotel, color: "from-purple-500 to-pink-500" },
  { id: "skincare", name: "Skincare", icon: Sparkles, color: "from-rose-400 to-pink-400" },
  { id: "gyms", name: "Gyms", icon: Dumbbell, color: "from-slate-600 to-zinc-700" },
  { id: "salon", name: "Salon", icon: Scissors, color: "from-fuchsia-500 to-purple-500" },
];

const brands: Brand[] = [
  {
    id: "b1",
    categoryId: "restaurant",
    name: "Spice Garden",
    reels: [
      { id: "r1", thumbnailUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=700&fit=crop", title: "Grand Opening" },
      { id: "r2", thumbnailUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=700&fit=crop", title: "Chef Special" },
    ],
  },
  {
    id: "b2",
    categoryId: "restaurant",
    name: "Ocean Bites",
    reels: [
      { id: "r3", thumbnailUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=700&fit=crop", title: "Seafood Festival" },
    ],
  },
  {
    id: "b3",
    categoryId: "real-estate",
    name: "Dream Homes",
    reels: [
      { id: "r4", thumbnailUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=700&fit=crop", title: "Luxury Villa Tour" },
    ],
  },
  {
    id: "b4",
    categoryId: "healthcare",
    name: "Care Plus Clinic",
    reels: [
      { id: "r5", thumbnailUrl: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400&h=700&fit=crop", title: "Health Tips" },
    ],
  },
  {
    id: "b5",
    categoryId: "skincare",
    name: "Glow Beauty",
    reels: [
      { id: "r6", thumbnailUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=700&fit=crop", title: "Skincare Routine" },
    ],
  },
  {
    id: "b6",
    categoryId: "gyms",
    name: "FitZone",
    reels: [
      { id: "r7", thumbnailUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=700&fit=crop", title: "Workout of the Day" },
    ],
  },
  {
    id: "b7",
    categoryId: "salon",
    name: "Style Studio",
    reels: [
      { id: "r8", thumbnailUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=700&fit=crop", title: "Trending Hairstyles" },
    ],
  },
  {
    id: "b8",
    categoryId: "hospitality",
    name: "Grand Resort",
    reels: [
      { id: "r9", thumbnailUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=700&fit=crop", title: "Resort Tour" },
    ],
  },
  {
    id: "b9",
    categoryId: "preschools",
    name: "Little Stars Academy",
    reels: [
      { id: "r10", thumbnailUrl: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=700&fit=crop", title: "Fun Learning Day" },
    ],
  },
];

export default function DigitalMarketingGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [isReelDialogOpen, setIsReelDialogOpen] = useState(false);

  const filteredBrands = selectedCategory
    ? brands.filter((b) => b.categoryId === selectedCategory)
    : brands;

  const handleBrandClick = (brand: Brand) => {
    setSelectedBrand(brand);
    setIsReelDialogOpen(true);
  };

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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Browse by Industry</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {categories.map((category) => {
              const IconComponent = category.icon;
              const isSelected = selectedCategory === category.id;
              return (
                <motion.button
                  key={category.id}
                  onClick={() =>
                    setSelectedCategory(isSelected ? null : category.id)
                  }
                  className={`relative flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-300 ${
                    isSelected
                      ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                      : ""
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  data-testid={`category-${category.id}`}
                >
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center mb-2 shadow-md`}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-medium text-foreground text-center">
                    {category.name}
                  </span>
                </motion.button>
              );
            })}
          </div>
          {selectedCategory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 flex justify-center"
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedCategory(null)}
                data-testid="button-clear-filter"
              >
                Clear Filter
              </Button>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">
            {selectedCategory
              ? `${categories.find((c) => c.id === selectedCategory)?.name} Brands`
              : "Our Brand Partners"}
          </h3>
          {filteredBrands.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No brands available in this category yet.
              </p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
            >
              {filteredBrands.map((brand) => {
                const category = categories.find(
                  (c) => c.id === brand.categoryId
                );
                return (
                  <motion.div key={brand.id} variants={cardVariants}>
                    <Card
                      className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden"
                      onClick={() => handleBrandClick(brand)}
                      data-testid={`brand-card-${brand.id}`}
                    >
                      <div className="p-4">
                        <div
                          className={`w-full aspect-square rounded-lg bg-gradient-to-br ${category?.color || "from-gray-400 to-gray-600"} flex items-center justify-center mb-3 relative overflow-hidden`}
                        >
                          <span className="text-2xl font-bold text-white">
                            {brand.name
                              .split(" ")
                              .map((w) => w[0])
                              .join("")}
                          </span>
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                              <Play className="w-6 h-6 text-white fill-white" />
                            </div>
                          </div>
                        </div>
                        <h4 className="font-semibold text-foreground text-center truncate">
                          {brand.name}
                        </h4>
                        <p className="text-xs text-muted-foreground text-center mt-1">
                          {brand.reels.length} Reel{brand.reels.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </motion.div>
      </div>

      <Dialog open={isReelDialogOpen} onOpenChange={setIsReelDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              {selectedBrand?.name} - Reels
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
            {selectedBrand?.reels.map((reel) => (
              <motion.div
                key={reel.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="relative group cursor-pointer"
                data-testid={`reel-${reel.id}`}
              >
                <div className="aspect-[9/16] rounded-lg overflow-hidden bg-muted">
                  <img
                    src={reel.thumbnailUrl}
                    alt={reel.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-14 h-14 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                      <Play className="w-7 h-7 text-white fill-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white text-sm font-medium truncate">
                      {reel.title}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {selectedBrand?.reels.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No reels available yet.</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
