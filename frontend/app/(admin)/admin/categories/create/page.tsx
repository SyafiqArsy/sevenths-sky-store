import CreateCategoryForm from "@/src/components/admin/CreateCategoryForm";
import Link from "next/link";

export default function CreateCategoryPage() {
  return (
    <main className="pt-32 pb-20">
        <Link
            href="/admin/categories"
            className="text-gray-500"
            >
            ← Back
        </Link>

      <div className="max-w-3xl mx-auto px-6">

        <h1 className="text-4xl font-bold">
          Create Category
        </h1>

        <CreateCategoryForm />

      </div>
    </main>
  );
}