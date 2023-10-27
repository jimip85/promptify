import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { revalidateTag } from "next/cache";

export const GET = async (request) => {
  try {
    revalidateTag("posts");
    await connectToDB();

    const prompts = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};

// revalidate every 3 seconds
export const revalidate = 3;
