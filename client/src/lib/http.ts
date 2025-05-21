/* eslint-disable @typescript-eslint/no-unused-vars */

import envConfig from "@/config";
import { LoginResType } from "@/schemaValidations/auth.schema";

/* eslint-disable @typescript-eslint/no-explicit-any */

///
type CustomOptions = RequestInit & {
  baseUrl?: string | undefined;
};

// xu ly error
const ENTITY_ERROR_STATUS = 422;

type EntityErrorPayload = {
  message: string;
  errors: {
    field: string;
    message: string;
  }[];
};

// nen su dung object nhu vay de co cac thuoc tinh
export class HttpError extends Error {
  status: number;
  payload: {
    message: string;
    [key: string]: any;
  };
  constructor({ status, payload }: { status: number; payload: any }) {
    super("Http Error");
    this.status = status;
    this.payload = payload;
  }
}

export class EntityError extends HttpError {
  status: 422;
  payload: EntityErrorPayload;

  constructor({
    status,
    payload,
  }: {
    status: 422;
    payload: EntityErrorPayload;
  }) {
    super({ status, payload });
    this.status = status;
    this.payload = payload;
  }
}

// tao sessionToken o client
class SessionToken {
  private token = "";

  get value() {
    return this.token;
  }

  set value(token: string) {
    // neu goi medthod nay o server thi se bi loi
    if (typeof window === "undefined") {
      throw new Error("Cannot set token on server side");
    }
    this.token = token;
  }
}

export const clientsessionToken = new SessionToken();

//http
const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  options?: CustomOptions
) => {
  const body = options?.body ? JSON.stringify(options.body) : undefined;
  const baseHeaders = {
    "Content-Type": "application/json",
    Authorization: clientsessionToken.value
      ? `Bearer ${clientsessionToken.value}`
      : "",
  };

  // neu khon truyen baseurl hay url = undefined thi lay tu envconfig...
  //neu truyen baseurl thi lay gia tri truyen vao '' thi dong nghia ta goi API den Nextjs server
  const baseUrl =
    options?.baseUrl === undefined
      ? envConfig.NEXT_PUBLIC_API_ENDPOINT
      : options.baseUrl;

  //XU ly truong hop '/api/login/'
  const fullUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    },
    body,
    method,
  });

  const payload: Response = await res.json();

  const data = {
    status: res.status,
    payload,
  };
  if (!res.ok) {
    //error
    if (res.status === ENTITY_ERROR_STATUS) {
      throw new EntityError(
        data as {
          status: 422;
          payload: EntityErrorPayload;
        }
      );
    } else {
      throw new HttpError(data);
    }
  }

  if (["auth/login", "/auth/login"].includes(url)) {
    clientsessionToken.value = (payload as LoginResType).data.token;
  } else if ("/auth/login".includes(url)) {
    clientsessionToken.value = "";
  }

  return data;
};

const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("GET", url, options);
  },

  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("POST", url, { ...options, body });
  },

  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("PUT", url, { ...options, body });
  },

  delete<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("DELETE", url, { ...options, body });
  },
};

export default http;
