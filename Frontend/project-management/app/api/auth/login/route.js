import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const apiUrl = "http://localhost:5000/auth/login"; // Replace with your actual API URL
    const requestBody = { email, password };

    const flaskResponse = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!flaskResponse.ok) {
      throw new Error("Login failed");
    }

    const data = await flaskResponse.json();

    const cookieValue = flaskResponse.headers.get("Set-Cookie");
    console.log(cookieValue);
    if (cookieValue) {
      cookies().set("token", cookieValue, {
        // secure: true,  // Uncomment this in production with HTTPS
        maxAge: 1000 * 60,
      });
    }

    // Create a new response
    const nextResponse = NextResponse.json(data);

    return nextResponse;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
