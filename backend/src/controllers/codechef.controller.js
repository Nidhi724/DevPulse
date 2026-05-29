export const getCodeChefProfile = async (req, res) => {

    try {

        const { username } = req.params;

        const response = await fetch(
            `https://codechef-api-eight.vercel.app/${username}`
        );

        const data = await response.json();

        res.status(200).json({

            success: true,

            profile: {

                username: data.username,

                name: data.name,

                country: data.countryName,

                stars: data.stars,

                rating: data.currentRating,

                highestRating: data.highestRating,

                globalRank: data.globalRank,

                countryRank: data.countryRank

            }

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};