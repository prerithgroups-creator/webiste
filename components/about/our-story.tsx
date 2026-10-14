"use client";

import { motion, type Variants } from "framer-motion";
import { Container } from "@/components/ui/container";

const VISION_ITEMS = [
  "Quality construction",
  "Professional project management",
  "Timely completion",
  "Transparent communication",
  "Value for money",
  "Quality interiors and finishing",
  "Customer-focused service",
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const HEADLINE_WORDS = "Built on Experience. Driven by Quality. Trusted by Customers.".split(
  " "
);

export function OurStory() {
  return (
    <section className="relative overflow-hidden bg-secondary px-6 py-20 sm:py-28">
      {/* ambient glow blobs for a "mindblowing" backdrop without distracting from text */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-accent/20 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/3 size-96 rounded-full bg-primary/15 blur-3xl"
        animate={{ x: [0, -30, 0], y: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <Container className="relative">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold uppercase tracking-wider text-accent"
        >
          Our Story
        </motion.p>

        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="mt-4 max-w-5xl font-heading text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
        >
          {HEADLINE_WORDS.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              variants={fadeUp}
              className="mr-4 inline-block"
            >
              {word}
            </motion.span>
          ))}
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="mt-12 max-w-3xl space-y-6 text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          <motion.p variants={fadeUp}>
            My journey in the construction industry began with RNS
            Infrastructure Ltd., where I started my career working on
            infrastructure projects. Those early years gave me a strong
            foundation in construction, project execution, and the
            importance of delivering work with responsibility and
            discipline.
          </motion.p>
          <motion.p variants={fadeUp}>
            Around 2012, I took the next step in my career by joining Sobha
            Ltd., one of India&apos;s leading real estate companies. Over
            the next 12+ years, I had the opportunity to be associated with
            and contribute to several prestigious projects, including Sobha
            City, Sobha Dream Acres, 1 Sobha Mall, Metercube, and other
            major developments.
          </motion.p>
          <motion.p variants={fadeUp}>
            My years at Sobha were more than just a career — they were a
            learning journey. I gained valuable experience in quality
            management, project execution, planning, coordination, customer
            expectations, and timely delivery. Working alongside
            experienced professionals and building a network of industry
            contacts helped me understand what it truly takes to build
            projects that stand the test of time.
          </motion.p>

          <motion.h3
            variants={fadeUp}
            className="pt-4 font-heading text-2xl font-semibold text-foreground sm:text-3xl"
          >
            From Experience to Entrepreneurship
          </motion.h3>
          <motion.p variants={fadeUp}>
            After more than a decade of learning and experience, I decided
            to take the next step and build something of my own. That
            vision led to Prerith Groups — Construction &amp; Interiors.
          </motion.p>
          <motion.p variants={fadeUp}>
            We started with a simple philosophy: bring professional
            construction standards, quality workmanship, transparency, and
            timely execution to every project, regardless of its size.
            Since our beginning, we have successfully completed residential
            and commercial projects, earning the trust and satisfaction of
            our customers through our commitment to quality and attention
            to detail.
          </motion.p>
          <motion.p variants={fadeUp}>
            For us, construction is not just about building walls and
            structures. It is about understanding a customer&apos;s vision,
            converting that vision into reality, and creating spaces that
            people can be proud of.
          </motion.p>

          <motion.h3
            variants={fadeUp}
            className="pt-4 font-heading text-2xl font-semibold text-foreground sm:text-3xl"
          >
            Our Vision
          </motion.h3>
          <motion.p variants={fadeUp}>
            Our vision is to take Prerith Groups to the next level and make
            professional construction and interior solutions accessible to
            more people. With our experience in the industry and the
            lessons learned over the years, our goal is to deliver:
          </motion.p>

          <motion.ul
            variants={stagger}
            className="grid list-none grid-cols-1 gap-3 sm:grid-cols-2"
          >
            {VISION_ITEMS.map((item) => (
              <motion.li
                key={item}
                variants={fadeUp}
                whileHover={{ x: 6 }}
                className="flex items-start gap-3 text-base sm:text-lg"
              >
                <span className="mt-2.5 size-2 shrink-0 rounded-full bg-accent" />
                <span>{item}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.p variants={fadeUp}>
            We believe that good construction does not always have to come
            at an unreasonable cost. Our aim is to find the right balance
            between quality, durability, aesthetics, and value.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.01 }}
          className="mt-14 rounded-2xl bg-white p-8 shadow-lg ring-1 ring-border sm:p-12"
        >
          <h3 className="font-heading text-2xl font-semibold text-foreground sm:text-4xl">
            Building Your Vision. Delivering With Confidence.
          </h3>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Every project we take up is an opportunity to earn a long-term
            relationship with our customer. At Prerith Groups Construction
            &amp; Interiors, we bring together years of industry
            experience, professional standards, and a personal commitment
            to every project we undertake.
          </p>
          <p className="mt-6 font-heading text-xl font-semibold text-primary sm:text-2xl">
            Your vision inspires us. Our experience brings it to life.
            Quality is what we stand for.
          </p>
          <p className="mt-4 text-sm font-medium text-muted-foreground">
            — Prashanth Shetty, Founder
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
