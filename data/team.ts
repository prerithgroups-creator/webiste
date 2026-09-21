/**
 * Mock team member data — stands in for Sanity CMS content until real team
 * members are published in Sanity Studio. See data/projects.ts for the
 * same mock/CMS-fallback pattern.
 */

import type { TeamMember } from "@/lib/types";

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Arun Prerith",
    role: "Founder & Managing Director",
    experience: "22 years",
  },
  {
    id: "2",
    name: "Divya Menon",
    role: "Head of Architecture",
    experience: "16 years",
  },
  {
    id: "3",
    name: "Karthik Iyer",
    role: "Chief Structural Engineer",
    experience: "18 years",
  },
  {
    id: "4",
    name: "Priya Raman",
    role: "Head of Project Management",
    experience: "14 years",
  },
];

// TODO(CMS): replace with `await client.fetch(groqQuery)` once team members are added in Sanity.
export function getTeamMembers(): TeamMember[] {
  return teamMembers;
}
