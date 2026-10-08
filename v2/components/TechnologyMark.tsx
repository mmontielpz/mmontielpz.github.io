import Image from "next/image";

// Adjacent text names the technology, so these marks are decorative.
export default function TechnologyMark({ name }: { name: "github" | "python" | "pytorch" }) {
  return <Image src={`/brands/${name}.svg`} alt="" aria-hidden="true" width={20} height={24} unoptimized style={{ width: 20, height: 24, objectFit: "contain", flexShrink: 0 }} />;
}
