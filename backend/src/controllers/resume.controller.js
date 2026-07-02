import fs from "fs";
import mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

export const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }

        let resumeText = "";

        if (req.file.mimetype === "application/pdf") {
            const data = new Uint8Array(fs.readFileSync(req.file.path));

            const pdf = await pdfjsLib.getDocument({
                data,
            }).promise;

            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                const page = await pdf.getPage(pageNum);
                const content = await page.getTextContent();

                resumeText += content.items.map((item) => item.str).join(" ") + "\n";
            }
        } else if (
            req.file.mimetype ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
            const result = await mammoth.extractRawText({
                path: req.file.path,
            });

            resumeText = result.value;
        }

        if (!resumeText.trim()) {
            return res.status(400).json({
                success: false,
                message: "Could not extract text from resume",
            });
        }

        res.status(200).json({
            success: true,
            resumeText,
        });
    } catch (error) {
        console.error("Resume Upload Error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};