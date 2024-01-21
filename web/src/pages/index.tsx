import Image from "next/image";
import { Inter, Open_Sans } from "next/font/google";
import Link from "next/link";
import { useRef } from "react";

const inter = Open_Sans({ subsets: ["latin"] });

export default function Home() {
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    console.log("about");
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-b from-on-container to-primary-container ${inter.className}`}
    >
      <div className="fixed top-0 right-0 flex p-4 space-x-4">
        <button
          type="button"
          onClick={scrollToBottom}
          className="justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 hover:scale-110"
        >
          <code className="font-mono font-bold text-sm">About</code>
        </button>
        <Link href="https://github.com/sammyyyyy1/motispectra">
          <p className="justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30 hover:scale-110">
            <code className="font-mono font-bold text-sm">Github</code>
          </p>
        </Link>
      </div>

      <div
        className="relative flex place-items-center before:absolute before:h-[150px] before:w-full sm:before:w-[240px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[90px] after:w-full sm:after:w-[120px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[180px]"
        style={{ width: "900px", height: "450px" }}
      >
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
          src="/MotiSpectra-logos_white.png"
          alt="Next.js Logo"
          width={900}
          height={450}
          priority
        />
      </div>

      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm mt-5 mb-40 transform transition-transform duration-500 hover:scale-110">
        <Link href="/start">
          <p className="fixed left-0 top-0 flex w-full h-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            &nbsp;
            <code className="font-mono font-bold text-2xl">Try it out!</code>
          </p>
        </Link>
      </div>

      <div ref={bottomRef} className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 mb-4">
          <h2 className={`mb-3 text-2xl font-semibold`}>
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              <code className="font-mono font-bold text-2xl">The Vision:</code>
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            MotiSpectra is the answer to the awkwardness of online meetings. There's so much more to a conversation than words. We created a tool to help you read the room, or in this case, the screen.
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 mb-4">
          <h2 className={`mb-3 text-2xl font-semibold`}>
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              <code className="font-mono font-bold text-2xl">The Function:</code>

            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            MotiSpectra is a tool that connects to your virtual call and uses computer vision and machine learning to analyze the mood and attentiveness of the partipants. It then displays the results in a simple, easy to understand format.
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 mb-4">
          <h2 className={`mb-3 text-2xl font-semibold`}>
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              <code className="font-mono font-bold text-2xl">The Method:</code>
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            We built and trained two models using two modified datasets for facial expression. The first model detects the emotion of the participants, and the second detects their attentiveness.
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 mb-4">
          <h2 className={`mb-3 text-2xl font-semibold`}>
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              <code className="font-mono font-bold text-2xl">The Future:</code>
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-balance`}>
            The future will see a review feature for virtual meeting recordings, allowing users to revisit and analyze emotions post-meeting. The project seeks to further bridge the gap in virtual communication, making online interactions more insightful and human.
          </p>
        </div>
      </div>
    </main>
  );
}
