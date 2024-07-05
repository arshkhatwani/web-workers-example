import { useState, useEffect } from "react";
import "./App.css";
import heavyFunc from "./heavyFunc";

function App() {
    const [worker, setWorker] = useState<Worker>();
    const [btn1Result, setBtn1Result] = useState<string>("");
    const [btn2Result, setBtn2Result] = useState<string>();

    const btn1OnClick = () => {
        heavyFunc();
        setBtn1Result("CLICKED !!!!");
    };

    useEffect(() => {
        const myWorker = new Worker(new URL("./worker.ts", import.meta.url), {
            type: "module",
        });

        myWorker.onmessage = function (event) {
            console.log("Received messsage from worker", event.data);
            if (event.data === "Done") {
                setBtn1Result("CLICKED !!!!");
            }
        };

        setWorker(myWorker);

        return () => {
            myWorker.terminate();
        };
    }, []);

    return (
        <div>
            <div className="flex flex-row gap-10">
                <button
                    className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                        worker?.postMessage("something");
                        // btn1OnClick();
                    }}>
                    Click me <br />
                    (I will take some time)
                </button>

                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                        setBtn2Result("CLICKED !!!!");
                    }}>
                    Click me <br />
                    (I will be fast)
                </button>
            </div>

            <div className="mt-10 flex flex-col gap-4">
                <p className="text-3xl font-bold underline">
                    Button 1 result:{" "}
                    <span className="text-sky-500">{btn1Result}</span>
                </p>
                <p className="text-3xl font-bold underline">
                    Button 2 result:{" "}
                    <span className="text-red-500">{btn2Result}</span>
                </p>
            </div>
        </div>
    );
}

export default App;
