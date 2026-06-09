import LoginForm from "@/src/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </main>
  );
}