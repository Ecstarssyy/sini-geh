"use client";

import { Breadcrumbs } from "@/components/breadcrumbs";
import NewsForm from "@/components/forms/news-form";
import PageContainer from "@/components/layout/page-container";
import React from "react";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Kuliner", link: "/dashboard/berita" },
];

function Page() {
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

export default Page;
