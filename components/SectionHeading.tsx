type SectionHeadingProps = {
  number: string;
  title: string;
  note?: string;
};

export default function SectionHeading({
  number,
  title,
  note,
}: SectionHeadingProps) {
  return (
    <header className="section-heading">
      <span className="folio">{number}</span>
      <h2>{title}</h2>
      {note ? <p>{note}</p> : null}
    </header>
  );
}
