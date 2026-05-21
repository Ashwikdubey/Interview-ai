const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GEN_API_KEY,
});

const interviewReportSchema = z.object({
  matchScore: z.number(),

  technicalQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string(),
    })
  ),

  behavioralQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string(),
    })
  ),

  skillGaps: z.array(
    z.object({
      skill: z.string(),
      severity: z.enum(["low", "medium", "high"]),
    })
  ),

  preparationPlan: z.array(
    z.object({
      day: z.number(),
      focus: z.string(),
      tasks: z.array(z.string()),
    })
  ),

  title: z.string(),
}).strict();

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = `
Generate an interview report.

IMPORTANT:
- Return ONLY valid raw JSON
- No markdown
- No explanation
- Follow the exact schema

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",

    contents: prompt,

    config: {
      responseMimeType: "application/json",

      responseSchema: {
        type: "object",

        properties: {
          matchScore: {
            type: "number",
          },

          technicalQuestions: {
            type: "array",
            items: {
              type: "object",
              properties: {
                question: { type: "string" },
                intention: { type: "string" },
                answer: { type: "string" },
              },
              required: ["question", "intention", "answer"],
            },
          },

          behavioralQuestions: {
            type: "array",
            items: {
              type: "object",
              properties: {
                question: { type: "string" },
                intention: { type: "string" },
                answer: { type: "string" },
              },
              required: ["question", "intention", "answer"],
            },
          },

          skillGaps: {
            type: "array",
            items: {
              type: "object",
              properties: {
                skill: { type: "string" },
                severity: {
                  type: "string",
                  enum: ["low", "medium", "high"],
                },
              },
              required: ["skill", "severity"],
            },
          },

          preparationPlan: {
            type: "array",
            items: {
              type: "object",
              properties: {
                day: { type: "number" },
                focus: { type: "string" },
                tasks: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
              },
              required: ["day", "focus", "tasks"],
            },
          },

          title: {
            type: "string",
          },
        },

        required: [
          "matchScore",
          "technicalQuestions",
          "behavioralQuestions",
          "skillGaps",
          "preparationPlan",
          "title",
        ],
      },
    },
  });

  try {
    const json = JSON.parse(response.text);

    // Validate using zod
    const validated = interviewReportSchema.parse(json);

    console.log(JSON.stringify(validated, null, 2));

    return validated;
  } catch (err) {
    console.error("Parsing/Validation Error:");
    console.error(response.text);
    console.error(err);
  }
}

module.exports = generateInterviewReport;