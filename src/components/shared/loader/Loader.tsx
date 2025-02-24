"use client";

import React, { forwardRef, useImperativeHandle, useState } from "react";

import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

import "./Loader.css";

const BoxLoader = styled(Box)(() => ({
    width: "100%",
    height: "100%",
    top: "0px",
    left: "0px",
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1400,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
}));

const Loader = forwardRef((props: { visible?: boolean }, ref) => {
    const [visible, setVisible] = useState(
        undefined === props.visible ? true : props.visible,
    );

    useImperativeHandle(ref, () => ({
        setVisible,
    }));

    if (visible) {
        return (
            <BoxLoader className="weg-loading-main-div">
                <div className="weg-loading-spinner">
                    <div className="color color1" />
                    <div className="color color2" />
                    <div className="color color3" />
                    <div className="color color4" />
                </div>
            </BoxLoader>
        );
    }

    return null;
});

Loader.displayName = "Loader";

export default Loader;
