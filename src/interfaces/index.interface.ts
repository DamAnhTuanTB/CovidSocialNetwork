export interface IAuthenticateRes {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

export interface IRefreshTokenRes {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}
