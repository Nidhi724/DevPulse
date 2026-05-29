export const getContests = async (req, res) => {

    try {

        // CODEFORCES CONTESTS

        const codeforcesResponse = await fetch(
            "https://codeforces.com/api/contest.list"
        );

        const codeforcesData = await codeforcesResponse.json();

        const upcomingCF = codeforcesData.result
            .filter(contest => contest.phase === "BEFORE")
            .slice(0, 5)
            .map(contest => ({

                platform: "Codeforces",

                name: contest.name,

                startTime: new Date(
                    contest.startTimeSeconds * 1000
                ),

                duration: `${contest.durationSeconds / 3600} hours`

            }));


        // LEETCODE CONTESTS

        const leetcodeContests = [

            {

                platform: "LeetCode",

                name: "Weekly Contest",

                startTime: "Every Sunday",

                duration: "1.5 hours"

            },

            {

                platform: "LeetCode",

                name: "Biweekly Contest",

                startTime: "Every 2 Weeks",

                duration: "1.5 hours"

            }

        ];


        // FINAL RESPONSE

        res.status(200).json({

            success: true,

            contests: [

                ...upcomingCF,

                ...leetcodeContests

            ]

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};