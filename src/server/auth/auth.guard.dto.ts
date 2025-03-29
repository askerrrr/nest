export interface AdminData {
  readonly hashedLogin: string;
  readonly hashedPasswd: string;
}

export interface LoginCredentials {
  readonly login: string;
  readonly passwd: string;
}
