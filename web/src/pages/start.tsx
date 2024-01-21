import Button from "@/components/Button";
import LineGraph from "@/components/LineGraph";
import RadarGraph from "@/components/RadarGraph";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Page() {
  const videoRef = useRef<any>(null);
  const [stream, setStream] = useState<null | MediaStream>(null);
  const [graphTab, setGraphTab] = useState<"radar" | "avg">("radar");

  async function startStream() {
    try {
      const mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: { mediaSource: "screen" } as MediaTrackConstraintSet,
      });
      setStream(mediaStream);
    } catch (error) {
      console.error("Error accessing screen capture:", error);
    }
  }
  function closeStream() {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      setStream(null);
    }
  }
  const takeScreenshot = () => {
    const canvas = document.createElement("canvas");
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    canvas.getContext("2d")?.drawImage(video, 0, 0);
    return canvas.toDataURL("image/png");
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => closeStream(), []);
  useEffect(() => {
    async function updateLoop() {
      while (stream && videoRef.current) {
        console.log("update");
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      updateLoop();
    }
  }, [stream]);

  return (
    <div className="h-dvh flex p-4 gap-4">
      <div className="flex flex-col flex-[65] gap-4">
        <div
          className={`w-full ${stream ? "max-h-[100dvh_-_76px]" : "h-[80%]"} rounded-xl outline outline-on-surface flex justify-center items-center`}
        >
          {stream ? (
            <video
              ref={videoRef}
              className="object-fill"
              autoPlay
              playsInline
              muted
              style={{ maxWidth: "100%" }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <Image
                src="/MotiSpectra-logos_white.png"
                alt="MotiSpectra"
                width={250}
                height={200}
              />
              <p className="text-headline-small font-mono font-bold">
                Use the toolbar below to start screensharing
              </p>
            </div>
          )}
        </div>
        <div className="flex gap-4">
          <Button
            onClick={startStream}
            disabled={!!stream}
            className="font-mono font-bold"
          >
            Start Screensharing
          </Button>
          <Button
            onClick={closeStream}
            disabled={!stream}
            className="bg-error font-mono font-bold"
          >
            Stop Screensharing
          </Button>
          <Button onClick={takeScreenshot} className="font-mono font-bold">
            Take Screenshot
          </Button>
        </div>
      </div>
      <div className="flex-[35]">
        <div className="w-full flex">
          <button
            className={`${graphTab === "radar" ? "bg-primary-container" : "bg-secondary-container"} flex-1 
                        transition-colors rounded-t-xl p-3 text-label-large`}
            onClick={() => setGraphTab("radar")}
          >
            Radar Graphs
          </button>
          <button
            className={`${graphTab === "avg" ? "bg-primary-container" : "bg-secondary-container"} flex-1 
                        transition-colors rounded-t-xl p-3 text-label-large`}
            onClick={() => setGraphTab("avg")}
          >
            Moving Average Graphs
          </button>
        </div>
        <div className="w-full bg-primary-container p-3 rounded-b-xl">
          {graphTab === "radar" ? (
            <>
              <div className="w-full flex justify-center pr-[2%]">
                <div className="w-[225px]">
                  <RadarGraph
                    labels={[
                      "Happy",
                      "Neutral",
                      "Sad",
                      "Disgust",
                      "Anger",
                      "Fear",
                      "Surprise",
                    ]}
                    data={[10, 20, 30, 40, 50, 60, 70]}
                  />
                </div>
              </div>
              <div className="w-full flex justify-center pl-[6%]">
                <div className="w-[300px]">
                  <RadarGraph
                    labels={[
                      "Engaged",
                      "Looking Away",
                      "Bored",
                      "Confused",
                      "Frustrated",
                      "Drowsy",
                    ]}
                    data={[10, 20, 30, 40, 50, 60]}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="flex justify-center">
              <div className="w-[70%] flex flex-col py-8">
                <h2 className="text-title-medium mb-2 text-center">
                  Emotion Score
                </h2>
                <LineGraph
                  labels={[
                    "Happy",
                    "Neutral",
                    "Sad",
                    "Disgust",
                    "Anger",
                    "Fear",
                    "Surprise",
                  ]}
                  data={[10, 20, 30, 40, 50, 60, 70]}
                />
                <h2 className="text-title-medium mb-2 text-center mt-12">
                  Engagement Score
                </h2>
                <LineGraph
                  labels={[
                    "Happy",
                    "Neutral",
                    "Sad",
                    "Disgust",
                    "Anger",
                    "Fear",
                    "Surprise",
                  ]}
                  data={[10, 20, 30, 40, 50, 60, 70]}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
