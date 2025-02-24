import React, { useState } from "react";

import { Button } from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { signIn } from "next-auth/react";

function LoginForm({ providers }: { providers: any[] }) {
    const appTheme = useTheme();

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
                        onClick={async () =>
                            signIn(provider.id, {
                                email,
                                password,
                                redirect: true,
                                callbackUrl: "/",
                            })
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
