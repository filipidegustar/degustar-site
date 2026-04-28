export default function CTAButton({
  children,
  href = "#",
  target = "_self",
  variant = "primary",
  className = "",
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm md:text-base font-semibold transition-all duration-300 hover:scale-[1.02]";

  const variants = {
    primary:
      "bg-degustar-orange text-white shadow-lg shadow-degustar-orange/20 hover:opacity-90",
    secondary:
      "bg-white text-degustar-green border border-degustar-green/20 hover:bg-degustar-beige",
    dark: "bg-degustar-green text-white hover:opacity-90",
  };

  return (
    <a
      href={href}
      target={target}
      rel={target === "_blank" ? "noreferrer" : undefined}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}