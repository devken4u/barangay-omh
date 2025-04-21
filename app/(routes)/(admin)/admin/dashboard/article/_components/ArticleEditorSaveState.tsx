import { Loader, Check } from "lucide-react";

function ArticleEditorSaveState({ isLoading }: { isLoading: boolean }) {
  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <Loader className="animate-spin size-5" />
        Saving
      </div>
    );
  }

  if (!isLoading) {
    return (
      <div className="flex items-center gap-2 text-green-500">
        <Check className="size-5" />
        Saved
      </div>
    );
  }
}

export default ArticleEditorSaveState;
