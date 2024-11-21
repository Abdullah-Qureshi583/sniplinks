"use server";
import connectDB from "@/lib/db/mongodb";
import User from "@/models/auth/User";

const checkPassword = async ({ email, password }) => {
  await connectDB();
  const userExist = await User.findOne({ email });

  if (userExist) {
    if (userExist.password === password) {
      return {
        success: true,
        error: false,
        message: "Login successful!",
      };
    } else {
      return {
        success: false,
        error: true,
        message: "Invalid password!",
      };
    }
  } else {
    return {
      success: false,
      error: true,
      message: "User not found!",
    };
  }
};
export { checkPassword };
