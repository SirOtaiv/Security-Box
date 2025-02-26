"use client";

import React from "react";
import { useTheme } from "@mui/material/styles";
import {
    Button,
    Dialog as MaterialDialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Tooltip,
    IconButton,
} from "@mui/material";
import { CloseTwoTone as CloseTwoToneIcon } from "@mui/icons-material";

type PropsType = {
    open: boolean;
    title: string;
    description: string;
    callback: (...args: any[]) => void;
    closeDialog: () => void;
    hasCustomRuleset?: boolean;
};

const Dialog = ({ open, title, description, callback, closeDialog, hasCustomRuleset }: PropsType) => {
    const appTheme = useTheme();

    const handleYesClick = () => {
        if (hasCustomRuleset) {
            callback("Y", closeDialog);
        } else {
            callback("Y");
            closeDialog();
        }
    };

    const handleNoClick = () => {
        closeDialog();
        callback("N");
    };

    return (
        <MaterialDialog open={open} onClose={closeDialog} fullWidth maxWidth="sm">
            <DialogTitle>
                {title}
                <Tooltip title="Close">
                    <IconButton
                        color="primary"
                        sx={{
                            position: "absolute",
                            right: appTheme.spacing(1),
                            top: appTheme.spacing(1),
                        }}
                        onClick={closeDialog}
                    >
                        <CloseTwoToneIcon />
                    </IconButton>
                </Tooltip>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>{description}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={handleYesClick}>
                    Yes
                </Button>
                <Button variant="contained" color="primary" onClick={handleNoClick}>
                    No
                </Button>
            </DialogActions>
        </MaterialDialog>
    );
};

export default Dialog;
