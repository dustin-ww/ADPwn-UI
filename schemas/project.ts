import { object, string, type InferType } from "yup";

// ~/schemas/project.ts
export const ProjectUpdateSchema = object({
    name: string().optional(),
    description: string().optional()
  })

export type ProjectUpdate = InferType<typeof ProjectUpdateSchema>;