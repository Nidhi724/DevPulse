const validateProfile = (req, res, next) => {

    const {

        githubUsername,
        linkedinUsername,
        leetcodeUsername,
        codeforcesUsername,
        codechefUsername

    } = req.body;

    if (
        !githubUsername &&
        !linkedinUsername &&
        !leetcodeUsername &&
        !codeforcesUsername &&
        !codechefUsername
    ) {

        return res.status(400).json({

            success: false,

            message: "At least one profile field is required"

        });

    }

    next();

};

export default validateProfile;