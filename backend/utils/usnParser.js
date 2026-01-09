/**
 * Parses USN to extract Branch and current Year of Study.
 * @param {string} usn - Format: 1RV24CI092
 * @returns {object} { branch: string, year: number }
 */

 export const parseUSN = (usn) => {
    if (!usn || usn.length !== 10) {
        return { branch: "Unknown", year: 0 };
    }

    const branchCode = usn.substring(5, 7).toUpperCase();
    const validBranches = [
        "CS", "CD", "CY", "AI", "CI", "EC", "EE", 
        "EI", "IS", "ET", "ME", "CV", "CH", "BT", "IM", "AS"
    ];
    const branch = validBranches.includes(branchCode) ? branchCode : "Unknown";

    const admissionYear = parseInt(usn.substring(3, 5), 10);

    const now = new Date();
    const currentFullYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;

    const academicYearHead = currentMonth >= 9 ? currentFullYear : currentFullYear - 1;
    const yearOfStudy = (academicYearHead - admissionYear) + 1;

    const validatedYear = (yearOfStudy > 0 && yearOfStudy <= 4) ? yearOfStudy : 0;

    return {
        branch,
        year: validatedYear
    };
};