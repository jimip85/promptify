import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { revalidatePath, revalidateTag } from "next/cache";

export const POST = async (request) => {
  const { userId, prompt, tag } = await request.json();

  try {
    await connectToDB();
    const newPrompt = new Prompt({ creator: userId, prompt, tag });

    await newPrompt.save();

    revalidatePath("/api/prompt");
    revalidatePath("/");
    revalidateTag("posts");
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};

// revalidate every 3 seconds
export const revalidate = 3;
