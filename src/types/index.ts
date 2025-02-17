import { z } from "zod";

/** Auth & Users */
const authSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  current_password: z.string(),
  password: z.string(),
  password_confirm: z.string(),
});

type Auth = z.infer<typeof authSchema>;
export type UserLoginForm = Pick<Auth, "email" | "password">;
export type UserRegistrationForm = Pick<
  Auth,
  "name" | "email" | "password" | "password_confirm"
>;
export type RequestConfirmationCodeForm = Pick<Auth, "email">;
export type ForgotPasswordForm = Pick<Auth, "email">;
export type NewPasswordForm = Pick<Auth, "password" | "password_confirm">;
export type UpdateCurrentPasswordForm = Pick<
  Auth,
  "current_password" | "password" | "password_confirm"
>;
export type CheckedPassword = Pick<Auth, "password">;

/** Users */
export const userSchema = authSchema
  .pick({
    name: true,
    email: true,
  })
  .extend({
    _id: z.string(),
  });
export type User = z.infer<typeof userSchema>;
export type UserProfileForm = Pick<User, "name" | "email">;

/** Notes */
const noteSchema = z.object({
  _id: z.string(),
  content: z.string(),
  createdBy: userSchema,
  task: z.string(),
  createdAt: z.string(),
});

export type Note = z.infer<typeof noteSchema>;
export type NoteFormData = Pick<Note, "content">;

/** Tasks */
export const taskStatusSchema = z.enum([
  "pending",
  "onHold",
  "inProgress",
  "underReview",
  "completed",
]);
export type TaskStatus = z.infer<typeof taskStatusSchema>;

export const TaskSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  project: z.string(),
  status: taskStatusSchema,
  completedBy: z.array(
    z.object({
      _id: z.string(),
      user: userSchema,
      status: taskStatusSchema,
    })
  ),
  notes: z.array(
    noteSchema.extend({
      createdBy: userSchema,
    })
  ),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const taskProjectSchema = TaskSchema.pick({
  _id: true,
  name: true,
  description: true,
  status: true,
});

export type Task = z.infer<typeof TaskSchema>;
export type TaskFormData = Pick<Task, "name" | "description">;
export type TaskProject = z.infer<typeof taskProjectSchema>;

/** Projects */
export const ProjectSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
  manager: z.string(userSchema.pick({ _id: true })),
  tasks: z.array(taskProjectSchema),
  team: z.array(z.string(userSchema.pick({ _id: true }))),
});

export const dashboardProjectSchema = z.array(
  ProjectSchema.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true,
    manager: true,
  })
);

export const editProjectSchema = ProjectSchema.pick({
  projectName: true,
  clientName: true,
  description: true,
});

export type Project = z.infer<typeof ProjectSchema>;
export type ProjectFormData = Pick<
  Project,
  "clientName" | "projectName" | "description"
>;

/** Team */
const teamMemberSchema = userSchema
  .pick({
    name: true,
  })
  .extend({
    email: z.string(),
    _id: z.string(),
  });

export const teamMembersSchema = z.array(teamMemberSchema);

export type teamMember = z.infer<typeof teamMemberSchema>;
export type teamMemberForm = Pick<teamMember, "email">;
