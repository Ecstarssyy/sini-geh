"use client";
import { Breadcrumbs } from "@/components/breadcrumbs";
import NewsForm from "@/components/forms/news-form";
import PageContainer from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { useLoadingCallback } from "react-loading-hook";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Berita", link: "/dashboard/berita" },
];

export default function page() {
  const router = useRouter();
  const [text, setText] = React.useState("");

  const [handleIncrementCounterApi, isIncrementCounterApiLoading] =
    useLoadingCallback(async () => {
      const response = await fetch("/api/berita", {
        method: "POST",
      });

      const result = await response.json();
      console.log(result);
      router.refresh();
    });

  return (
    <PageContainer scrollable={true}>
      <div className="space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Hi, Welcome back 👋
          </h2>
        </div>
        <Breadcrumbs items={breadcrumbItems} />
        <div className="flex flex-col">
          <NewsForm />
        </div>
      </div>
    </PageContainer>
  );
}
