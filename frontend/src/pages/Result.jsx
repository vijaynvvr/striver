import React, { useEffect, useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import axios from "axios";

const Result = () => {
	const [code, setCode] = useState([]);
	useEffect(() => {
        const fetchCodeData = async () => {
            const {data} = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/code-submissions`);
            setCode(data);
        }
        fetchCodeData();
    }, []);
	return (
		<div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px] text-base">Username</TableHead>
						<TableHead className="w-[100px] text-base">Language</TableHead>
						<TableHead className="w-[100px] text-base">STDIN</TableHead>
						<TableHead className="w-[300px] text-base">Code</TableHead>
						<TableHead className="w-[100px] text-base">STDOUT</TableHead>
						<TableHead className="w-[100px] text-base">Timestamp</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{code.map((codeData) => {
						return (
							<TableRow key={codeData.id}>
								<TableCell>{codeData.username}</TableCell>
								<TableCell>{codeData.language}</TableCell>
								<TableCell>
									{codeData.stdin ? codeData.stdin : "-"}
								</TableCell>
								<TableCell>
									<pre>
										{codeData.code.length > 100
											? `${codeData.code.slice(0, 100)}...`
											: codeData.code}
									</pre>
								</TableCell>
                                <TableCell>
                                    <pre>
									    {codeData.stdout}
									</pre>
                                </TableCell>
								<TableCell>{new Date(codeData.timestamp).toLocaleString()}</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</div>
	);
};

export default Result;
