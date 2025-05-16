'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { BsFillInboxFill } from 'react-icons/bs';
import dayjs from 'dayjs';
import Breadcrumb from '@/components/Breadcrumb';
import MainContainer from '@/components/MainContainer';
import useDebounce from '@/hooks/useDebounce';
import worklogService from '@/services/worklogService';

interface Contributor {
  employee_name: string;
  hours_spent: number;
}

interface WorkLog {
  id: number;
  task_description: string;
  date: string;
  hourly_rate: number;
  additional_charges: number;
  total_remuneration: number;
  contributors: Contributor[];
}

interface Sort {
  field: string;
  order: 'asc' | 'desc';
}

export default function WorkLogsPage() {
  const [worklogs, setWorklogs] = useState<WorkLog[]>([]);
  const [search, setSearch] = useState<string>('');
  const [sort, setSort] = useState<Sort>({ field: 'date', order: 'asc' });
  const [loading, setLoading] = useState<boolean>(false);

  const debouncedSearch = useDebounce(search, 500);

  const fetchWorkLogs = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        search: debouncedSearch.toString(),
        sort: sort.field,
        order: sort.order,
      };
      const data = await worklogService.getAllWorkLogs(params);
      setWorklogs(data.data);
    } catch (error) {
      console.error('Failed to fetch work logs:', error);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, sort]);

  useEffect(() => {
    fetchWorkLogs();
  }, [fetchWorkLogs]);

  const handleSort = (field: string) => {
    setSort((prev) => ({
      field,
      order: prev.field === field && prev.order === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleDelete = async (worklog: WorkLog) => {
    if (!confirm('Apakah Anda yakin ingin menghapus log ini?')) return;
    try {
      await worklogService.deleteWorkLog(worklog.id);
      setWorklogs((prev) => prev.filter((w) => w.id !== worklog.id));
    } catch (error) {
      console.error('Failed to delete work log:', error);
    }
  };

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-6">Work Logs</h1>
      <MainContainer>
        <div className="flex justify-between w-full mb-5">
          <Breadcrumb />
          <Link
            href="/worklogs/create"
            className="cursor-pointer font-semibold bg-sky-800/50 px-3 py-1 rounded-lg hover:bg-sky-600/50"
          >
            Add
          </Link>
        </div>

        <input
          type="text"
          placeholder="Cari pekerjaan..."
          className="p-2 border border-white/20 rounded w-full mb-4 bg-white/10 text-white placeholder:text-white/50"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading ? (
          <p>Loading...</p>
        ) : (
            <div className="overflow-x-auto rounded-lg border border-white/10">
              <table className="table-auto w-full overflow-x-auto whitespace-nowrap">
                <thead>
                  <tr className="bg-white/10 text-left text-gray-200">
                    <th className="p-3">No</th>
                    <th className="p-3">Task Description</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Contributors</th>
                    <th className="p-3">Hours Total</th>
                    <th className="p-3">Hourly Rate</th>
                    <th className="p-3">Additional Charge</th>
                    <th className="p-3">Total Remuneration</th>
                    <th className="p-3">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {worklogs.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="p-6 text-center text-gray-400 italic">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <BsFillInboxFill className="text-6xl mx-auto" />
                          <span>Tidak ada data pekerjaan.</span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    worklogs.map((log, index) => (
                      <tr key={log.id} className="border-b border-white/10 hover:bg-white/10 transition">
                        <td className="p-3">{index + 1}</td>
                        <td className="p-3">{log.task_description}</td>
                        <td className="p-3">{dayjs(log.date).format('DD-MM-YYYY')}</td>
                        <td className="p-3">
                          {log.contributors.map((c) => c.employee_name).join(', ')}
                        </td>
                        <td className="p-3">
                          {log.contributors.reduce((acc, curr) => acc + curr.hours_spent, 0)} jam
                        </td>
                        <td className="p-3">Rp {log.hourly_rate.toLocaleString()}</td>
                        <td className="p-3">Rp {log.additional_charges.toLocaleString()}</td>
                        <td className="p-3 font-semibold text-green-400">
                          Rp {log.total_remuneration.toLocaleString()}
                        </td>
                        <td className="p-3">
                          <div className="flex gap-2">
                            <Link href={`/worklogs/${log.id}`} className="rounded px-3 py-1 bg-green-600/30 hover:bg-green-600/50 text-white">
                              Edit
                            </Link>
                            <button onClick={() => handleDelete(log)} className="rounded px-3 py-1 bg-red-600/30 hover:bg-red-600/50 text-white">
                              Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
        )}
      </MainContainer>
    </div>
  );
}
