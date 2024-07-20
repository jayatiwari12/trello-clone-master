import mongoose from "mongoose";

const boardLogSchema = new mongoose.Schema({
    history: [{
        logs: [{
            cardName: { type: String, },
            items: [{ title: { type: String } }]
        }],
        time: { type: String },
        changedData: { type: String }
    }]
});

export const BoardLog = mongoose.models.BoardLog || mongoose.model('BoardLog', boardLogSchema);