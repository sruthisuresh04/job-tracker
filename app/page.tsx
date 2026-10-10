"use client";

import { useState, useEffect } from "react";
import { Job, JobStatus } from "../types";

const statuses: JobStatus[] = ["Applied", "Interview", "Offer", "Rejected"];

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: 1,
      company: "Goaco",
      role: "Junior Web Developer",
      status: "Applied",
      date: "2026-10-10",
    },
    {
      id: 2,
      company: "Deecke Holding",
      role: "Junior Web Developer",
      status: "Applied",
      date: "2026-10-10",
    },
    {
      id: 3,
      company: "Stellar Industries",
      role: "React Developer",
      status: "Applied",
      date: "2026-10-10",
    },
  ]);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<JobStatus>("Applied");

  const [loaded, setLoaded] = useState(false);
  const [filter, setFilter] = useState<JobStatus | "All">("All");

  useEffect(() => {
    const saved = localStorage.getItem("jobs");
    if (saved) setJobs(JSON.parse(saved));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs, loaded]);

  function addJob(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!company.trim() || !role.trim()) return;
    const newJob: Job = {
      id: Date.now(),
      company: company.trim(),
      role: role.trim(),
      status,
      date: new Date().toISOString().slice(0, 10),
    };
    setJobs([...jobs, newJob]);
    setCompany("");
    setRole("");
    setStatus("Applied");
  }

  function deleteJob(id: number) {
    setJobs(jobs.filter((job) => job.id !== id));
  }

  const visibleJobs =
    filter === "All" ? jobs : jobs.filter((job) => job.status === filter);

  return (
    <main className="mx-auto max-w-xl p-8">
      <h1 className="mb-4 text-2xl font-bold">Job Tracker</h1>

      <form onSubmit={addJob} className="mb-6 space-y-2">
        <input
          className="w-full rounded border p-2"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <input
          className="w-full rounded border p-2"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <select
          className="w-full rounded border p-2"
          value={status}
          onChange={(e) => setStatus(e.target.value as JobStatus)}
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button className="rounded bg-black px-4 py-2 text-white" type="submit">
          Add job
        </button>
      </form>

      <div className="mb-3 flex flex-wrap gap-2">
        {(["All", ...statuses] as (JobStatus | "All")[]).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded border px-3 py-1 text-sm ${
              filter === s ? "bg-black text-white" : ""
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <ul className="space-y-2">
        {visibleJobs.map((job) => (
          <li
            key={job.id}
            className="flex items-center justify-between rounded border p-3"
          >
            <span>
              <strong>{job.company}</strong> – {job.role} ({job.status},{" "}
              {job.date})
            </span>
            <button
              onClick={() => deleteJob(job.id)}
              className="text-sm text-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
