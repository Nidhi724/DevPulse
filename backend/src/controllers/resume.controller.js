import fs from "fs";

export const uploadResume = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });

        }

        const fileData = fs.readFileSync(req.file.path, "utf8");

        res.status(200).json({

            success: true,

            message: "Resume uploaded successfully",

            file: req.file.filename

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};