"use client"; 

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useCustomRouter } from "../../lib/hooks/useCustomRouter";

const SessionProvider = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useCustomRouter();

    useEffect(() => {
    if (status === "authenticated") {
        setIsAuthenticated(true);
    }
    if (!session) {
        router.replace("/auth/login")
    }
    }, [session, status, router]);

    return <>{children}</>;
};

export default SessionProvider;
