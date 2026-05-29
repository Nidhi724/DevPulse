export const analyzeResume = async (req, res) => {

    try {

        const { resumeText, jobDescription } = req.body;

        if (!resumeText || !jobDescription) {

            return res.status(400).json({

                success: false,
                message: "Resume text and Job Description are required"

            });

        }

        // SIMPLE ATS ANALYSIS

        const resumeWords = resumeText
            .toLowerCase()
            .split(" ");

        const jdWords = jobDescription
            .toLowerCase()
            .split(" ");

        // MATCHED WORDS

        const matchedSkills = jdWords.filter(word =>
            resumeWords.includes(word)
        );

        const uniqueMatched = [...new Set(matchedSkills)];

        // ATS SCORE

        const score = Math.min(

            100,

            Math.floor(
                (uniqueMatched.length / jdWords.length) * 100
            )

        );

        // MISSING SKILLS

        const missingSkills = jdWords.filter(
            word => !resumeWords.includes(word)
        );

        res.status(200).json({

            success: true,

            atsScore: score,

            matchedSkills: uniqueMatched,

            missingSkills: [...new Set(missingSkills)].slice(0, 10),

            suggestions: [

                "Add more relevant skills",
                "Use more JD keywords",
                "Improve project descriptions",
                "Add measurable achievements"

            ]

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};