"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

interface Post {
  prompt: string;
  tag: string;
}

const CreatePrompt: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [post, setPost] = useState<Post>({
    prompt: "",
    tag: "",
  });

  const createPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        cache: "no-store",
        next: {
          tags: ["posts"],
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: (session?.user as { id: string }).id,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
