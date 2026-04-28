export default function SectionContainer({
  children,
  className = "",
  id = "",
}) {
  return (
    <section id={id} className={`py-20 md:py-28 ${className}`}>
      <div className="max-w-6xl mx-auto px-6 md:px-8">{children}</div>
    </section>
  );
}