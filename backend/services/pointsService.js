import mongoose from 'mongoose';
import User from '../models/User.js';

export const syncUserPoints = async (userId) => {
    try {
        const stats = await User.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(userId) } },
            {
                $lookup: {
                    from: 'activities', 
                    localField: 'activities',
                    foreignField: '_id',
                    as: 'activityDetails'
                }
            },
            { $unwind: { path: "$activityDetails", preserveNullAndEmptyArrays: true } },
            {
                $group: {
                    _id: "$_id",
                    confirmedTotal: {
                        $sum: { $cond: [{ $eq: ["$activityDetails.status", "confirmed"] }, "$activityDetails.points", 0] }
                    },
                    pendingTotal: {
                        $sum: { $cond: [{ $eq: ["$activityDetails.status", "pending"] }, "$activityDetails.points", 0] }
                    }
                }
            }
        ]);

        if (stats.length > 0) {
            await User.findByIdAndUpdate(userId, {
                confirmedPoints: stats[0].confirmedTotal,
                pendingPoints: stats[0].pendingTotal
            });
        } else {
            await User.findByIdAndUpdate(userId, { confirmedPoints: 0, pendingPoints: 0 });
        }
    } catch (error) {
        console.error("Aggregation Error:", error);
    }
};