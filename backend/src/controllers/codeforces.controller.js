export const getCodeforcesProfile = async (req, res) => {

    try {

        const { username } = req.params;

        const response = await fetch(
            `https://codeforces.com/api/user.info?handles=${username}`
        );

        const data = await response.json();

        if (data.status !== "OK") {

            return res.status(404).json({

                success: false,
                message: "Codeforces user not found"

            });

        }

        const user = data.result[0];

        res.status(200).json({

            success: true,

            profile: {

                handle: user.handle,

                rank: user.rank,

                maxRank: user.maxRank,

                rating: user.rating,

                maxRating: user.maxRating,

                contribution: user.contribution,

                friendOfCount: user.friendOfCount,

                avatar: user.avatar

            }

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};