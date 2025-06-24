"use client";
import Button from "./Button";
import CheckboxDropdown from "./DropdownCheckbox";
import { useForm } from "react-hook-form";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

/* onboarding form for new artist to register on the platform handling via react-hook-form */
export default function OnboardForm() {
  const Category = [
    "Singer",
    "Dancer",
    "Guitarist",
    "Painter",
    "Magician",
    "Other",
  ];
  const Languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Italian",
    "Mandarin",
    "Hindi",
    "Other",
  ];

  /* register handles data, handlesubmit validates on submit, errors help displaying error messages,contro to pass to useWatch */
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const navigate = useRouter();

  /* Handling submit if successfully created navigation back to home page */
  const onsubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:3001/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success("Submission successful!");
        navigate.push("/");
      } else {
        toast.error("Failed to submit.");
      }
    } catch (err) {
      console.error("Error submitting data:", err);
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onsubmit)}
        className="w-full max-w-2xl bg-zinc-900 p-6 rounded-xl shadow-md flex flex-col gap-6"
      >
        {/* Name & Location */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col w-full">
            <label htmlFor="name" className="text-zinc-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g Vinicius Junior"
              className="bg-zinc-800 text-white px-4 py-2 rounded border border-zinc-700"
              {...register("name", {
                required: {
                  value: true,
                  message: "Please enter your full name",
                },
              })}
            />
            <p className="text-red-500 text-sm">{errors.fullname?.message}</p>
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="location" className="text-zinc-300 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              placeholder="e.g New York"
              className="bg-zinc-800 text-white px-4 py-2 rounded border border-zinc-700"
              {...register("location", {
                required: {
                  value: true,
                  message: "Please enter your location",
                },
              })}
            />
            <p className="text-red-500 text-sm">{errors.location?.message}</p>
          </div>
        </div>

        {/* Category */}
        <CheckboxDropdown
          label={"category"}
          options={Category}
          errors={errors.category}
          name={"category"}
          register={register}
          control={control}
        />

        {/* Languages */}
        <CheckboxDropdown
          label={"language"}
          options={Languages}
          errors={errors.language}
          name={"language"}
          register={register}
          control={control}
        />

        {/* Price Range & Profile */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col w-full">
            <label htmlFor="pricerange" className="text-zinc-300 mb-1">
              Price Range
            </label>
            <select
              className="bg-zinc-800 text-white px-4 py-2 rounded border border-zinc-700"
              {...register("pricerange", {
                required: {
                  value: true,
                  message: "Please select a price range",
                },
              })}
            >
              <option value="">Select...</option>
              <option value="₹5000–₹10,000">₹5000–₹10,000</option>
              <option value="₹10,000–₹25,000">₹10,000–₹25,000</option>
              <option value="₹25,000–₹50,000">₹25,000–₹50,000</option>
              <option value="₹50,000–above">₹50,000-above</option>
            </select>
            <p className="text-red-500 text-sm">{errors.pricerange?.message}</p>
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="avatar" className="text-zinc-300 mb-1">
              Profile Upload
            </label>
            <input
              type="file"
              className="bg-zinc-800 text-white file:text-white file:bg-fuchsia-600 file:border-none file:rounded file:px-4 file:py-1"
              {...register("avatar")}
            />
          </div>
        </div>

        {/* Bio */}
        <div className="flex flex-col w-full">
          <label htmlFor="bio" className="text-zinc-300 mb-1">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            rows="4"
            className="w-full rounded-lg px-4 py-3 bg-zinc-900/80 border border-zinc-700 text-zinc-100 text-base font-medium focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
            placeholder="Describe your experience, style, and achievements..."
            {...register("bio", {
              required: {
                value: true,
                message: "Please write something about yourself",
              },
              minLength: {
                value: 15,
                message: "Bio must be at least 15 characters long",
              },
            })}
          />
          <p className="text-red-500 text-sm">{errors.bio?.message}</p>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <div className="w-[200px]">
            <Button>OnBoard as Artist</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
