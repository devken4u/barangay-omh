"use client";

import { Hotline } from "@/types";
import toast from "react-hot-toast";

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).then(() => {
    toast.success("Copied to clipboard.");
  });
}

function HotlineItem({ hotline }: { hotline: Hotline }) {
  return (
    <div className="flex items-center">
      <div className="w-full bg-destructive text-background font-bold p-2">
        <p className="text-right">{hotline.label}</p>
      </div>
      <button
        onClick={() => {
          copyToClipboard(hotline.number);
        }}
        className="w-full border-b border-destructive p-2 font-bold flex justify-between items-center cursor-pointer hover:bg-destructive/20"
      >
        {hotline.number}
      </button>
    </div>
  );
}

export default HotlineItem;
