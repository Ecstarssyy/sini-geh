import { Breadcrumbs } from "@/components/breadcrumbs";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import PageContainer from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Employee", link: "/dashboard/employee" },
];

export default function page() {
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Hi, Welcome back 👋
          </h2>
          <div className="hidden items-center space-x-2 md:flex">
            <CalendarDateRangePicker />
            <Button>Download</Button>
          </div>
        </div>
        <Breadcrumbs items={breadcrumbItems} />
      </div>
    </PageContainer>
  );
}
