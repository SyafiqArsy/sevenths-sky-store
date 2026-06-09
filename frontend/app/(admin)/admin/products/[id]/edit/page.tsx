import EditProductForm from "@/src/components/admin/EditProductForm";

export default async function EditProductPage({
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
      <div className="max-w-4xl mx-auto px-6">

        <h1 className="text-4xl font-bold">
          Edit Product
        </h1>

        <EditProductForm
          id={Number(id)}
        />

      </div>
    </main>
  );
}