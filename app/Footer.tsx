import TinyletterForm from "./TinyletterForm";

export default function Footer() {
  return (
    <div className="flex flex-col items-center space-y-4">
        <div className="text-gray-700">
          made by <a href="https://jamesbvaughan.com">james vaughan</a>
        </div>

        <TinyletterForm />
    </div>
  );
}
