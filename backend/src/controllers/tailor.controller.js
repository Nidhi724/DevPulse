export const tailorResume = async (req, res) => {

    try {

        const { resumeText, jobDescription } = req.body;

        if (!resumeText || !jobDescription) {

            return res.status(400).json({

                success: false,
                message: "Resume text and Job Description are required"

            });

        }

        // CLEAN & SPLIT TEXT

        const resumeWords = resumeText
            .toLowerCase()
            .split(" ");

        const jdWords = jobDescription
            .toLowerCase()
            .split(" ");

        // FIND MISSING SKILLS

        const missingSkills = jdWords.filter(
            word => !resumeWords.includes(word)
        );

        // CREATE TAILORED SUMMARY

        const tailoredSummary = `Results-driven software developer experienced in ${jdWords
            .slice(0, 8)
            .join(", ")} with strong problem-solving abilities and modern software development practices. Skilled in building scalable applications and optimizing performance for real-world systems.`;

        // AI-STYLE PROJECT SUGGESTIONS

        const projectSuggestions = [

            "Build scalable full-stack applications",
            "Add cloud deployment projects",
            "Include ATS-friendly keywords",
            "Highlight measurable achievements"

        ];

        res.status(200).json({

            success: true,

            tailoredSummary,

            missingSkills: [...new Set(missingSkills)].slice(0, 10),

            projectSuggestions

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};