import ContactClient from "./contact-client";
import { getProfile } from "@/lib/content";

export default function ContactPage() {
  const profile = getProfile();
  const endpoint = process.env.FORMSPREE_ENDPOINT ?? null;

  return <ContactClient email={profile.email} endpoint={endpoint} />;
}