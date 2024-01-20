import { Navbar } from "@/components/navbar";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Video } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import Image from "next/image";
import { cardContent } from "@/utils/constant";

export default function Home() {
  const [roomId, setRoomId] = useState("");
  const [inputValue, setInputValue] = useState("");

  const router = useRouter();

  const createAndJoin = () => {
    const roomId = uuidv4();
    router.push(`${roomId}`);
  };

  const joinRoom = () => {
    if (roomId) {
      router.push(`${roomId}`);
    } else {
      alert("Enter a room id");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-2">
        <div className="h-[90vh] flex flex-col justify-center items-start px-[3em]">
          <h4 className="text-[44px] font-sans text-[#000000DE] leading-[3.25rem] pb-[0.5em]">
            Premium video meetings.
            <br />
            Now free for everyone.
          </h4>
          <p className="text-[#5F6368] text-lg pb-[3em]">
            We re-engineered the service that we built for secure
            <br />
            business meetings, Google Meet, to make it free and
            <br />
            available for all.
          </p>
          <div className="flex justify-between items-center w-9/12">
            <Button onClick={createAndJoin}>
              <Video className="mr-2 h-4 w-4" /> New Meeting
            </Button>
            <div className="flex w-full pl-5 ">
              <Input
                type="search"
                placeholder="Enter a code or link"
                className="border-[#5F6368] w-1/2"
                value={roomId}
                onChange={(e) => setRoomId(e?.target?.value)}
              />
              <Button
                onClick={joinRoom}
                disabled={!roomId}
                variant={"ghost"}
                className="text-lg text-[#5F6368]"
              >
                Join
              </Button>
            </div>
          </div>
        </div>
        <div className="h-[90vh] flex justify-center items-center">
          <Carousel className="w-full max-w-md max-h-sm outline-0">
            <CarouselContent>
              {cardContent.map((items, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                        <div className="flex justify-center items-center pb-[3em]">
                          <Image
                            src={items.img}
                            height={250}
                            width={250}
                            alt="carasolItem"
                          />
                        </div>
                        <span className="text-2xl font-normal">
                          {items.title}
                        </span>
                        <p className="text-sm text-center mt-5">
                          {items.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
}
