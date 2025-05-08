"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  enableChatbotAction,
  disableChatbotAction,
} from "@/app/actions/websiteSettings";
import { startTransition, useActionState } from "react";
import { Loader } from "lucide-react";

function Chatbot({ initial }: { initial: boolean }) {
  const [state, action, isPending] = useActionState(async () => {
    return await enableChatbotAction();
  }, null);
  const [state2, action2, isPending2] = useActionState(async () => {
    return await disableChatbotAction();
  }, null);

  return (
    <div>
      <div className="space-x-2 flex items-center">
        <Label htmlFor="chatbot">CHATBOT</Label>
        <Switch
          disabled={isPending || isPending2}
          defaultChecked={initial}
          id="chatbot"
          onCheckedChange={(checked) => {
            if (checked) {
              startTransition(() => {
                action();
              });
            } else {
              startTransition(() => {
                action2();
              });
            }
          }}
        />
        {(isPending || isPending2) && <Loader className="animate-spin" />}
      </div>
    </div>
  );
}

export default Chatbot;
