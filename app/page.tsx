"use client";
import { useChat } from "ai/react";
import { Bot, Loader2, Send, User2 } from "lucide-react";
import Markdown from "./component/markdown";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat({
      api: "api/genai",
    });
  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      {/* form Element */}
      {RenderForm()}
      {RenderMessages()}
      {/* {JSON.stringify(messages)} */}
      {/* rendering messages */}
    </main>
  );

  // liner render function
  function RenderForm() {
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(event, {
            data: {
              prompt: input,
            },
          });
        }}
        className="w-full flex flex-row gap-2 items-center h-full"
      >
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className="border-b border-dashed outline-none w-full px-4 py-2 text-[#0842A0] placeholder:text-[#0842A099] text-right focus:placeholder-transparent disabled:bg-transparent"
          placeholder={isLoading ? "Generating..." : "Ask something..."}
          disabled={isLoading}
        />
        <button
          type="submit"
          className="rounded-full shadow-md border flex flex-row"
        >
          {isLoading ? (
            <Loader2
              onClick={stop}
              className="p-3 w-10 h-10 stroke-stone-500 animate-spin"
            />
          ) : (
            <Send className="p-3 h-10 w-10 stroke-stone-500" />
          )}
        </button>
        {/* send Button */}
      </form>
    );
  }

  function RenderMessages() {
    return (
      <div
        id="chatBox"
        className="flex flex-col-reverse w-full text-left mt-4 gap-4 whitespace-pre-wrap"
      >
        {messages.map((m, index) => {
          return (
            <div
              key={index}
              className={`px-4 pt-2 shadow-md rounded-md ml-10 relative ${
                m.role === "user" ? "bg-stone-300" : ""
              }`}
            >
              <Markdown text={m.content} />
              {m.role === "user" ? (
                <User2 className="absolute size-9 p-2 border rounded-full shadow-md top-2 -left-14 stroke-[#0842A0]" />
              ) : (
                <Bot
                  className={`absolute size-9 p-2 border rounded-full shadow-md top-2 -left-14 stroke-[#0842A0] ${
                    isLoading && index === messages.length - 1
                      ? "animate-bounce"
                      : ""
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }
}
