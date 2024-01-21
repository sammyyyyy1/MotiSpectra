import Button from "@/components/Button";
import LineGraph from "@/components/LineGraph";
import RadarGraph from "@/components/RadarGraph";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Page() {
  const videoRef = useRef<any>(null);
  const [stream, setStream] = useState<null | MediaStream>(null);
  const [graphTab, setGraphTab] = useState<"radar" | "avg">("radar");
  const [boxes, setBoxes] = useState<[[number, number], [number, number]][]>([]);
  const [analysisData, setAnalysisData] = useState<
    {
      emotion: {
        angry: number;
        disgust: number;
        fear: number;
        happy: number;
        neutral: number;
        sad: number;
        surprise: number;
      };
      engagement: {
        bored: number;
        confused: number;
        drowsy: number;
        frustrated: number;
        interested: number;
        looking_away: number;
      };
    }[]
  >([]);
  console.log(analysisData);

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
      setBoxes([]);
    }
  }
  function takeScreenshot() {
    const canvas = document.createElement("canvas");
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    canvas.getContext("2d")?.drawImage(video, 0, 0);
    return canvas.toDataURL("image/jpeg");
  }
  function addAnalysisData(emotion: Object, engagement: Object) {
    const data = [...analysisData, { emotion, engagement }] as any;
    analysisData.push({ emotion, engagement } as any);
    if (data.length > 16) data.shift();
    setAnalysisData(data);
  }
  function movingAverage(arr: number[], windowSize = 4) {
    return arr.map((_, i, arr) => {
      if (i < windowSize) {
        return 0;
      }
      const window = arr.slice(i - windowSize, i);
      const average = window.reduce((a, b) => a + b, 0) / windowSize;
      return average;
    });
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => closeStream(), []);
  useEffect(() => {
    async function updateLoop() {
      // wait a bit before starting
      await new Promise((resolve) => setTimeout(resolve, 250));

      while (stream && videoRef.current) {
        try {
          const image = takeScreenshot();
          if (image === "data:,") continue;
          const res = await fetch("http://127.0.0.1:5000/process-image", {
            method: "POST",
            body: JSON.stringify({
              image: image,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await res.json();
          console.log(data)
          setBoxes(data.boxes);
        } catch (error) {
          console.error("Error looping through capture:", error);
        }
      }
    }

    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      stream.getTracks().forEach((track) => {
        track.onended = () => {
          console.log("The screen capture was closed");
          setStream(null);
          setBoxes([]);
        };
      });
      updateLoop();
    }
  }, [stream]);

  const emotionAverage = movingAverage(
    analysisData.map((item) =>
      Math.min(
        100,
        Math.max(
          0,
          item.emotion.angry * -50 +
            item.emotion.disgust * -10 +
            item.emotion.fear * -20 +
            item.emotion.happy * 100 +
            item.emotion.neutral * 10 +
            item.emotion.sad * -10 +
            item.emotion.surprise * 40,
        ),
      ),
    ),
  );
  const engagementAverage = movingAverage(
    analysisData.map((item) =>
      Math.min(
        100,
        Math.max(
          0,
          item.engagement.bored * -50 +
            item.engagement.confused * -10 +
            item.engagement.drowsy * -20 +
            item.engagement.frustrated * -70 +
            item.engagement.interested * 150 +
            item.engagement.looking_away * -10,
        ),
      ),
    ),
  );

  return (
    <div className="h-dvh flex p-4 gap-4">
      <div className="flex flex-col flex-[65] gap-4">
        <div
          className={`w-full ${stream ? "max-h-[100dvh_-_76px]" : "h-[80%]"} rounded-xl outline outline-on-surface 
                     flex justify-center items-center relative`}
        >
          {stream ? (
            <div className="relative rounded-xl">
              <video
                ref={videoRef}
                className="object-fill"
                autoPlay
                playsInline
                muted
                style={{ maxWidth: "100%" }}
              />
              {boxes.map((box, i) => (
                <div
                  style={{
                    left: `${box[0][0] * 100}%`,
                    top: `${box[0][1] * 100}%`,
                    position: "absolute",
                    width: `${box[1][0] * 100}%`,
                    height: `${box[1][1] * 100}%`,
                    outlineWidth: "3px",
                    outlineColor: "#0F0",
                    outlineStyle: "solid",
                  }}
                  key={i}
                />
              ))}
            </div>
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
          <Button onClick={startStream} disabled={!!stream} className="font-mono font-bold">
            Start Screensharing
          </Button>
          <Button onClick={closeStream} disabled={!stream} className="bg-error font-mono font-bold">
            Stop Screensharing
          </Button>
          <Button
            onClick={() => {
              const emotion = {
                angry: Math.random(),
                disgust: Math.random(),
                fear: Math.random(),
                happy: Math.random(),
                neutral: Math.random(),
                sad: Math.random(),
                surprise: Math.random(),
              };
              const engagement = {
                bored: Math.random(),
                confused: Math.random(),
                drowsy: Math.random(),
                frustrated: Math.random(),
                interested: Math.random(),
                looking_away: Math.random(),
              };
              addAnalysisData(emotion, engagement);
            }}
          >
            Add Random Data
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
                    labels={["Happy", "Neutral", "Sad", "Disgust", "Anger", "Fear", "Surprise"]}
                    data={[
                      analysisData[analysisData.length - 1]?.emotion.happy * 100 ?? 0,
                      analysisData[analysisData.length - 1]?.emotion.neutral * 100 ?? 0,
                      analysisData[analysisData.length - 1]?.emotion.sad * 100 ?? 0,
                      analysisData[analysisData.length - 1]?.emotion.disgust * 100 ?? 0,
                      analysisData[analysisData.length - 1]?.emotion.angry * 100 ?? 0,
                      analysisData[analysisData.length - 1]?.emotion.fear * 100 ?? 0,
                      analysisData[analysisData.length - 1]?.emotion.surprise * 100 ?? 0,
                    ]}
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
                    data={[
                      analysisData[analysisData.length - 1]?.engagement.interested * 100 ?? 0,
                      analysisData[analysisData.length - 1]?.engagement.looking_away * 100 ?? 0,
                      analysisData[analysisData.length - 1]?.engagement.bored * 100 ?? 0,
                      analysisData[analysisData.length - 1]?.engagement.confused * 100 ?? 0,
                      analysisData[analysisData.length - 1]?.engagement.frustrated * 100 ?? 0,
                      analysisData[analysisData.length - 1]?.engagement.drowsy * 100 ?? 0,
                    ]}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="flex justify-center">
              <div className="w-[70%] flex flex-col py-8">
                <h2 className="text-title-medium mb-2 text-center">Emotion Score</h2>
                <LineGraph
                  labels={emotionAverage.slice(-12).map((item) => `${item}`)}
                  data={emotionAverage.slice(-12)}
                />
                <h2 className="text-title-medium mb-2 text-center mt-12">Engagement Score</h2>
                <LineGraph
                  labels={engagementAverage.slice(-12).map((item) => `${item}`)}
                  data={engagementAverage.slice(-12)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
