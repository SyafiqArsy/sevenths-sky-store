import AdminCategoriesView from "@/src/components/admin/AdminCategoriesView";

export default function CategoriesPage() {
  return (
    <main className="pt-32 pb-20">
      <div className="p-10">

        <h1 className="text-4xl font-bold">
          Categories
        </h1>

        <AdminCategoriesView />

      </div>
    </main>
  );
}