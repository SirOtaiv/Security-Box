"use client";

import React, { Suspense, useEffect, useState } from "react";
import {
    CssBaseline,
    Grid,
    Box,
    Typography,
    Paper,
    Icon,
    CircularProgress,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

import { ClientSafeProvider, getProviders, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useCustomRouter } from "@/lib/hooks/useCustomRouter";
import LoginForm from "./LoginForm";

const DivPaper = styled("div")(() => {
    const appTheme = useTheme();

    return {
        margin: appTheme.spacing(8, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    };
});

const ImgIcon = styled("img")(() => ({
    height: "100%",
}));

const DivForm = styled("div")(() => {
    const appTheme = useTheme();

    return {
        width: "100%",
        marginTop: appTheme.spacing(1),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    };
});

function LoginPage() {
    const appTheme = useTheme();
    const [providers, setProviders] = useState<
        ClientSafeProvider[] | undefined
    >();

    useEffect(() => {
        (async () => {
            setProviders(Object.values((await getProviders()) ?? []));
        })();
    }, []);

    const router = useCustomRouter();

    return (
        <Grid
            container
            component="main"
            sx={{
                height: "100vh",
            }}
        >
            <CssBaseline />
            <Grid
                item
                square
                xs={12}
                sm={6}
                md={4}
                component={Paper}
                elevation={6}
            >
                <DivPaper>
                    <Icon
                        sx={{
                            fontSize: 100,
                            textAlign: "center",
                        }}
                    >
                        <ImgIcon
                            alt="Safety Box"
                            src="/weg-logo-blue.svg"
                            sx={{
                                marginBottom: appTheme.spacing(0.5),
                            }}
                        />
                    </Icon>
                    <Typography component="h1" variant="h4">
                        Security Box
                    </Typography>
                    <Typography
                        color="textSecondary"
                        sx={{
                            margin: "12px 0px",
                        }}
                    >
                        Sign in with your Username and Password
                    </Typography>
                    <DivForm>
                        {providers && (
                            <Suspense fallback={<CircularProgress />}>
                                <LoginForm providers={providers} />
                            </Suspense>
                        )}
                        <Box
                            mb={5}
                            sx={{
                                position: "fixed",
                                bottom: 0,
                            }}
                        >
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                align="center"
                            >
                                {"Copyright © "}
                                Noobs Corp Inc {new Date().getFullYear()}. All
                                rights reserved.
                            </Typography>
                        </Box>
                    </DivForm>
                </DivPaper>
            </Grid>
            <Grid
                item
                xs={false}
                sm={6}
                md={8}
                sx={{
                    backgroundImage: "url(/dev-portal.svg)",
                    backgroundRepeat: "no-repeat",
                    backgroundColor: `#3a3a3a`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
        </Grid>
    );
}

export default LoginPage;
