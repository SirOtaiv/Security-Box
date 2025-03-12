"use server"

import http from "node:http";
import https from "node:https";
import axios from "axios";
import { LoginOptionEntity } from "./types/backendTypes";
import RequestResponse from "./types/RequestResponse";
import { backendUrl } from "../environmentVariables";

export type CredentialsType = {
    hash: string;
    combinations: number[][];
};

export type UserReponse = {
    username: string;
    email: string;
}


export async function getPasswordNumbers(): Promise<RequestResponse<LoginOptionEntity>> {
    try {
        const { data } = await axios.options(`${backendUrl}/login`,
            {
                httpAgent: new http.Agent({ keepAlive: true }),
                httpsAgent: new https.Agent({ keepAlive: true }),
            },
        );

        return {
            result: data
        }

    } catch (error) {
        console.error(error)
        return {
            error: { status: 500, message: "Failed to get config from backend" },
        };
    }
}

export async function postLogin(
    credentials: CredentialsType
): Promise<RequestResponse<UserReponse>> {
    try {
        const data = await axios.post(
            `${backendUrl}/login`,
            credentials,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                httpAgent: new http.Agent({ keepAlive: true }),
                httpsAgent: new https.Agent({ keepAlive: true }),
            },
        );

        return {
            result: data.data
        }
    } catch (error: any) {
        return {
            error: { status: error.status, message: error.response.data.message },
        };
    }
}