import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "../../ui/Button";

type Props = {
  ctaText?: string;
};

export default function HeroCTA({ ctaText }: Props) {
  return (
    <div className="mt-12 flex flex-wrap gap-4 animate-slide-up delay-300">
      <Button
        href="https://studiobookingonline.com/heypilatesstudiokla/classes.html"
        iconRight={<ArrowRight className="w-4 h-4" />}
      >
        Book Your Class
      </Button>
      <Button variant="secondary" href="/classes#live-booking">
        View Schedule
      </Button>
    </div>
  );
}
