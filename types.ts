export type JobStatus = "Applied" | "Interview" | "Offer" | "Rejected";

export type Job = {
  id: number;
  company: string;
  role: string;
  status: JobStatus;
  date: string;
};