import React, { useContext, useState } from "react";

import { Box, Button, Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { signIn } from "next-auth/react";
import { DialogContext } from "../contexts/DialogContext";

function LoginForm({ providers }: { providers: any[] }) {
    const appTheme = useTheme();
    const dialogContext = useContext(DialogContext)

    const [selectedItem, setSelectedItem] = useState();

    const componentTest = (
        <Box
        sx={{
            display: "flex",
            justifyContent: "left",
            height: "100%",
            alignItems: "start",
            cursor: "not-allowed",
        }}
        >
            <Grid container spacing={2}>
                <Card>
                    <CardActionArea
                        onClick={() => alert("dklawndlawnldbawkubdkuawbdk")}
                    >
                        <CardContent
                            sx={{
                                "&:last-child": {
                                    paddingBottom: "16px",
                                    paddingTop: "16px",
                                },
                            }}
                        >
                            <Typography
                                variant="subtitle2"
                            >
                                1, 2
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card>
                    <CardActionArea
                        onClick={() => alert("2")}
                    >
                        <CardContent
                            sx={{
                                "&:last-child": {
                                    paddingBottom: "16px",
                                },
                            }}
                        >
                            <Typography
                                variant="subtitle2"
                            >
                                1, 2
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card>
                    <CardActionArea
                        onClick={() => alert("3")}
                    >
                        <CardContent
                            sx={{
                                "&:last-child": {
                                    paddingBottom: "16px",
                                },
                            }}
                        >
                            <Typography
                                variant="subtitle2"
                            >
                                1, 2
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card>
                    <CardActionArea
                        onClick={() => alert("4")}
                    >
                        <CardContent
                            sx={{
                                "&:last-child": {
                                    paddingBottom: "16px",
                                },
                            }}
                        >
                            <Typography
                                variant="subtitle2"
                            >
                                1, 2
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card>
                    <CardActionArea
                        onClick={() => alert("5")}
                    >
                        <CardContent
                            sx={{
                                "&:last-child": {
                                    paddingBottom: "16px",
                                },
                            }}
                        >
                            <Typography
                                variant="subtitle2"
                            >
                                1, 2
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        </Box>
    )

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <>
            {providers.map((provider) => {
                return (
                    <Button
                        id="login-button"
                        key={provider.id}
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{
                            margin: appTheme.spacing(0, 0, 0),
                            marginTop: appTheme.spacing(1.5),
                        }}
                        onClick={async () => {
                            dialogContext.openDialogComponent(
                                "Select Your Password",
                                componentTest,
                                async (answer: string) => {
                                    if (answer == "Y") {
                                        alert("Dialog Got Right")
                                    }
                                }
                            )
                                // signIn(provider.id, {
                                //     email,
                                //     password,
                                //     redirect: true,
                                //     callbackUrl: "/",
                                // })
                            }
                        }
                    >
                        {`Sign in with ${provider.name}`}
                    </Button>
                );
            })}
        </>
    );
}

export default LoginForm;
