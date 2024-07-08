import Link from "next/link";

import { api, HydrateClient } from "chl/trpc/server";
import { Container, Porter } from "@commons/components";

export default async function Home() {
  const getAllEvents = await api.event.getAll();
  void api.event.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#FFFFFF] to-[#E6E7FF] text-neutral-400">
        <Container className="sm:justify-center; sm:text-center; mt-6 flex flex-col justify-center px-4">
          <div className="flex justify-between w-full align-middle items-center">
            <h1 className="sm:mx-auto; sm:text-[3rem]; mb-4 mt-4 text-5xl font-extrabold tracking-tight">
              Meus eventos
            </h1>
            <div>
              <Link href="evento/adicionar">
              <button className="px-5 py-5 bg-rose-500 text-white rounded-lg">
                Criar evento
              </button>
              </Link>
            </div>
          </div>
          <Container className="relative grid w-full md:grid-cols-4 gap-4 rounded py-4 sm:grid-cols-1 sm:gap-1">
            {getAllEvents.map(item => (
              <Porter
              key={item.id}
              id={item.id}
              title={item.title}
              date={item.date}
              description={item.content}
              image="https://placehold.co/400x300/png"
            />
            ))}
          </Container>
          {/* <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
            <div className="absolute inset-0 bg-[url(/img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
            <div className="relative bg-white px-6 pb-8 pt-10 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
              <div className="mx-auto max-w-md">
                <img src="/img/logo.svg" className="h-6" alt="Tailwind Play" />
                <div className="divide-y divide-gray-300/50">
                  <div className="space-y-6 py-8 text-base leading-7 text-gray-600">
                    <p>
                      An advanced online playground for Tailwind CSS, including
                      support for things like:
                    </p>
                    <ul className="space-y-4">
                      <li className="flex items-center">
                        <svg
                          className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <circle cx="12" cy="12" r="11" />
                          <path
                            d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9"
                            fill="none"
                          />
                        </svg>
                        <p className="ml-4">
                          Customizing your
                          <code className="text-sm font-bold text-gray-900">
                            tailwind.config.js
                          </code>{" "}
                          file
                        </p>
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <circle cx="12" cy="12" r="11" />
                          <path
                            d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9"
                            fill="none"
                          />
                        </svg>
                        <p className="ml-4">
                          Extracting classes with
                          <code className="text-sm font-bold text-gray-900">
                            @apply
                          </code>
                        </p>
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <circle cx="12" cy="12" r="11" />
                          <path
                            d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9"
                            fill="none"
                          />
                        </svg>
                        <p className="ml-4">Code completion with instant preview</p>
                      </li>
                    </ul>
                    <p>
                      Perfect for learning how the framework works, prototyping
                      a new idea, or creating a demo to share online.
                    </p>
                  </div>
                  <div className="pt-8 text-base font-semibold leading-7">
                    <p className="text-gray-900">
                      Want to dig deeper into Tailwind?
                    </p>
                    <p>
                      <a
                        href="https://tailwindcss.com/docs"
                        className="text-sky-500 hover:text-sky-600"
                      >
                        Read the docs &rarr;
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </Container>
        {/* <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
              href="https://create.t3.gg/en/usage/first-steps"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">First Steps →</h3>
              <div className="text-lg">
                Just the basics - Everything you need to know to set up your
                database and authentication.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
              href="https://create.t3.gg/en/introduction"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">Documentation →</h3>
              <div className="text-lg">
                Learn more about Create T3 App, the libraries it uses, and how
                to deploy it.
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello ? hello.greeting : "Loading tRPC query..."}
            </p>
          </div>

          <LatestPost />
        </div> */}
      </main>
    </HydrateClient>
  );
}
