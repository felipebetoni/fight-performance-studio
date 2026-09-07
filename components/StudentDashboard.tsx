import React, { useEffect, useMemo, useRef, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import {
  CalendarDays,
  Check,
  ClipboardList,
  DollarSign,
  Edit3,
  MessageCircle,
  PhoneCall,
  Plus,
  Search,
  Trash2,
  TrendingUp,
  UserRound,
  X,
} from './ui/Icons';
import { db } from '../firebase';

type AttendanceStatus = 'present' | 'absent' | 'pending';

type Student = {
  id: string;
  name: string;
  phone: string;
  days: string[];
  schedule: string;
  lessonValue: number;
  attendance: Record<string, AttendanceStatus>;
};

const initialStudents: Student[] = [
  {
    id: 'sample-lucas',
    name: 'Lucas Ferreira',
    phone: '(14) 99821-4421',
    days: ['Segunda', 'Quarta', 'Sexta'],
    schedule: '18:00',
    lessonValue: 70,
    attendance: { '02': 'present', '04': 'present', '06': 'absent', '09': 'present', '11': 'present', '13': 'pending' },
  },
  {
    id: 'sample-mariana',
    name: 'Mariana Costa',
    phone: '(14) 99714-8302',
    days: ['Terça', 'Quinta'],
    schedule: '07:00',
    lessonValue: 80,
    attendance: { '01': 'present', '03': 'present', '08': 'present', '10': 'absent', '15': 'pending' },
  },
  {
    id: 'sample-rafael',
    name: 'Rafael Almeida',
    phone: '(14) 99653-1920',
    days: ['Segunda', 'Quarta'],
    schedule: '19:30',
    lessonValue: 65,
    attendance: { '02': 'present', '04': 'absent', '09': 'present', '11': 'pending' },
  },
];

const weekdayOptions = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
const weekdayByDate = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const timeOptions = Array.from({ length: 29 }, (_, index) => {
  const totalMinutes = 6 * 60 + index * 30;
  return `${String(Math.floor(totalMinutes / 60)).padStart(2, '0')}:${String(totalMinutes % 60).padStart(2, '0')}`;
});
const currency = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : '';
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

type StudentDashboardProps = {
  userId: string;
  onLogout: () => void;
};

const StudentDashboard: React.FC<StudentDashboardProps> = ({ userId, onLogout }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoadingStudents, setIsLoadingStudents] = useState(true);
  const [databaseError, setDatabaseError] = useState('');
  const migratedLocalData = useRef(false);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState(String(today.getDate()).padStart(2, '0'));
  const [form, setForm] = useState({ name: '', phone: '', schedule: '', lessonValue: '', days: [] as string[] });

  useEffect(() => {
    if (!db) {
      setDatabaseError('Banco de dados indisponível. Verifique a configuração do Firebase.');
      setIsLoadingStudents(false);
      return;
    }
    const studentsQuery = query(collection(db, 'alunos'), where('ownerId', '==', userId));
    return onSnapshot(studentsQuery, (snapshot) => {
      const cloudStudents = snapshot.docs.map((studentDocument) => ({
        id: studentDocument.id,
        ...studentDocument.data(),
      })) as Student[];
      if (cloudStudents.length === 0 && !migratedLocalData.current) {
        migratedLocalData.current = true;
        const savedStudents = localStorage.getItem('fight-performance-students');
        if (savedStudents) {
          const localStudents = JSON.parse(savedStudents) as Student[];
          void Promise.all(localStudents.map(({ id: _id, ...student }) => addDoc(collection(db, 'alunos'), { ...student, ownerId: userId })))
            .then(() => localStorage.removeItem('fight-performance-students'))
            .catch(() => setDatabaseError('Não foi possível migrar os alunos salvos no navegador.'));
          return;
        }
      }
      setStudents(cloudStudents);
      setSelectedStudentId((currentId) => cloudStudents.some((student) => student.id === currentId) ? currentId : cloudStudents[0]?.id ?? '');
      setIsLoadingStudents(false);
    }, () => {
      setDatabaseError('Não foi possível carregar os alunos. Confira as regras do Firestore.');
      setIsLoadingStudents(false);
    });
  }, [userId]);

  const filteredStudents = useMemo(
    () => students.filter((student) => student.name.toLowerCase().includes(search.toLowerCase()) || student.phone.includes(search)),
    [students, search],
  );
  const selectedStudent = students.find((student) => student.id === selectedStudentId) ?? filteredStudents[0];
  const daysInSelectedMonth = new Date(today.getFullYear(), selectedMonth + 1, 0).getDate();
  const monthDays = Array.from({ length: daysInSelectedMonth }, (_, index) => String(index + 1).padStart(2, '0'));
  const attendanceKey = (day: string) => `${today.getFullYear()}-${String(selectedMonth + 1).padStart(2, '0')}-${day}`;
  const attendedLessons = students.reduce(
    (total, student) => total + Object.values(student.attendance).filter((status) => status === 'present').length,
    0,
  );
  const totalBilling = students.reduce(
    (total, student) => total + Object.values(student.attendance).filter((status) => status === 'present').length * student.lessonValue,
    0,
  );

  const openNewStudent = () => {
    setEditingStudent(null);
    setForm({ name: '', phone: '', schedule: '', lessonValue: '', days: [] });
    setIsModalOpen(true);
  };

  const openEditStudent = (student: Student) => {
    setEditingStudent(student);
    setForm({ name: student.name, phone: student.phone, schedule: student.schedule, lessonValue: String(student.lessonValue), days: student.days });
    setIsModalOpen(true);
  };

  const saveStudent = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.schedule || !form.lessonValue || form.days.length === 0) return;
    if (!db) return;
    const studentData = { name: form.name.trim(), phone: form.phone, schedule: form.schedule, lessonValue: Number(form.lessonValue), days: form.days };
    try {
      if (editingStudent) {
        await updateDoc(doc(db, 'alunos', editingStudent.id), studentData);
      } else {
        const newStudent = await addDoc(collection(db, 'alunos'), { ...studentData, attendance: {}, ownerId: userId });
        setSelectedStudentId(newStudent.id);
      }
      setIsModalOpen(false);
    } catch {
      setDatabaseError('Não foi possível salvar o aluno. Tente novamente.');
    }
  };

  const removeStudent = async (studentId: string) => {
    if (!db) return;
    try {
      await deleteDoc(doc(db, 'alunos', studentId));
    } catch {
      setDatabaseError('Não foi possível excluir o aluno. Tente novamente.');
    }
  };

  const toggleAttendance = async (student: Student, day: string) => {
    if (!db) return;
    const key = attendanceKey(day);
    const currentStatus = student.attendance[key] ?? (selectedMonth === 8 ? student.attendance[day] : undefined) ?? 'pending';
    const nextStatus: AttendanceStatus = currentStatus === 'present' ? 'absent' : currentStatus === 'absent' ? 'pending' : 'present';
    try {
      await updateDoc(doc(db, 'alunos', student.id), { attendance: { ...student.attendance, [key]: nextStatus } });
    } catch {
      setDatabaseError('Não foi possível atualizar a presença. Tente novamente.');
    }
  };

  const sendChargeByWhatsApp = (student: Student) => {
    const phone = student.phone.replace(/\D/g, '');
    const whatsappNumber = phone.startsWith('55') ? phone : `55${phone}`;
    const completedLessonDates = Object.entries(student.attendance)
      .filter(([, status]) => status === 'present')
      .map(([date]) => {
        const [year, month, day] = date.split('-');
        if (year && month && day) return `${day}/${month}/${year} às ${student.schedule}`;
        if (/^\d{2}$/.test(date)) return `${date}/09/${today.getFullYear()} às ${student.schedule}`;
        return null;
      })
      .filter((date): date is string => date !== null);
    const completedLessons = completedLessonDates.length;
    const total = completedLessons * student.lessonValue;
    const message = [
      `Olá, ${student.name}!`,
      '',
      'Segue o resumo das suas aulas no Fight Performance Studio:',
      `Aulas realizadas: ${completedLessons}`,
      '',
      'Datas e horários:',
      ...(completedLessonDates.length ? completedLessonDates.map((date) => `- ${date}`) : ['- Nenhuma aula marcada como realizada']),
      '',
      `Valor por aula: ${currency(student.lessonValue)}`,
      `Total a pagar: ${currency(total)}`,
      '',
      'Obrigado!',
    ].join('\n');
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#f7f7f8] text-brand-dark">
      <header className="bg-brand-dark text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
          <div className="flex items-center gap-3">
            <div><p className="text-lg font-black italic tracking-tight">FIGHT <span className="text-brand-red">PERFORMANCE</span></p><p className="text-[10px] uppercase tracking-[0.25em] text-zinc-400">Painel do professor</p></div>
          </div>
          <div className="flex items-center gap-2 text-sm text-zinc-300"><span className="hidden items-center gap-2 lg:flex"><span className="h-2 w-2 rounded-full bg-emerald-400" /> Dados salvos na nuvem</span><button onClick={onLogout} className="rounded-lg border border-zinc-600 px-3 py-1.5 text-xs font-bold text-white transition hover:border-red-400 hover:text-red-300">Sair</button></div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        {databaseError && <div role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{databaseError}</div>}
        {isLoadingStudents && <div className="mb-5 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700">Carregando alunos do Firestore...</div>}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div><p className="mb-2 text-sm font-bold uppercase tracking-widest text-brand-red">Visão geral</p><h1 className="text-3xl font-black tracking-tight sm:text-4xl">Alunos e cobranças</h1><p className="mt-2 text-zinc-500">Acompanhe sua agenda, presenças e faturamento do mês.</p></div>
          <button onClick={openNewStudent} className="flex items-center justify-center gap-2 rounded-xl bg-brand-red px-5 py-3 font-bold text-white shadow-lg shadow-red-200 transition hover:bg-red-700"><Plus size={19} /> Adicionar aluno</button>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {[
            { label: 'Alunos ativos', value: students.length, icon: UserRound, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Aulas realizadas', value: attendedLessons, icon: Check, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Faturamento previsto', value: currency(totalBilling), icon: DollarSign, color: 'text-brand-red', bg: 'bg-red-50' },
            { label: 'Taxa de presença', value: `${attendedLessons ? Math.round((attendedLessons / Math.max(attendedLessons + 3, 1)) * 100) : 0}%`, icon: TrendingUp, color: 'text-violet-600', bg: 'bg-violet-50' },
          ].map(({ label, value, icon: Icon, color, bg }) => <div key={label} className="rounded-2xl border border-zinc-100 bg-white p-3 shadow-sm sm:p-5"><div className="mb-3 flex items-start justify-between gap-2 sm:mb-4"><span className="text-xs leading-tight text-zinc-500 sm:text-sm">{label}</span><span className={`rounded-lg p-1.5 sm:p-2 ${bg} ${color}`}><Icon size={17} /></span></div><p className="truncate text-xl font-black sm:text-2xl">{value}</p></div>)}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          <section className="overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-sm">
            <div className="flex flex-col justify-between gap-3 border-b border-zinc-100 p-4 sm:flex-row sm:items-center sm:p-5"><div><h2 className="font-bold">Lista de alunos</h2><p className="text-sm text-zinc-500">Selecione um aluno para ver os detalhes.</p></div><div className="relative w-full sm:w-48"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar aluno..." className="w-full rounded-lg border border-zinc-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-brand-red" /></div></div>
            <div className="divide-y divide-zinc-100">{filteredStudents.map((student) => <button key={student.id} onClick={() => setSelectedStudentId(student.id)} className={`flex w-full items-center gap-2 p-4 text-left transition hover:bg-zinc-50 sm:gap-3 sm:p-5 ${selectedStudent?.id === student.id ? 'border-l-4 border-brand-red bg-red-50/40 pl-3 sm:pl-4' : ''}`}><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-dark text-sm font-bold text-white sm:h-10 sm:w-10">{student.name.split(' ').map((name) => name[0]).slice(0, 2).join('')}</div><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold sm:text-base">{student.name}</p><p className="truncate text-xs text-zinc-500 sm:text-sm">{student.schedule} · {student.days.join(', ')}</p></div><span className="shrink-0 text-xs font-bold text-zinc-700 sm:text-sm">{currency(student.lessonValue)}<small className="font-normal text-zinc-400">/aula</small></span></button>)}{filteredStudents.length === 0 && <p className="p-8 text-center text-sm text-zinc-500">Nenhum aluno encontrado.</p>}</div>
          </section>

          {selectedStudent ? <section className="rounded-2xl border border-zinc-100 bg-white p-4 shadow-sm sm:p-6"><div className="flex items-start justify-between"><div className="flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-dark font-bold text-white">{selectedStudent.name.split(' ').map((name) => name[0]).slice(0, 2).join('')}</div><div><h2 className="font-bold">{selectedStudent.name}</h2><p className="flex items-center gap-1 text-sm text-zinc-500"><PhoneCall size={13} /> {selectedStudent.phone}</p></div></div><div className="flex gap-1"><button onClick={() => openEditStudent(selectedStudent)} className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-100 hover:text-brand-dark" aria-label="Editar aluno"><Edit3 size={17} /></button><button onClick={() => removeStudent(selectedStudent.id)} className="rounded-lg p-2 text-zinc-400 hover:bg-red-50 hover:text-brand-red" aria-label="Excluir aluno"><Trash2 size={17} /></button></div></div><div className="mt-6 grid grid-cols-2 gap-3"><div className="rounded-xl bg-zinc-50 p-3"><p className="text-xs text-zinc-500">Horário</p><p className="mt-1 font-bold">{selectedStudent.schedule}</p></div><div className="rounded-xl bg-zinc-50 p-3"><p className="text-xs text-zinc-500">Dias fixos</p><p className="mt-1 text-sm font-bold">{selectedStudent.days.join(', ')}</p></div></div><div className="mt-6 flex items-center justify-between gap-3"><div><h3 className="font-bold">Presença de {months[selectedMonth].toLowerCase()}</h3><p className="text-xs text-zinc-500">Clique para alternar: presente, falta ou pendente.</p></div><div className="flex items-center gap-2"><CalendarDays className="hidden text-brand-red sm:block" size={20} /><select value={selectedMonth} onChange={(event) => { setSelectedMonth(Number(event.target.value)); setSelectedDay('01'); }} className="rounded-lg border border-zinc-200 bg-white px-2 py-2 text-sm font-semibold outline-none focus:border-brand-red">{months.map((month, index) => <option key={month} value={index}>{month}</option>)}</select></div></div><div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-zinc-500"><span><i className="mr-1 inline-block h-2.5 w-2.5 rounded-full bg-amber-300 align-middle" />Dia de treino</span><span><i className="mr-1 inline-block h-2.5 w-2.5 rounded-full bg-emerald-400 align-middle" />Presente</span><span><i className="mr-1 inline-block h-2.5 w-2.5 rounded-full bg-red-400 align-middle" />Falta</span></div><div className="mt-4 grid grid-cols-4 gap-1.5 sm:grid-cols-7 sm:gap-2">{monthDays.map((day) => { const key = attendanceKey(day); const status = selectedStudent.attendance[key] ?? (selectedMonth === 8 ? selectedStudent.attendance[day] : undefined) ?? 'pending'; const isTrainingDay = selectedStudent.days.includes(weekdayByDate[new Date(today.getFullYear(), selectedMonth, Number(day)).getDay()]); const dayStyle = status === 'present' ? 'border-emerald-300 bg-emerald-50 text-emerald-700' : status === 'absent' ? 'border-red-300 bg-red-50 text-red-600' : isTrainingDay ? 'border-amber-300 bg-amber-50 text-amber-700' : 'border-zinc-200 bg-zinc-50 text-zinc-400'; return <button key={day} onClick={() => { setSelectedDay(day); void toggleAttendance(selectedStudent, day); }} className={`rounded-lg border p-2 text-center transition ${selectedDay === day ? 'ring-2 ring-brand-red ring-offset-1' : ''} ${dayStyle}`}><span className="block text-[10px] uppercase">Dia</span><span className="font-bold">{day}</span><span className="mt-1 block text-[10px] font-bold">{status === 'present' ? 'OK' : status === 'absent' ? 'FALTA' : isTrainingDay ? 'TREINO' : '—'}</span></button>; })}</div><div className="mt-6 flex flex-col gap-4 border-t border-zinc-100 pt-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm text-zinc-500">Total a cobrar</p><p className="text-2xl font-black text-brand-red">{currency(Object.values(selectedStudent.attendance).filter((status) => status === 'present').length * selectedStudent.lessonValue)}</p></div><div className="flex flex-col gap-3 sm:items-end"><div className="text-right text-sm text-zinc-500"><p><strong className="text-zinc-800">{Object.values(selectedStudent.attendance).filter((status) => status === 'present').length}</strong> aulas realizadas</p><p><strong className="text-zinc-800">{currency(selectedStudent.lessonValue)}</strong> por aula</p></div><button onClick={() => sendChargeByWhatsApp(selectedStudent)} className="flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#128C7E]"><MessageCircle size={17} /> Enviar cobrança no WhatsApp</button></div></div></section> : <section className="flex min-h-[300px] items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-white p-6 text-center text-zinc-500"><ClipboardList className="mb-2" /><p>Adicione seu primeiro aluno para começar.</p></section>}
        </div>
      </main>

      {isModalOpen && <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-3 sm:p-4"><form onSubmit={saveStudent} className="my-3 w-full max-w-lg rounded-2xl bg-white p-4 shadow-2xl sm:my-6 sm:p-6"><div className="mb-6 flex items-center justify-between"><div><h2 className="text-xl font-black">{editingStudent ? 'Editar aluno' : 'Novo aluno'}</h2><p className="text-sm text-zinc-500">Preencha os dados para acompanhar o treino.</p></div><button type="button" onClick={() => setIsModalOpen(false)} className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-100" aria-label="Fechar"><X size={20} /></button></div><div className="grid gap-4 sm:grid-cols-2"><label className="sm:col-span-2"><span className="mb-1 block text-sm font-semibold">Nome completo</span><input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="w-full rounded-lg border border-zinc-200 px-3 py-2.5 outline-none focus:border-brand-red" placeholder="Ex.: João da Silva" /></label><label><span className="mb-1 block text-sm font-semibold">Telefone</span><input required type="tel" inputMode="numeric" maxLength={15} value={form.phone} onChange={(event) => setForm({ ...form, phone: formatPhone(event.target.value) })} className="w-full rounded-lg border border-zinc-200 px-3 py-2.5 outline-none focus:border-brand-red" placeholder="(14) 99999-9999" /></label>      <label><span className="mb-1 block text-sm font-semibold">Horário</span><select required value={form.schedule} onChange={(event) => setForm({ ...form, schedule: event.target.value })} className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 outline-none focus:border-brand-red"><option value="">Selecione</option>{timeOptions.map((time) => <option key={time} value={time}>{time}</option>)}</select></label><label><span className="mb-1 block text-sm font-semibold">Valor por aula (R$)</span><input required min="0" step="0.01" type="number" value={form.lessonValue} onChange={(event) => setForm({ ...form, lessonValue: event.target.value })} className="w-full rounded-lg border border-zinc-200 px-3 py-2.5 outline-none focus:border-brand-red" placeholder="70,00" /></label></div><div className="mt-5"><span className="mb-2 block text-sm font-semibold">Dias de treino</span><div className="flex flex-wrap gap-2">{weekdayOptions.map((day) => <button type="button" key={day} onClick={() => setForm({ ...form, days: form.days.includes(day) ? form.days.filter((item) => item !== day) : [...form.days, day] })} className={`rounded-full border px-3 py-1.5 text-sm font-medium ${form.days.includes(day) ? 'border-brand-red bg-brand-red text-white' : 'border-zinc-200 text-zinc-600'}`}>{day}</button>)}</div></div><button type="submit" className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-dark py-3 font-bold text-white hover:bg-zinc-700"><Check size={18} /> {editingStudent ? 'Salvar alterações' : 'Cadastrar aluno'}</button></form></div>}
    </div>
  );
};

export default StudentDashboard;
