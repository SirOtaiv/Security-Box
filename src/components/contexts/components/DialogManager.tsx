import React, { forwardRef, useImperativeHandle, useState } from "react";
import Dialog from "./Dialog";

export type DialogManagerRefType = {
    openDialogComponent: (
        title: string,
        description: string | React.ReactNode,
        callback?: (...args: any[]) => any,
        hasCustomRuleset?: boolean
    ) => void;
};

const DialogManager = forwardRef((props, ref) => {
    const [dialogData, setDialogData] = useState({
        open: false,
        title: "",
        description: "",
        callback: () => {},
        hasCustomRuleset: false,
    });

    const openDialogComponent = (
        title: string,
        description: string,
        callback?: (...args: any[]) => any,
        hasCustomRuleset = false
    ) => {
        setDialogData({
            open: true,
            title,
            description,
            callback: callback || (() => {}),
            hasCustomRuleset,
        });
    };

    const closeDialog = () => {
        setDialogData((prev) => ({ ...prev, open: false }));
    };

    useImperativeHandle(ref, () => ({
        openDialogComponent,
    }));

    return (
        <Dialog
            open={dialogData.open}
            title={dialogData.title}
            description={dialogData.description}
            callback={dialogData.callback}
            closeDialog={closeDialog}
            hasCustomRuleset={dialogData.hasCustomRuleset}
        />
    );
});

DialogManager.displayName = "DialogManager";

export default DialogManager;
