import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface UserDocument extends mongoose.Document {
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next: Function) {
  const user = this as UserDocument;

  // making sure only new password is hashed
  if (!user.isModified("password")) return next();

  // @ts-ignore
  const salt = await bcrypt.genSalt(+process.env.SALT_FACTOR);

  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

UserSchema.methods.comparePassword = async function (password: string) {
  const user = this as UserDocument;
  try {
    return bcrypt.compare(password, user.password);
  } catch (e) {
    return false;
  }
};

export default mongoose.model<UserDocument>("User", UserSchema);
