import { ArrowRight, CheckCircle, Zap } from "lucide-react";
import { Button } from "../../components/ui/Button";

type Props = {
  ctaText?: string;
};

export function CtaSection({ ctaText }: Props) {
  return (
    <div className="relative">
      <div className="absolute -top-8 -right-8 w-16 h-16 bg-brand-sage/20 rounded-full animate-pulse" />
      <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-brand-sageLight/30 rounded-full animate-pulse" />

      <div className="relative bg-gradient-to-br from-brand-charcoal via-brand-charcoal/95 to-brand-sageDark/90 rounded-[3rem] p-12 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(${colors.brand.sage} 1px, transparent 1px)`,
              backgroundSize: "30px 30px",
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">
                LIMITED SPOTS AVAILABLE
              </span>
            </div>
            <h3 className="text-4xl font-bold mb-4">
              Start Your Transformation Today
            </h3>
            <p className="text-xl text-white/90 mb-6 max-w-2xl">
              Book your private session and experience fitness that&apos;s
              designed exclusively for you. First session includes a
              complimentary fitness assessment.
            </p>
            <div className="flex items-center gap-4 text-white/80">
              
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-brand-sageLight" />
                <span>Flexible Scheduling</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Button
              href="/contact"
              className="bg-white text-brand-charcoal hover:bg-brand-cream hover:scale-105 transition-transform px-8 py-6 rounded-2xl text-lg font-bold"
              iconRight={<ArrowRight className="w-5 h-5" />}
            >
              {ctaText || "Book Your Private Session"}
            </Button>
            
          </div>
        </div>
      </div>
    </div>
  );
}

const colors = {
  brand: {
    sage: "#A9B79A",
  },
};
