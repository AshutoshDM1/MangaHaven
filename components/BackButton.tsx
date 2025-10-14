import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = ({path}: {path: string}) => {
const router = useRouter();
  return (
    <div className="flex items-center self-start">
      <button
        onClick={() => router.push(path)}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-purple-400 hover:bg-purple-900/20 transition-all duration-200 w-fit px-3 py-2 rounded-lg border border-gray-700 hover:border-purple-600 backdrop-blur-sm bg-[#1a1a1a] shadow-sm hover:shadow-md"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>
    </div>
  );
};

export default BackButton;