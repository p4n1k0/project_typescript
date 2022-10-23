interface IToken {
  payload: {
    username: string;
    classe: string;
    level: string;
    password: string;
  };
  iat: number;
  exp: number;
}

export default IToken;
