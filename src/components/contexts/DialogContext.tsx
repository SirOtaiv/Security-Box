"use client";

import React, {
    PropsWithChildren,
    ReactNode,
    useCallback,
    useMemo,
    useRef,
} from "react";

import DialogManager, {
    DialogManagerRefType,
} from "@/components/contexts/components/DialogManager";

export type DialogContextType = {
    openDialogComponent: (
        title: string,
        description: string | ReactNode,
        closeCallback?: (...args: any[]) => any,
        hasCustomRuleset?: boolean,
        oneButtonOnly?: boolean,
    ) => any;
};

export const DialogContext = React.createContext<DialogContextType>({
    openDialogComponent: () => {},
});

export type UserErrorType = {
    title: string;
    description: string | ReactNode;
    callback?: (...args: any[]) => any;
};

type PropsType = object & PropsWithChildren;

function DialogContextProvider({ children }: PropsType) {

    const dialogManagerRef = useRef<DialogManagerRefType>(null);

    const openDialogComponent = useCallback(
        (title: string, description: string | React.ReactNode, callback?: (...args: any[]) => any, hasCustomRuleset?: boolean, oneButtonOnly?: boolean,) => {
            dialogManagerRef.current?.openDialogComponent(title, description, callback, hasCustomRuleset, oneButtonOnly);
        },
        []
    );

    return (
        <DialogContext.Provider value={{ openDialogComponent }}>
            <DialogManager ref={dialogManagerRef} />
            {children}
        </DialogContext.Provider>
    );
}

export default DialogContextProvider;
