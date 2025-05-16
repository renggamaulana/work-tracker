'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MainContainer from '@/components/MainContainer';
import Breadcrumb from '@/components/Breadcrumb';
import FormControl from '@/components/FormControl';
import LabelInput from '@/components/LabelInput';
import InputForm from '@/components/InputForm';
import ButtonSubmit from '@/components/ButtonSubmit';
import Swal from 'sweetalert2';
import worklogService from '@/services/worklogService';

interface Contributor {
  employee_name: string;
  hours_spent: number;
}

export default function CreateWorkLogPage() {
  const router = useRouter();
  const [taskDescription, setTaskDescription] = useState('');
  const [date, setDate] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [additionalCharges, setAdditionalCharges] = useState('');
  const [contributors, setContributors] = useState<Contributor[]>([
    { employee_name: '', hours_spent: 0 },
  ]);
  const [loading, setLoading] = useState(false);

  const handleContributorChange = (
    index: number,
    field: keyof Contributor,
    value: string
  ) => {
    const updated = [...contributors];
    if (field === 'hours_spent') {
      const parsed = Number(value);
      updated[index][field] = parsed > 0 ? parsed : 0;
    } else {
      updated[index][field] = value;
    }
    setContributors(updated);
  };

  const addContributor = () => {
    setContributors([...contributors, { employee_name: '', hours_spent: 0 }]);
  };

  const removeContributor = (index: number) => {
    setContributors(contributors.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const hasInvalidContributor = contributors.some(
      (c) => !c.employee_name.trim() || c.hours_spent <= 0
    );

    if (hasInvalidContributor) {
      Swal.fire({
        icon: 'warning',
        title: 'Validasi Gagal!',
        text: 'Nama pegawai tidak boleh kosong dan jam kerja harus lebih dari 0.',
      });
      setLoading(false);
      return;
    }

    try {
      await worklogService.createWorkLog({
        task_description: taskDescription,
        date,
        hourly_rate: Number(hourlyRate),
        additional_charges: Number(additionalCharges),
        contributors,
      });

      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Work Log berhasil disimpan!',
        timer: 2000,
        showConfirmButton: true,
      });

      setTimeout(() => {
        router.push('/worklogs');
      }, 1500);
    } catch (error: any) {
      const { message, errors } = error?.response?.data || {};
      const errorMessage =
        errors?.task_description?.[0] ||
        errors?.date?.[0] ||
        errors?.hourly_rate?.[0] ||
        errors?.contributors?.[0] ||
        message ||
        'Terjadi kesalahan saat menyimpan data.';

      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-6">Add Work Log</h1>
      <MainContainer>
        <div className="flex justify-between mb-5">
          <Breadcrumb />
        </div>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <FormControl>
            <LabelInput htmlFor="task_description" label="Task Description" />
            <InputForm
              name="task_description"
              type="text"
              id="task_description"
              placeholder="e.g., UI/UX Design"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              required
            />
          </FormControl>

          <FormControl>
            <LabelInput htmlFor="date" label="Date" />
            <InputForm
              name="date"
              type="date"
              id="date"
              placeholder="Select the work date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </FormControl>

          <FormControl>
            <LabelInput htmlFor="hourly_rate" label="Hourly Rate" />
            <InputForm
              name="hourly_rate"
              type="number"
              min="0"
              id="hourly_rate"
              placeholder="e.g., 75000"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              required
            />
          </FormControl>

          <FormControl>
            <LabelInput htmlFor="additional_charges" label="Additional Charges (optional)" />
            <InputForm
              name="additional_charges"
              type="number"
              min="0"
              placeholder="e.g., 50000 (optional)"
              id="additional_charges"
              value={additionalCharges}
              onChange={(e) => setAdditionalCharges(e.target.value)}
            />
          </FormControl>

          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Contributors</h2>

            {contributors.map((contributor, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-4"
              >
                <FormControl>
                  <LabelInput htmlFor={`employee_name_${index}`} label={`Employee Name #${index + 1}`} />
                  <InputForm
                    id={`employee_name_${index}`}
                    name="employee_name"
                    type="text"
                    placeholder="Employee Name"
                    value={contributor.employee_name}
                    onChange={(e) =>
                      handleContributorChange(index, 'employee_name', e.target.value)
                    }
                    required
                  />
                </FormControl>

                <FormControl>
                  <LabelInput htmlFor={`hours_spent_${index}`} label="Hours Spent" />
                  <div className="relative">
                    <InputForm
                      id={`hours_spent_${index}`}
                      name="hours_spent"
                      type="number"
                      min="0"
                      step="0.25"
                      placeholder="Contoh: 2.5"
                      value={contributor.hours_spent.toString()}
                      onChange={(e) =>
                        handleContributorChange(index, 'hours_spent', e.target.value)
                      }
                      required
                    />
                  </div>
                </FormControl>

                {contributors.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeContributor(index)}
                    className="text-sm text-red-400 underline col-span-full"
                  >
                    Hapus
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addContributor}
              className="text-sm text-blue-400 underline"
            >
              + Add Contributor
            </button>
          </div>


          <ButtonSubmit disabled={loading}>
            {loading ? 'Menyimpan...' : 'Tambah Work Log'}
          </ButtonSubmit>
        </form>
      </MainContainer>
    </div>
  );
}