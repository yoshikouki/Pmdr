import { Timer } from "@/components/Timer";

export default function RootPage() {
  return (
    <main>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="text-center lg:max-w-5xl lg:w-full">
          <Timer />
        </div>
      </div>
    </main>
  );
}
