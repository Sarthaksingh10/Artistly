import OnboardForm from "../_Components/OnboardForm";

export const metadata = {
  title: "onboard_form",
  description: "List yourself and be visible to the world",
};

/* Onboard form to submit artists registration */
export default function OnboardFormPage() {
  return (
    <div className="flex justify-center px-4 py-8">
      <OnboardForm />
    </div>
  );
}
