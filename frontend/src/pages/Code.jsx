import React, { useState } from "react";
import CodeEditor from "@/components/ui/code-editor";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";

const Code = () => {
	const [username, setUsername] = useState("");
	const [language, setLanguage] = useState("c_cpp");
	const [code, setCode] = useState("");
	const [stdin, setStdin] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
        if (username.length && code.length) {
            const options = {
                method: "POST",
                url: `${import.meta.env.VITE_SERVER_URL}/api/code-submissions`,
                data: {
                    username,
                    language,
                    code,
                    stdin,
                },
            };
            const data = await axios.request(options);
            if (data.status === 201) {
                toast.success("Code Submitted");
                setUsername("");
                setLanguage("c_cpp");
                setCode("");
                setStdin("");
            }
        } else {
            toast.error("Please fill username and code")
        }
	};
	return (
		<form className="space-y-4 mt-2" onSubmit={handleSubmit}>
			<div className="space-y-2">
				<label>Username:</label>
				<Input
					type="text"
					placeholder="Enter your username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</div>
			<div className="space-y-2">
				<label>Language:</label>
				<Select
					value={language}
					onValueChange={(newLang) => setLanguage(newLang)}
				>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="Select a programming language" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectItem value="c_cpp">C++</SelectItem>
							<SelectItem value="java">Java</SelectItem>
							<SelectItem value="python">Python</SelectItem>
							<SelectItem value="javascript">
								JavaScript
							</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
			<div className="space-y-2">
				<label>Code:</label>
				<CodeEditor
					language={language}
					value={code}
					onChange={(newCode) => setCode(newCode)}
				/>
			</div>
			<div className="space-y-2">
				<label>STDIN:</label>
				<Input
					type="text"
					placeholder="Enter STDIN"
					value={stdin}
					onChange={(e) => setStdin(e.target.value)}
				/>
			</div>
			<Button>Submit</Button>
		</form>
	);
};

export default Code;
