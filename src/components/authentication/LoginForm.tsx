import React, { useContext, useState } from "react";

import { Box, Button, Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { signIn } from "next-auth/react";
import { DialogContext } from "../contexts/DialogContext";

function LoginForm({ providers }: { providers: any[] }) {
    const appTheme = useTheme();
    const dialogContext = useContext(DialogContext)

    const componentTest = (
        <Box>
            <Grid container spacing={2}>
                <Card>
                    <CardActionArea>
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
                                DAWNDLAWNDLJANWLDNW
                            </Typography>
                            <Typography
                                variant="body2"
                            >
                                akwdljandlanwdljnawldnawljdbkajwbdjkawbdkjbawkjdbawkjbdkjawbdkjawbdjk
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
