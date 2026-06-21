type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "center"
}: SectionHeadingProps) {
  return (
    <div
      className={`mx-auto max-w-3xl ${
        align === "center" ? "text-center" : "text-left"
      }`}
    >
      <p className="text-xs font-bold uppercase tracking-[0.26em] text-gold-deep">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-4xl leading-tight text-charcoal sm:text-5xl">
        {title}
      </h2>
      {copy ? <p className="mt-4 text-base leading-7 text-ink/68">{copy}</p> : null}
    </div>
  );
}
