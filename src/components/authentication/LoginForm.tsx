import React, { useContext, useEffect, useRef, useState } from "react";

import { Box, Button, Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { signIn } from "next-auth/react";
import { DialogContext } from "../contexts/DialogContext";
import TextField from "../shared/Textfield";

type CombinationsType = number[][]

function LoginForm({ providers }: { providers: any[] }) {
    const appTheme = useTheme();
    const dialogContext = useContext(DialogContext)

    const [combinationsItem, setCombinationsItens] = useState<CombinationsType>([[1,2],[3,4],[5,6],[7,8],[9,0]]);
    const [email, setEmail] = useState("");

    const selectedItem = useRef<CombinationsType>([]);

    const handleOnClick = (combinationItem: number[]) => {
        selectedItem.current = [...selectedItem.current, combinationItem];
        console.log("Itens selecionados:", selectedItem.current);
    };

    const componentTest = (
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
                {
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
                                    onClick={() => handleOnClick(combination)}
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
                            dialogContext.openDialogComponent(
                                "Select Your Password",
                                componentTest,
                                async (answer: string) => {
                                    if (answer == "Y") {
                                        console.log(selectedItem.current)
                                        
                                        selectedItem.current = [];
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
