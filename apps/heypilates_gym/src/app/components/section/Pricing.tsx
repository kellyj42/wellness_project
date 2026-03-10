// app/classes/components/PricingSection.tsx - Mobile responsive
import { CheckCircle, Star, Shield } from "lucide-react";
import { Button } from "../ui/Button";

const pricingPlans = [
  {
    name: "Single Class",
    price: "35,000",
    description: "Perfect for trying out",
    color: "from-gray-100 to-gray-200",
    features: [
      "One fitness class",
      "Mat Pilates, BARRE, TRX or BodyFit",
      "Valid for 30 days",
      "Cancel up to 12 hours before",
    ],
    cta: "Book Single Class",
    popular: false,
  },
  {
    name: "10-Class Pass",
    price: "250,000",
    description: "Best value for regulars",
    color: "from-brand-sageLight to-brand-sage",
    features: [
      "10 fitness classes",
      "Save 30% per class",
      "Valid for 4 weeks",
      "All class types included",
      "Priority booking",
    
    ],
    cta: "Buy Class Package",
    popular: true,
  },
  {
    name: "Reformer Package",
    price: "360,000",
    description: "8 Reformer classes",
    color: "from-brand-sage to-brand-sageDark",
    features: [
      "8 Reformer classes",
      "1-2 people per class",
      "Valid for 6 weeks",
      "Personalized attention",
      "Progress tracking",
      "Equipment provided",
    ],
    cta: "Buy Reformer Package.",
    popular: false,
  },
];

export default function PricingSection() {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-white to-brand-cream">
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-brand-sageLight rounded-full text-brand-sageDark text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            <Star className="w-3 h-3 sm:w-4 sm:h-4" />
            SIMPLE PRICING
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-brand-charcoal mb-4 sm:mb-6">
            Choose Your <span className="text-brand-sageDark">Membership</span>
          </h2>
          <p className="text-sm sm:text-lg text-brand-muted max-w-3xl mx-auto px-2">
            Flexible options for every journey. No contracts, no hidden fees—just 
            quality movement that fits your schedule and budget.
          </p>
        </div>

        {/* Pricing Cards - Stack on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {pricingPlans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative bg-white rounded-2xl sm:rounded-3xl border-2 overflow-hidden transition-all duration-300 hover:shadow-xl ${plan.popular ? 'order-first md:order-none' : ''} ${
                plan.popular 
                  ? 'border-brand-sageDark shadow-lg sm:shadow-xl' 
                  : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-brand-sageDark to-brand-sage text-white text-center py-1.5 sm:py-2 text-xs sm:text-sm font-bold">
                  MOST POPULAR
                </div>
              )}
              
              <div className={`h-1.5 sm:h-2 bg-gradient-to-r ${plan.color}`} />
              
              <div className="p-4 sm:p-6 lg:p-8">
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-brand-charcoal mb-1 sm:mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-brand-muted text-sm sm:text-base">{plan.description}</p>
                </div>

                <div className="mb-6 sm:mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-charcoal">
                      {plan.price.split(',')[0]}
                    </span>
                    <span className="text-xl sm:text-2xl text-brand-charcoal">
                      {plan.price.split(',')[1]}
                    </span>
                    <span className="text-gray-500 ml-1 sm:ml-2 text-sm sm:text-base">UGX</span>
                  </div>
                  {plan.name === "10-Class Pass" && (
                    <p className="text-xs sm:text-sm text-green-600 mt-1 sm:mt-2">
                      Save 30% compared to single classes
                    </p>
                  )}
                </div>

                <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 sm:gap-3">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-brand-sageDark mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  href="/booking"
                  className={`w-full py-3 sm:py-4 text-sm sm:text-base font-bold rounded-lg sm:rounded-xl ${
                    plan.popular
                      ? 'bg-brand-sageDark hover:bg-brand-sage text-white'
                      : 'bg-white border-2 border-brand-sageDark text-brand-sageDark hover:bg-brand-sageLight'
                  }`}
                >
                  {plan.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-brand-sageLight max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-brand-sageLight flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-brand-sageDark" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-bold text-brand-charcoal mb-1 sm:mb-2">
                Happiness Guarantee
              </h3>
              
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}