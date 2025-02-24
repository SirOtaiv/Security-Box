"use client";

import { createContext, useEffect, useMemo, useRef } from "react";
import { PropsChildrenType } from "@/lib/utils/interfaces/props";
import { usePathname, useSearchParams } from "next/navigation";
import Loader from "@/components/shared/loader/Loader";

export enum LoaderStatus {
    LOADING,
    LOADED,
}

type LoaderContextType = {
    setLoadingStatus: (status: LoaderStatus) => void;
};

const DEFAULT_LOADER_CONTEXT_VALUE: LoaderContextType = {
    setLoadingStatus(): object {
        throw new Error("Function not implemented.");
    },
};

const LoaderContext = createContext<LoaderContextType>(
    DEFAULT_LOADER_CONTEXT_VALUE,
);
export default LoaderContext;

type PropsType = PropsChildrenType;

export function LoaderContextProvider({ children }: PropsType) {
    const loaderRef = useRef<any>(null);

    const setLoadingStatus = (status: LoaderStatus) => {
        loaderRef.current.setVisible(status === LoaderStatus.LOADING);
    };
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        setLoadingStatus(LoaderStatus.LOADED);
    }, [pathname, searchParams]);

    const value = useMemo(() => ({ setLoadingStatus }), []);

    return (
        <LoaderContext.Provider value={value}>
            <Loader ref={loaderRef} visible={false} />
            {children}
        </LoaderContext.Provider>
    );
}
