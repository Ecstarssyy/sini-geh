import { searchParamsCache } from "@/lib/searchparams";
import { KulinerListingPage } from "@/sections/kuliner/views";
import { SearchParams } from "nuqs/parsers";
import React, { useEffect } from "react";

type pageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: "Dashboard : Employees",
};

export default async function Page({ searchParams }: pageProps) {
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);
  return <KulinerListingPage />;
}
