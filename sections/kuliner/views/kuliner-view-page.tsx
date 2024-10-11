import { Breadcrumbs } from "@/components/breadcrumbs";
import { ScrollArea } from "@/components/ui/scroll-area";
import EmployeeForm from "../kuliner-form";
import KulinerForm from "@/components/forms/kuliner-form";
import PageContainer from "@/components/layout/page-container";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Kuliner", link: "/dashboard/kuliner" },
  { title: "Create", link: "/dashboard/kuliner/create" },
];

export default function KulinerViewPage() {
  return (
    <PageContainer scrollable>
      <div className="flex-1 space-y-4 p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <KulinerForm />
      </div>
    </PageContainer>
  );
}
