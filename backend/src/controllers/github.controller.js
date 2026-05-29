export const getGithubProfile = async (req, res) => {

    try {

        const { username } = req.params;

        // FETCH PROFILE

        const profileResponse = await fetch(
            `https://api.github.com/users/${username}`
        );

        const profileData = await profileResponse.json();

        // FETCH REPOSITORIES

        const reposResponse = await fetch(
            `https://api.github.com/users/${username}/repos`
        );

        const reposData = await reposResponse.json();

        // EXTRACT LANGUAGES

        const languages = [];

        reposData.forEach(repo => {

            if (repo.language) {

                languages.push(repo.language);

            }

        });

        const uniqueLanguages = [...new Set(languages)];

        // RESPONSE

        res.status(200).json({

            success: true,

            profile: {

                username: profileData.login,

                name: profileData.name,

                bio: profileData.bio,

                followers: profileData.followers,

                following: profileData.following,

                publicRepos: profileData.public_repos,

                profileUrl: profileData.html_url,

                avatar: profileData.avatar_url

            },

            topLanguages: uniqueLanguages,

            repositories: reposData.slice(0, 5).map(repo => ({

                name: repo.name,

                description: repo.description,

                stars: repo.stargazers_count,

                language: repo.language,

                repoUrl: repo.html_url

            }))

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};