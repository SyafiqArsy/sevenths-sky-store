import EditCategoryForm from "@/src/components/admin/EditCategoryForm";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {

  const { id } =
    await params;

  return (
    <main className="pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-6">

        <h1 className="text-4xl font-bold">
          Edit Category
        </h1>

        <EditCategoryForm
          id={Number(id)}
        />

      </div>
    </main>
  );
}