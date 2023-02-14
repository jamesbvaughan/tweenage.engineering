import Link from "next/link";

export default function Header() {
  return (
    <div className="py-4">
      <Link
        href="/"
        className="font-bold text-xl font-mono hover:text-gray-400"
      >
        tweenage engineering
      </Link>
    </div>
  );
}
