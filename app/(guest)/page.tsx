"use client";

import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function Home() {
  const { toast } = useToast();
  const [checked, setChecked] = useState(false);

  return (
    <div className="w-full flex justify-center items-center">
      <div className="rounded-md  flex-col bg-red-500 mt-8 w-[50%] flex items-center justify-center py-3">
        <h2 className="font-bold text-white">INI TEKS</h2>
        <div className="flex gap-5 items-center">
          <p>Aktifkan?</p>
          <Switch
            onCheckedChange={(value) => {
              setChecked(value); // Ubah status checked
              toast({
                variant: value ? "default" : "destructive",
                title: "Kamu menekan switch",
                description: `Status: ${value}`,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}
