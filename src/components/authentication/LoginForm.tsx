import React, { useContext, useState } from "react";

import { Box, Button, Card, CardActionArea, CardContent, Grid, Paper, Typography } from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { signIn } from "next-auth/react";
import { DialogContext } from "../contexts/DialogContext";

type CombinationsType = number[][]

function LoginForm({ providers }: { providers: any[] }) {
    const appTheme = useTheme();
    const dialogContext = useContext(DialogContext)

    const [combinationsItem, setCombinationsItens] = useState<CombinationsType>([[1,2],[3,4],[5,6],[7,8],[9,0]]);
    const [email, setEmail] = useState("");

    const [selectedItem, setSelectedItem] = useState<CombinationsType>([]);

    const handleNoClick = (combinationItem: number[]) => {
        setSelectedItem((prevValue) => {
            prevValue?.push(combinationItem)
            return prevValue
        })
    }

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
                                        onClick={() => handleNoClick(combination)}
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
                                        alert("Dialog Got Right")
                                        console.log(selectedItem)
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
