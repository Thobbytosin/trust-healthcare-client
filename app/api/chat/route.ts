import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const VALID_LOCATIONS = ["lagos", "abuja", "port harcourt"];
    const { messages }: { messages: { role: string; content: string }[] } =
      await req.json();

    // MANUALLY
    // last message  will be usermessage
    const userMessage = messages[messages.length - 1].content.toLowerCase();

    // check if message contains these
    if (
      userMessage.includes("tell me about ") ||
      userMessage.includes("what is this") ||
      userMessage.includes("about is website")
    ) {
      return NextResponse.json({
        reply:
          "Trust HealthCare is an online healthcare platform designed to help Nigerians easily find and connect with licensed doctors. You can search by specialty, location, or availability, and even book appointments right from your device.",
      });
    }

    // check if message contains show doctors by location
    const matchedLocation = VALID_LOCATIONS.find((loc) =>
      userMessage.includes(loc.toLowerCase())
    );

    if (
      userMessage.includes("find doctors from") ||
      matchedLocation ||
      userMessage.includes("show me doctors from") ||
      userMessage.includes("search doctors from")
    ) {
      if (matchedLocation) {
        return NextResponse.json({
          function_call: "navigateToDoctors",
          args: { search: matchedLocation },
        });
      } else {
        return NextResponse.json({
          reply: `Sorry, we don't have doctors listed in this area yet`,
        });
      }
    }

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistralai/mistral-small-3.2-24b-instruct:free",
        messages: [
          {
            role: "system",
            content: `You are MediGuide, a smart and friendly AI assistant on a Nigerian healthcare website. Greet users, answer questions about the platform, and help them navigate to doctor listings or services. 

          Trust HealthCare is an online healthcare platform designed to help Nigerians easily find and connect with licensed doctors. You can search by specialty, location, or availability, and even book appointments right from your device.
          
    
          You have access to the following function:

          - navigateToDoctors(search: string): Call this when the user asks to view doctors by location or specialty. Only accept 'lagos', 'abuja', or 'port harcourt'. If another location is mentioned, reply "We currently don't have doctors in that area yet."

          Examples:
          - "Show me doctors in Lagos" => call navigateToDoctors("lagos")
          - "Find doctors in Abuja" => call navigateToDoctors("abuja")
                  
          `,
          },
          ...messages,
        ],
      }),
    });

    if (!res.ok) {
      const errorText = await res.text(); // get full error content
      console.error("OpenRouter Error:", errorText); // more useful logging
      return NextResponse.json(
        { error: "Failed to connect to OpenRouter", detail: errorText },
        { status: 500 }
      );
    }

    const data = await res.json();
    const choice = data.choices?.[0];

    // DEFAULT RESPONSE
    return NextResponse.json({
      reply: choice.message.content,
    });
  } catch (error) {
    console.log("ERROR AT THIS TIME:", error);
  }
}
