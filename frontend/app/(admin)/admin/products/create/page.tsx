import CreateProductForm from "@/src/components/admin/CreateProductForm";

export default function CreateProductPage() {
  return (
    <main className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold">
          Create Product
        </h1>

        <CreateProductForm />
      </div>
    </main>
  );
}