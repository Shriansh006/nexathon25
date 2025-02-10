"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "../ui/button";
import { BrainIcon } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";


type ChatItem = {
  user : {
    question : string,
  },
  ai : {
    answer : string
  }
};

const AiButton = () => {

  const [chat , setChat] = useState<ChatItem[]>([
    {ai : {answer : "Hello!"} , user : {question : "Hi"}}
  ]);

  useEffect(()=>{
    const chat = localStorage.getItem("ai-chat");
    if(chat){
      setChat(JSON.parse(chat));
    }
  } , []);

  return (
    <Sheet>
      <SheetTrigger>
        <Button 
        variant="ghost"
        size="sm"
        onClick={()=>{}}
        className="w-fit mt-1 py-1 text-xs text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-800"
        >
            <BrainIcon size={15} className="mr-1" />
            Write with AI
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-gray-900 border-gray-800 text-white">
        <SheetHeader>
          <SheetTitle className="text-white flex items-center"><BrainIcon className="mr-2" /> Animate with AI </SheetTitle>
          <SheetDescription>
            Use our powerfull ai to add animations to manimbooks. 
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col w-full h-full justify-end pb-20">

          <div className="h-full w-full flex flex-col justify-end space-x-2 overflow-y-auto">
            
            {
              chat.map((v,_)=>(
                <div key={_} className="flex flex-col w-full">
                  <div className="self-end px-4 py-2 bg-gray-700 rounded-lg">
                    {v.user.question}
                  </div>

                  <div className="self-start px-4 py-2 bg-gray-800 rounded-lg">
                    {v.ai.answer}
                  </div>
                </div>
              ))
            }

          </div>

          <Textarea placeholder="Ask AI" className="bg-gray-800 border-gray-700 placeholder:text-gray-400 mt-4" />

        </div>
      </SheetContent>
    </Sheet>
  )
}

export default AiButton;