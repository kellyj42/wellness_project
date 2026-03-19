// components/section/PrivateTrainingCompact.tsx
import {
  ArrowRight,
  Sparkles,
  Target,
  Users,
  Zap,
  CheckCircle,
} from "lucide-react";
import { Button } from "../ui/Button";

export default function PrivateTrainingCompact() {
  return (
    <section className="relative bg-gradient-to-br from-brand-cream to-white py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-sageLight rounded-full text-brand-sageDark text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              PRIVATE TRAINING
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-brand-charcoal mb-6">
              Experience Fitness
              <br />
              <span className="text-brand-sageDark">Designed Just For You</span>
            </h2>

            <p className="text-brand-muted mb-8">
              Move beyond group classes and experience truly personalized
              fitness. Our private training programs are tailored to your unique
              goals, schedule, and preferences for faster, more sustainable
              results.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-brand-sageDark mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-brand-charcoal">
                    One-on-One Attention
                  </h4>
                  <p className="text-sm text-brand-muted">
                    Undivided focus from expert trainers
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-brand-sageDark mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-brand-charcoal">
                    Customized Workouts
                  </h4>
                  <p className="text-sm text-brand-muted">
                    Plans that evolve with your progress
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-brand-sageDark mt=1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-brand-charcoal">
                    Flexible Scheduling
                  </h4>
                  <p className="text-sm text-brand-muted">
                    Workouts that fit your lifestyle
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                href="/private-training"
                className="bg-brand-sageDark hover:bg-brand-sage text-white px-8 py-4 rounded-xl font-bold group"
                iconRight={
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                }
              >
                Learn More
              </Button>
              <Button
                href="/private-training"
                variant="outline"
                className="border-brand-sageDark text-brand-sageDark hover:bg-brand-sageDark/5 px-8 py-4 rounded-xl font-bold"
              >
                Book a Session
              </Button>
            </div>
          </div>

          {/* Right Column */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-sageLight">
           

            <div className="space-y-4">
              <h4 className="font-bold text-brand-charcoal text-lg">
                Available Private Services
              </h4>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-brand-sageLight/30 to-transparent rounded-xl border-l-4 border-brand-sage">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-sage flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h5 className="font-bold text-brand-charcoal">
                        Private Reformer
                      </h5>
                      <p className="text-sm text-brand-muted">
                        Personalized Pilates sessions
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-brand-sageDark">
                      From 120K
                    </div>
                    <div className="text-xs text-brand-muted">per session</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-brand-sageLight/30 to-transparent rounded-xl border-l-4 border-brand-sage">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-sage flex items-center justify-center">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h5 className="font-bold text-brand-charcoal">
                        Personal Training
                      </h5>
                      <p className="text-sm text-brand-muted">
                        Strength & conditioning
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-brand-sageDark">
                      From 600K
                    </div>
                    <div className="text-xs text-brand-muted">
                      monthly packages
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-brand-sageLight">
                <p className="text-sm text-brand-muted text-center">
                  Both options include complimentary fitness assessment
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
