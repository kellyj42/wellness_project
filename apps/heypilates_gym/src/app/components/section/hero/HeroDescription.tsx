type Props = {
  conceptText?: string;
};

export default function HeroDescription({ conceptText }: Props) {
  return (
    <p
      className="
      mt-8 text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl
      animate-slide-up delay-100
    "
    >
      {conceptText ||
        "Boutique movement training blending Pilates and TRX to build strength, balance, and body awareness."}
    </p>
  );
}
