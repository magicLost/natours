import { model, Schema, Document } from "mongoose";
import isEmail from "validator/lib/isEmail";
import { hash, compare } from "bcryptjs";
import { randomBytes, createHash } from "crypto";

export interface IUserModel extends Document {
  name: string;
  email: string;
  role: string;
  photo: string;
  password: string;
  passwordConfirm: string;

  passwordChangedAt: string;
  passwordResetToken: string;
  passwordResetExpires: string;
  active: boolean;

  correctPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;

  changedPasswordAfter(jwtTimestamp: string): boolean;

  createPasswordResetToken(): string;
}

export const UserSchema = new Schema({
  name: {
    type: String,
    required: [[true, "Please, tell us your name"]],
    minlength: [2, "Too short name"],
    maxlength: [55, "Too long name"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please provide a valid email"],
  },
  role: {
    type: String,
    enum: ["admin", "user", "guide", "lead-guide"],
    default: "user",
  },
  photo: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: [true, "Please provide a password."],
    minlength: [8, "Too low secure password."],
    maxlength: [255, "What? Are you serious."],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please, confirm your password"],
    validate: {
      //This only work on .CREATE and .SAVE!!!
      validator: function (value: string): boolean {
        return value === (this as any).password;
      },
      message: "Password is not the same",
    },
    select: false,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

/* userSchema.pre(/^find/, function(next) {
  //this points to query
  this.find({ active: { $ne: false } });
  next();
}); */

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  (this as IUserModel).password = await hash((this as IUserModel).password, 12);
  (this as IUserModel).passwordConfirm = "";
  next();
});
UserSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  (this as IUserModel).passwordChangedAt = (Date.now() - 1000).toString();
  next();
});

UserSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  return await compare(candidatePassword, userPassword);
};

UserSchema.methods.changedPasswordAfter = function (jwtTimestamp: number) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      (this.passwordChangedAt.getTime() / 1000).toString(),
      10
    );
    return jwtTimestamp < changedTimestamp;
  }
  return false;
};

UserSchema.methods.createPasswordResetToken = function () {
  const resetToken = randomBytes(32).toString("hex");

  this.passwordResetToken = createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const UserModel = model<IUserModel>("User", UserSchema);

export default UserModel;
