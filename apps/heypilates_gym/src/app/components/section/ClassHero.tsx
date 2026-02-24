// app/classes/components/ClassHero.tsx - Mobile responsive
import { Sparkles, Target, Heart, Zap } from "lucide-react";

export default function ClassHero() {
  const features = [
    { icon: <Target className="w-4 h-4 sm:w-5 sm:h-5" />, text: "Small Groups" },
    { icon: <Heart className="w-4 h-4 sm:w-5 sm:h-5" />, text: "Expert Instructors" },
    { icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5" />, text: "60-Minute Sessions" },
    { icon: <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />, text: "All Levels Welcome" },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-brand-sageDark to-brand-sage">
      {/* Decorative elements - hidden on mobile */}
      <div className="hidden sm:block absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-32 -translate-y-32" />
      <div className="hidden sm:block absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-48 translate-y-48" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-24 md:py-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/20 backdrop-blur rounded-full text-white text-xs sm:text-sm mb-4 sm:mb-8">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            GROUP CLASSES
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-8 leading-tight">
            Movement for
            <span className="block text-brand-cream mt-1 sm:mt-2">Every Body</span>
          </h1>
          
          <p className="text-sm sm:text-base md:text-xl text-white/90 mb-6 sm:mb-10 max-w-2xl">
            Experience the perfect blend of strength, mindfulness, and community 
            in our boutique group classes. Small groups ensure personalized attention 
            while maintaining the energy of shared movement
          </p>
          
          {/* Features - Stack on mobile */}
          <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-12">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 backdrop-blur rounded-full text-white text-sm sm:text-base"
              >
                {feature.icon}
                <span className="font-medium whitespace-nowrap">{feature.text}</span>
              </div>
            ))}
          </div>
          
          {/* Buttons - Stack on mobile */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="px-6 py-3 sm:px-8 sm:py-4 bg-white text-brand-sageDark font-bold rounded-lg sm:rounded-xl hover:bg-brand-cream transition-colors text-sm sm:text-base">
              View Schedule & Book
            </button>
           
          </div>
        </div>
      </div>
    </div>
  );
}