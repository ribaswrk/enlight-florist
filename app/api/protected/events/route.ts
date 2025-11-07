export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import {
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../../../controllers/eventcontroller";
import jwt from "jsonwebtoken";

// ✅ GET: Fetch events with optional filtering by eventId and homeView
export async function GET(req: Request) {
  try {
    // ✅ Parse query parameters
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get("eventId");
    const homeView = searchParams.get("homeView");

    // ✅ Convert query parameters to appropriate types
    const parsedEventId = eventId ? parseInt(eventId, 10) : undefined;
    const parsedHomeView = homeView ? parseInt(homeView, 10) : undefined;

    // ✅ Fetch events based on query params
    const events = await getEvent(parsedEventId, parsedHomeView);

    return NextResponse.json(events);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

// ✅ POST: Create a new event
export async function POST(req: NextRequest) {
  try {
    // ✅ Extract Bearer token manually
    const authHeader = req.headers.get("authorization");
    const tokenString = authHeader?.split(" ")[1]; // Get token after "Bearer "

    console.log("Extracted Token:", tokenString); // Debugging

    if (!tokenString) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    // ✅ Manually decode the token using `jsonwebtoken`
    let decodedToken;
    try {
      decodedToken = jwt.verify(tokenString, process.env.NEXTAUTH_SECRET!) as {
        id: string;
        name: string;
        role: string;
      };
      console.log("Decoded Token:", decodedToken); // Debugging
    } catch (error) {
      console.error("JWT Verification Error:", error);
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    if (!decodedToken) {
      return NextResponse.json({ error: "Unauthorized API" }, { status: 401 });
    }

    const formData = await req.formData();

    const newEvent = await createEvent(formData);
    return NextResponse.json(newEvent, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}

// ✅ PUT: Update a event
export async function PUT(req: NextRequest) {
  try {
    // ✅ Extract Bearer token manually
    const authHeader = req.headers.get("authorization");
    const tokenString = authHeader?.split(" ")[1]; // Get token after "Bearer "

    if (!tokenString) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(tokenString, process.env.NEXTAUTH_SECRET!) as {
        id: string;
        name: string;
        role: string;
      };
      console.log("Decoded Token:", decodedToken); // Debugging
    } catch (error) {
      console.error("JWT Verification Error:", error);
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    if (!decodedToken) {
      return NextResponse.json({ error: "Unauthorized API" }, { status: 401 });
    }

    const formData = await req.formData();
    const eventId = formData.get("id");
    const updatedEvent = await updateEvent(Number(eventId), formData);
    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.log("updateevet", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

// ✅ DELETE: Remove an event
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await deleteEvent(Number(id));
    return NextResponse.json({ message: "Event deleted successfully" });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}
