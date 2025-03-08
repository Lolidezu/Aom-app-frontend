import WelcomeButton from "@/app/welcome/components/WelcomeButton";

export default function WelcomePage() {
  return (
    <div className="relative bg-gradient-to-r from-black via-gray-900 to-black min-h-screen flex flex-col justify-center items-center text-white">
      <h1 className="text-6xl font-bold mb-8">Welcome to Aom video archive</h1>
      <div className="flex gap-4">
        <WelcomeButton href="/video" label="View All Videos" />
        <WelcomeButton href="/login" label="Enter Admin" />
      </div>
    </div>
  );
}
