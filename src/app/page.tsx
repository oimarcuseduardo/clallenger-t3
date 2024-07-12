import Link from "next/link";

import { api, HydrateClient } from "chl/trpc/server";
import { Container, Porter } from "@commons/components";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const getAllEvents = await api.event.getAll();
  void api.event.getLatest.prefetch();

  const { userId } = auth();
  const user = await currentUser();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#FFFFFF] to-[#E6E7FF] text-neutral-400">
        <Container className="sm:justify-center; sm:text-center; mt-6 flex flex-col px-4 ">
          <div className="flex h-14 w-full justify-between align-middle">
            <div></div>
            <div className="flex flex-row justify-between sm:flex-row-reverse md:flex-row">
              <SignedOut>
                <SignInButton>Entrar / Cadastra</SignInButton>
              </SignedOut>
              <div className="flex flex-row justify-between sm:flex-row-reverse align-middle">
                <div className="mr-2 flex flex-row align-middle ml-1">
                  {user?.emailAddresses[0]?.emailAddress}
                </div>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </div>
          </div>
        </Container>
        <Container className="sm:justify-center; sm:text-center; mt-6 flex flex-col justify-center px-4">
          <div className="flex w-full items-center justify-between align-middle">
            <h1 className="sm:mx-auto; sm:text-[3rem]; mb-4 mt-4 text-5xl font-extrabold tracking-tight">
              Meus eventos
            </h1>
            {userId && (
              <div>
                <Link href="evento/adicionar">
                  <button className="rounded-lg bg-rose-500 px-5 py-5 text-white">
                    Criar evento
                  </button>
                </Link>
              </div>
            )}
          </div>
          <Container className="relative grid w-full gap-4 rounded py-4 sm:grid-cols-1 sm:gap-1 md:grid-cols-4">
            {getAllEvents.map((item) => (
              <Porter
                key={item.id}
                id={item.id}
                title={item.title}
                date={item.date}
                description={item.content}
                editable={!!userId}
                image="https://placehold.co/400x300/png"
              />
            ))}
          </Container>
        </Container>
      </main>
    </HydrateClient>
  );
}
