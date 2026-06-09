import RegisterForm from "@/src/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </main>
  );
}