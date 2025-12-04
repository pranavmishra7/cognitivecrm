export interface ImfErrors {
  code: string;
  details: string;
  trace: string;
}

export interface ImfResponse<T> {
  errors: ImfErrors[];
  data: T;
  message: string;
  success: boolean;
}

export interface AuthRequest {
  userName: string;
  password: string;
}

export interface AuthResponse {
  clientId: string;
  token: string;
  expiry: string;
  userName: string;
  userType: string;
}
