import LoaderContext, { LoaderStatus } from "@/components/contexts/LoaderContext";
import {
    AppRouterInstance,
    NavigateOptions,
} from "next/dist/shared/lib/app-router-context.shared-runtime";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useContext } from "react";

export function useCustomRouter(): AppRouterInstance {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const loaderContext = useContext(LoaderContext);

    return {
        ...router,
        push: (href: string, options?: NavigateOptions | undefined) => {
            if (
                href.trim() !==
                `${pathname}${
                    searchParams.keys.length > 0 ? "?" : ""
                }${searchParams}`.trim()
            ) {
                loaderContext.setLoadingStatus(LoaderStatus.LOADING);
                router.push(href, options);
            }
        },
        replace: (href: string, options?: NavigateOptions | undefined) => {
            if (
                href.trim() !==
                `${pathname}${
                    searchParams.keys.length > 0 ? "?" : ""
                }${searchParams}`.trim()
            ) {
                loaderContext.setLoadingStatus(LoaderStatus.LOADING);
                router.replace(href, options);
            }
        },
    };
}

