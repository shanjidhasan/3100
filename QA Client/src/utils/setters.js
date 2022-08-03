import { loadStorage } from "./persistLocalStorage";
let token = loadStorage("token");


export const setHeader = (tok) => {
    let config;

    return config = {
        headers: {
            "Content-Type": `application/json`,
            "x-auth-token": `${tok ? tok : loadStorage("token")}`,
        },
    };
};

export const setHeaderFileUploader = (tok) => {
    let headers;

    return headers = {
        "Content-Type": "multipart/form-data",
        "x-auth-token": `${tok ? tok : loadStorage("token")}`,
    };
};

// [...new Array(12)].map(() => `Cras mattis consectetur.`).join('\n')
