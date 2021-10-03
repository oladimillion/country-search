import jwt from "jsonwebtoken";

type Decoded = {
  user?: string | null;
};

export default {
  encode: (data: Object, options?: jwt.SignOptions | undefined): string => {
    return jwt.sign(data, process.env.SECRET_KEY as string, options);
  },
  decode: (token: string): Decoded => {
    try {
      return jwt.verify(token, process.env.SECRET_KEY as string) as Decoded;
    } catch (e) {
      return { user: null };
    }
  },
};
