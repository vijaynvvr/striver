import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Shad from "./pages/Shad";
import Code from "./pages/Code";
import Result from "./pages/Result";
import { Button } from "./components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { ModeToggle } from "@/components/ui/mode-toggle";

const App = () => {
    const navigate = useNavigate();
	return (
        <div className="flex flex-col items-center">
            <div className="h-14 w-full sticky top-0 shadow-xl border-2 bg-gray-50 z-50">
                <ul className="h-full flex items-center justify-around">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline" onClick={() => navigate("/")}>Code</Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Click here to submit your code</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <ModeToggle />
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                            <Button variant="outline" onClick={() => navigate("/result")}>Result</Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Click here to view your code result</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </ul>
            </div>
            <Routes>
                <Route path="/shad" element={<Shad />}/>
                <Route path="/" element={<Code />}/>
                <Route path="/result" element={<Result />}/>
            </Routes>
        </div>
	);
};

export default App;
