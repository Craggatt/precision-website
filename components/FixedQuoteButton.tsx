import { MessageSquareText } from "lucide-react";

export default function FixedQuoteButton() {
  return (
    <div className="bg-neutral-600 fixed bottom-0 right-24 p-400 rounded-t-lg">
      <div className="flex flex-row gap-400 items-center">
        <MessageSquareText className="h-5 w-5" />
        <p className="text-subheading text-white">Get a Free Quote</p>
      </div>
    </div>
  );
}
