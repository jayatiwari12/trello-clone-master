import { BoardLog } from "@/models";
import connectDB from "../lib/connectDB";

export default async function handler(req, res) {
    try {
        await connectDB()
        const parsed = JSON.parse(req.body);
        const boardData = parsed.boardData;

        // Check if there's an existing document
        let existingBoardLog = await BoardLog.findOne();

        if (existingBoardLog) {
            // If a document exists, update it with the new data
            existingBoardLog.history.push({
                logs: boardData.data,
                changedData: boardData.changedData,
                time: boardData.time
            });
            await existingBoardLog.save();
            res.status(200).send(existingBoardLog);
        } else {
            // If no document exists, create a new one
            const newBoardLog = new BoardLog({
                history: [{
                    logs: boardData.data,
                    changedData: boardData.changedData,
                    time: boardData.time
                }]
            });
            await newBoardLog.save();
            res.status(201).send(newBoardLog);
        }
    }
    catch (err) {
        return res.send(err)
    }
}