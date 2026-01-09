import User from '../models/User.js';
import { parseUSN } from '../utils/usnParser.js';

export const handleUserOnboarding = async (userId, usn) => {
    const { branch, year } = parseUSN(usn);

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { 
            usn, 
            branch, 
            currentYear: year 
        },
        { new: true }
    );

    return updatedUser;
};