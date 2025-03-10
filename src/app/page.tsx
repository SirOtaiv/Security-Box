"use client"

import { Suspense } from "react";
import { Typography } from "@mui/material";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();

  return (
    !!session.data && (
      <Suspense>
          <Typography>
            Login Realizado :)
            Seja Bem Vindo, {session.data.user?.name}
          </Typography>
      </Suspense>
    )
  );
}
