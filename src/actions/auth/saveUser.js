"use server";
import User from "@/models/auth/User";
import connectDB from "@/lib/db/mongodb";

const saveUser = async (user) => {// also need provider 
  if (!user || !user.email) {
    return { success: false, error: true, message: "Invalid user data" };
  }
  try {
    await connectDB();

    const existingUser = await User.findOne({
      email: user.email,
      provider: user.provider,
    });

    if (!existingUser) {
      const newUser = new User(user);
      const savedUser = await newUser.save();
      return savedUser
        ? { success: true, error: false, message: "User saved successfully!" }
        : { success: false, error: true, message: "Failed to save user" };
    } else {
      // Update existing user
      existingUser.set(user);
      const updatedUser = await existingUser.save();

      return updatedUser
        ? { success: true, error: false, message: "User updated successfully!" }
        : { success: false, error: true, message: "Failed to update user" };
    }
  } catch (error) {
    console.error("Error saving user to db:", error.message);
    return { success: false, error: true, message: "Server error" };
  }
};

export { saveUser };
