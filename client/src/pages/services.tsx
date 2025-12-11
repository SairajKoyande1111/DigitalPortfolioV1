import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Globe, Smartphone, Code, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import type { Service } from "@shared/schema";

const iconMap: Record<string, typeof Globe> = {
  Globe,
  Smartphone,
  Code,
  TrendingUp,
};

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

function ServiceCardSkeleton() {
  return (
    <Card className="min-h-[280px] p-8 border-card-border bg-card flex flex-col items-center justify-center">
      <Skeleton className="w-20 h-20 rounded-2xl mb-6" />
      <Skeleton className="h-7 w-40 mb-2" />
      <Skeleton className="h-4 w-32" />
    </Card>
  );
}

export default function Services() {
  const { data: services = [], isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Our Services
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transforming ideas into digital excellence
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <ServiceCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            {services.map((service) => {
              const IconComponent = iconMap[service.icon];
              return (
                <motion.div key={service.id} variants={cardVariants}>
                  <Link href={`/projects/${service.slug}`}>
                    <Card
                      className="group relative min-h-[280px] p-8 cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 border-card-border bg-card flex flex-col items-center justify-center text-center"
                      data-testid={`card-service-${service.id}`}
                    >
                      <div className="mb-6 p-4 rounded-2xl bg-primary/10 group-hover:bg-primary/15 transition-colors duration-300">
                        {IconComponent && (
                          <IconComponent
                            className="w-12 h-12 text-primary transition-transform duration-300 group-hover:scale-110"
                            strokeWidth={1.5}
                          />
                        )}
                      </div>
                      <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-2 transition-colors duration-300">
                        {service.title}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {service.tagline}
                      </p>
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-xs font-medium text-primary uppercase tracking-wide">
                          View Projects
                        </span>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}
