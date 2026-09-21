import { defineField, defineType } from "sanity";

/**
 * "project" document schema — mirrors the `Project` type in lib/types.ts
 * field-for-field. Keep these two in sync any time either one changes.
 */
export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "URL-friendly identifier, e.g. \"skyline-corporate-tower\".",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Residential", value: "Residential" },
          { title: "Commercial", value: "Commercial" },
          { title: "Renovation", value: "Renovation" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      description: "City / region, e.g. \"Bengaluru, India\".",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      description: "Typically the completion year — used for the year filter on the portfolio page.",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "clientTestimonial",
      title: "Client Testimonial",
      description: "Optional quote from the client, shown on the project detail page.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "testimonialVideoUrl",
      title: "Testimonial Video (YouTube URL)",
      description: "Optional YouTube link for a video version of the client testimonial.",
      type: "url",
    }),
    defineField({
      name: "videoUrl",
      title: "Project Showcase Video (YouTube URL)",
      description: "Optional YouTube link (walkthrough, drone footage, etc) shown on the project detail page.",
      type: "url",
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "completionDate",
      title: "Completion Date",
      description: "For \"Ongoing\" projects, use the expected/target completion date.",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      description: "Primary hero/cover image, shown on cards and the project detail hero.",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      description: "Additional photos shown in the project detail page gallery + lightbox.",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "beforeImage",
      title: "Before Image",
      description: "\"Before\" photo used in the before/after comparison slider.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "afterImage",
      title: "After Image",
      description: "\"After\" photo used in the before/after comparison slider.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "sizeSqft",
      title: "Size (sq ft)",
      description: "Built-up area in square feet, if available.",
      type: "number",
    }),
    defineField({
      name: "value",
      title: "Contract Value",
      description: "Display-ready string, e.g. \"₹42 Cr\".",
      type: "string",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Completed", value: "Completed" },
          { title: "Ongoing", value: "Ongoing" },
        ],
        layout: "radio",
      },
      initialValue: "Completed",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "progressPercent",
      title: "Progress %",
      description: "Only meaningful when Status is \"Ongoing\". 0-100.",
      type: "number",
      validation: (rule) => rule.min(0).max(100),
      hidden: ({ document }) => document?.status !== "Ongoing",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "location",
      media: "coverImage",
    },
  },
});
