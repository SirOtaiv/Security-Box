import React, { useContext, useRef, useState } from "react";

import { Box, Button, Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { signIn } from "next-auth/react";
import { DialogContext } from "../contexts/DialogContext";
import TextField from "../shared/Textfield";
import { getPasswordNumbers } from "../../lib/requests/loginRequests";
import { useCustomRouter } from "../../lib/hooks/useCustomRouter";

type CombinationsType = number[][]

function LoginForm({ providers }: { providers: any[] }) {
    const appTheme = useTheme();
    const router = useCustomRouter();
    const dialogContext = useContext(DialogContext)

    const [email, setEmail] = useState("");

    const selectedItem = useRef<CombinationsType>([]);

    const handleOnCardClick = (combinationItem: number[]) => {
        selectedItem.current = [...selectedItem.current, combinationItem];
    };

    const passwordComponent = (combinationsItem: CombinationsType) => (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                height: "100%",
                width: "100%",
                alignItems: "center",
                padding: "16px",
            }}
        >
            <Grid 
                container 
                gap={2}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <TextField 
                    id="email-login-text"
                    fullWidth
                    label="Email"
                />
                {!!combinationsItem &&   
                    combinationsItem.map((combination, index) => {
                        return (
                            <Card
                                key={`combination-index-${index}`}
                                sx={{
                                    boxShadow: "none",
                                    border: "2px solid",
                                    borderColor: "primary.dark",
                                    textAlign: "center",
                                    backgroundColor: "#f5f5f5",

                                }}
                            >
                                <CardActionArea
                                    onClick={() => handleOnCardClick(combination)}
                                >
                                    <CardContent>
                                        <Typography
                                            variant="subtitle2"
                                        >
                                            {combination.join(" ou ")}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        )
                    })
                }
            </Grid>
        </Box>
    )

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
                            const dataConf = await getPasswordNumbers();

                            if (dataConf.result) {
                                dialogContext.openDialogComponent(
                                    "Select Your Password",
                                    passwordComponent(dataConf.result.combinations),
                                    async (answer: string) => {
                                        if (answer == "Y") {
                                            const combinations = selectedItem.current;
                                            const hashCombine = dataConf.result?.hash;
                                            const signInResult = await signIn(provider.id, {
                                                email,
                                                combinations,
                                                hashCombine,
                                                dialogContext,
                                                redirect: false
                                            })
                                            if (signInResult?.error) {
                                                const [status, message] = signInResult.error.split("|");
                                                dialogContext.openDialogComponent(
                                                    `${status} - Security Box Error Request`,
                                                    `${message}`,
                                                    undefined,
                                                    undefined,
                                                    true
                                                )
                                            } else {
                                                router.replace('/')           
                                            }
                                            selectedItem.current = [];
                                        }
                                    }
                                )
                            } else {
                                dialogContext.openDialogComponent(
                                    "500 - Security Box Error Request",
                                    "An error has occurred, please try again Later",
                                    (ans: any) => {
                                        if (ans == "Y") {
                                            console.log("CANCELLED")
                                        }
                                    },
                                    true
                                )
                            }
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
