import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request) {
  try {

    // Get the token from the cookie
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    // Console log the token
    console.log("Token:", token?.value);

    // Make the external API call
    const response = await fetch("http://localhost:5000/auth/logout", {
      method: "POST",
      headers: {
        Cookie: `${token?.value}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to create data");
    }

    const data = await response.json();

    // Return the created data
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error creating data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
