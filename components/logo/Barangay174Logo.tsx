import Image from "next/image";

export default function Barangay174Logo({ size = 60 }: { size?: number }) {
  return (
    <Image
      alt="barangay-174-icon"
      src="/barangay-174-icon.png"
      width={size}
      height={size}
    />
  );
}
