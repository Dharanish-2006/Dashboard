// components/MultiStepForm.tsx
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  street: z.string().min(1),
  city: z.string().min(1),
  zip: z.string().min(1),
});

type FormData = z.infer<typeof schema>;

const steps = ['Basic Info', 'Address', 'Review'];

export default function MultiStepForm() {
  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: JSON.parse(localStorage.getItem('formData') || '{}'),
  });

  const { register, watch, handleSubmit, formState: { errors } } = methods;
  const [step, setStep] = useState(0);

  useEffect(() => {
    const subscription = watch((data) => {
      localStorage.setItem('formData', JSON.stringify(data));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = (data: FormData) => {
    console.log('Submitted:', data);
    toast.success('User added!');
    localStorage.removeItem('formData');
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
        <motion.div key={step} initial={{ x: 100 }} animate={{ x: 0 }} className="space-y-4">
          {step === 0 && (
            <>
              <input {...register('name')} placeholder="Name" className="input" />
              {errors.name && <p className="text-red-500">Name required</p>}
              <input {...register('email')} placeholder="Email" className="input" />
              {errors.email && <p className="text-red-500">Valid email required</p>}
            </>
          )}
          {step === 1 && (
            <>
              <input {...register('street')} placeholder="Street" className="input" />
              <input {...register('city')} placeholder="City" className="input" />
              <input {...register('zip')} placeholder="Zip" className="input" />
            </>
          )}
          {step === 2 && (
            <div>
              {Object.entries(watch()).map(([key, value]) => (
                <p key={key}><strong>{key}:</strong> {value}</p>
              ))}
            </div>
          )}
        </motion.div>

        <div className="flex gap-2">
          {step > 0 && <button type="button" onClick={() => setStep((s) => s - 1)}>Back</button>}
          {step < 2 && <button type="button" onClick={() => setStep((s) => s + 1)}>Next</button>}
          {step === 2 && <button type="submit" className="bg-green-600 text-white px-4 py-2">Submit</button>}
        </div>
      </form>
    </FormProvider>
  );
}
