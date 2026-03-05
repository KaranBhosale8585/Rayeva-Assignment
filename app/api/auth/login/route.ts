import { connectDB } from "@/lib/mongoDB";
import { User } from "@/models/User";
import { generateToken } from "@/utils/jwt";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    const token = await generateToken(user);
    return NextResponse.json({ message: "Login successful",token }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Server error. Please try again later.",
      },
      {
        status: 500,
      },
    );
  }
}
