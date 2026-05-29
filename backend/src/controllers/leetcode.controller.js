export const getLeetCodeProfile = async (req, res) => {

    try {

        const { username } = req.params;

        const response = await fetch(
            `https://leetcode-api-faisalshohag.vercel.app/${username}`
        );

        const data = await response.json();

        res.status(200).json({

            success: true,

            profile: {

                username,

                totalSolved: data.totalSolved,

                easySolved: data.easySolved,

                mediumSolved: data.mediumSolved,

                hardSolved: data.hardSolved,

                ranking: data.ranking,

                contributionPoints: data.contributionPoint,

                reputation: data.reputation

            }

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};