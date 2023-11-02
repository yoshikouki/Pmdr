export default function RootPage() {
  return (
    <main>
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="text-center lg:max-w-5xl lg:w-full">
          <div className="rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
            <h2 className={`mb-3 text-2xl font-black`}>25:00</h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Find in-depth information about Next.js features and API.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
