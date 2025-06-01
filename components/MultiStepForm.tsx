import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Modal from "react-modal";
import Confetti from "react-confetti";
import { FaUser, FaAddressCard, FaCheck } from "react-icons/fa";

const schema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .regex(/^[A-Za-z\s]+$/, "Name must contain only letters and spaces"),
  email: z.string().email("Invalid email"),
  phone: z
    .string()
    .min(10, "Phone is required")
    .regex(/^\d+$/, "Phone must be numeric"),
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  zip: z.string().min(1, "Zip code is required"),
});

type FormData = z.infer<typeof schema>;

export default function MultiStepForm() {
  const [step, setStep] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const steps = ["Basic Info", "Address", "Review"];
  const icons = [
    <FaUser key="icon-user" />,
    <FaAddressCard key="icon-address" />,
    <FaCheck key="icon-check" />,
  ];

  const defaultValues =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("formData") || "{}")
      : {};

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues,
  });

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  useEffect(() => {
    const subscription = watch((data) => {
      localStorage.setItem("formData", JSON.stringify(data));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setShowModal(false);
    try {
      await new Promise((res) => setTimeout(res, 1000));

      const submittedUsers = JSON.parse(
        localStorage.getItem("submittedUsers") || "[]"
      );
      const newUser = {
        id: Date.now(),
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: { city: data.city },
      };
      localStorage.setItem(
        "submittedUsers",
        JSON.stringify([...submittedUsers, newUser])
      );
      localStorage.removeItem("formData");
      const logdata = {
        id: Date.now(),
        name: data.name,
        email: data.email,
        phone: data.phone,
        street: data.street,
        city: data.city,
        zipcode: data.zip,
      };
      console.table(logdata);
      toast.success("User added!");
      setShowConfetti(true);
      reset();
      setStep(0);
      setTimeout(() => setShowConfetti(false), 3000);
    } catch {
      toast.error("Submission failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(() => setShowModal(true))}
        className="max-w-md mx-auto p-4 space-y-4 rounded shadow-lg bg-white dark:bg-gray-800"
      >
        {showConfetti && <Confetti />}

        {/* Step Indicator */}
        <div className="flex justify-between items-center mb-4">
          {steps.map((label, index) => (
            <div
              key={index}
              className={`flex flex-col items-center flex-1 ${
                index <= step ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-current">
                {icons[index]}
              </div>
              <span className="text-xs mt-1">{label}</span>
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {step === 0 && (
              <>
                <input
                  {...register("name")}
                  placeholder="Name"
                  className="input"
                />
                <br />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
                <br />
                <input
                  {...register("email")}
                  placeholder="Email"
                  className="input"
                />
                <br />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
                <br />
                <input
                  {...register("phone")}
                  placeholder="Phone"
                  className="input"
                  maxLength={10}
                />
                <br />
                {errors.phone && (
                  <p className="text-red-500">{errors.phone.message}</p>
                )}
                <br />
              </>
            )}
            {step === 1 && (
              <>
                <input
                  {...register("street")}
                  placeholder="Street"
                  className="input"
                />
                <br />
                {errors.street && (
                  <p className="text-red-500">{errors.street.message}</p>
                )}
                <br />
                <input
                  {...register("city")}
                  placeholder="City"
                  className="input"
                />
                <br />
                {errors.city && (
                  <p className="text-red-500">{errors.city.message}</p>
                )}
                <br />
                <input
                  {...register("zip")}
                  placeholder="Zip"
                  className="input"
                />
                <br />
                {errors.zip && (
                  <p className="text-red-500">{errors.zip.message}</p>
                )}
                <br />
              </>
            )}
            {step === 2 && (
              <div className="space-y-2 text-sm">
                {Object.entries(watch()).map(([key, value]) => (
                  <p key={key}>
                    <strong>{key}:</strong> {value}
                  </p>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Buttons */}
        <div className="flex gap-2 justify-between pt-4">
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="px-4 py-2 border rounded"
            >
              Back
            </button>
          )}
          {step < 2 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
              disabled={submitting}
            >
              Submit
            </button>
          )}
        </div>
      </form>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        ariaHideApp={false}
        className="bg-white dark:bg-gray-900 p-6 rounded shadow-lg max-w-md mx-auto mt-40"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start"
      >
        <h2 className="text-lg font-bold mb-4">Confirm Submission</h2>
        <p>Are you sure you want to submit?</p>
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            className="px-4 py-2 bg-green-600 text-white rounded"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Confirm"}
          </button>
        </div>
      </Modal>
    </FormProvider>
  );
}
