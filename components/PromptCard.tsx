"use client"

import React, { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { fetchData } from "@app/api/openai/route";
import { Post } from "@app/types";


interface PromptCardProps {
  post: Post;
  handleTagClick?: (tag: string) => void;
  handleEdit?: () => void;
  handleDelete?: () => void;
}

const PromptCard: React.FC<PromptCardProps> = ({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}) => {
  const { data: session } = useSession<boolean>();

  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState<string>("");
  const [completion, setCompletion] = useState<string>("")



  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  const requestPrompt = async () => {
    try {
      const result = await fetchData(post.prompt);
      setCompletion(result);
      toggleModal();
    } catch (error) {
      console.log("Promise failed", error);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="prompt_card glassmorphism">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain border-white border-1"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={copied === post.prompt ? "/icons/tick.svg" : "/icons/copy.svg"}
            alt="copy-text image"
            width={12}
            height={12}
          />
        </div>
        <div className="copy_btn" onClick={requestPrompt}>
          <Image
            src={completion === post.prompt ? "/icons/tick.svg" : "/images/P_1.1.svg"}
            alt="copy-text image"
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>
      {(session?.user as { id: string })?.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-md font-semibold text-purple-600 cursor-pointer"
            onClick={handleEdit}   
          >
            Edit
          </p>
          <p
            className="font-inter text-md font-semibold text-black cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
            <div >
            <div className="my-4">
            <h1 className="animate-typing overflow-hidden whitespace-normal">{completion}</h1>
            </div>
            <button className="flex text-md font-semibold cursor-pointer" onClick={toggleModal}>Close</button>
          </div>
      )}
    </div>
  );
};

export default PromptCard;
