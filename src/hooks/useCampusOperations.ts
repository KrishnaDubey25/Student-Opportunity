import { useEffect, useMemo, useState } from 'react';

export type CampusTaskStatus = 'Pending' | 'In Progress' | 'Submitted' | 'Reviewed' | 'Completed';

export interface CampusTask {
  id: string;
  collegeCode: string;
  title: string;
  description: string;
  category: 'PPT' | 'Review' | 'Presentation' | 'Research' | 'Documentation' | 'Duty' | 'Other';
  assignedTo?: string;
  dueDate: string;
  statusByStudent: Record<string, CampusTaskStatus>;
  createdAt: string;
  createdBy: string;
}

export interface StudyResourceChannel {
  id: string;
  collegeCode: string;
  title: string;
  subject: string;
  description: string;
  level: string;
  links: { label: string; url: string }[];
  createdAt: string;
}

export interface CampusCollaboration {
  id: string;
  collegeCode: string;
  partnerCollege: string;
  title: string;
  type: 'Hackathon' | 'Workshop' | 'Research' | 'Placement' | 'Club' | 'Other';
  status: 'Planning' | 'Open' | 'Live' | 'Completed';
  date: string;
  seats?: number;
  description: string;
  createdAt: string;
}

type CampusOpsState = {
  tasks: CampusTask[];
  resources: StudyResourceChannel[];
  collaborations: CampusCollaboration[];
};

const STORAGE_KEY = 'soe_campus_operations_v2';
const CHANNEL = 'soe-campus-live-sync';

const emptyState: CampusOpsState = { tasks: [], resources: [], collaborations: [] };

const readState = (): CampusOpsState => {
  if (typeof window === 'undefined') return emptyState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyState;
    const parsed = JSON.parse(raw);
    return {
      tasks: Array.isArray(parsed.tasks) ? parsed.tasks : [],
      resources: Array.isArray(parsed.resources) ? parsed.resources : [],
      collaborations: Array.isArray(parsed.collaborations) ? parsed.collaborations : []
    };
  } catch {
    return emptyState;
  }
};

export const useCampusOperations = (collegeCode: string) => {
  const [state, setState] = useState<CampusOpsState>(() => readState());

  const publish = (next: CampusOpsState) => {
    setState(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    try {
      const bc = new BroadcastChannel(CHANNEL);
      bc.postMessage(next);
      bc.close();
    } catch {}
  };

  useEffect(() => {
    const seedKey = `soe_campus_ops_seeded_${collegeCode}`;
    if (!collegeCode || localStorage.getItem(seedKey)) return;
    const current = readState();
    const hasCollegeData = current.tasks.some(t => t.collegeCode === collegeCode) || current.resources.some(r => r.collegeCode === collegeCode) || current.collaborations.some(c => c.collegeCode === collegeCode);
    if (!hasCollegeData) {
      const now = new Date().toISOString();
      const seeded: CampusOpsState = {
        tasks: [{ id:`seed_task_${collegeCode}`, collegeCode, title:'Finalize hackathon solution deck', description:'Complete problem framing, solution architecture, impact slide and final presentation rehearsal.', category:'PPT', dueDate:'2026-09-20', statusByStudent:{}, createdAt:now, createdBy:'Campus Innovation Cell' }, ...current.tasks],
        resources: [{ id:`seed_resource_${collegeCode}`, collegeCode, title:'Placement & Hackathon Preparation Channel', subject:'Aptitude + DSA + Presentation', description:'Use these references for structured preparation before upcoming campus opportunities.', level:'All Students', links:[{label:'NPTEL',url:'https://nptel.ac.in/'},{label:'GeeksforGeeks',url:'https://www.geeksforgeeks.org/'}], createdAt:now }, ...current.resources],
        collaborations: [{ id:`seed_collab_${collegeCode}`, collegeCode, partnerCollege:'Partner Institute Network', title:'Inter-College Innovation Sprint', type:'Hackathon', status:'Open', date:'2026-09-28', seats:60, description:'Joint innovation challenge with mixed-campus teams, mentor reviews and final demo day.', createdAt:now }, ...current.collaborations]
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
      setState(seeded);
    }
    localStorage.setItem(seedKey, '1');
  }, [collegeCode]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setState(readState());
    };
    window.addEventListener('storage', onStorage);

    let bc: BroadcastChannel | null = null;
    try {
      bc = new BroadcastChannel(CHANNEL);
      bc.onmessage = (event) => {
        if (event.data?.tasks && event.data?.resources && event.data?.collaborations) {
          setState(event.data as CampusOpsState);
        }
      };
    } catch {}

    return () => {
      window.removeEventListener('storage', onStorage);
      bc?.close();
    };
  }, []);

  const tasks = useMemo(() => state.tasks.filter(t => t.collegeCode === collegeCode), [state.tasks, collegeCode]);
  const resources = useMemo(() => state.resources.filter(r => r.collegeCode === collegeCode), [state.resources, collegeCode]);
  const collaborations = useMemo(() => state.collaborations.filter(c => c.collegeCode === collegeCode), [state.collaborations, collegeCode]);

  const addTask = (task: Omit<CampusTask, 'id' | 'collegeCode' | 'createdAt' | 'statusByStudent'>) => {
    const nextTask: CampusTask = {
      ...task,
      id: `task_${Date.now()}`,
      collegeCode,
      createdAt: new Date().toISOString(),
      statusByStudent: {}
    };
    publish({ ...state, tasks: [nextTask, ...state.tasks] });
  };

  const updateTaskStatus = (taskId: string, studentId: string, status: CampusTaskStatus) => {
    publish({
      ...state,
      tasks: state.tasks.map(task => task.id === taskId
        ? { ...task, statusByStudent: { ...task.statusByStudent, [studentId]: status } }
        : task)
    });
  };

  const removeTask = (taskId: string) => publish({ ...state, tasks: state.tasks.filter(t => t.id !== taskId) });

  const addResource = (resource: Omit<StudyResourceChannel, 'id' | 'collegeCode' | 'createdAt'>) => {
    const nextResource: StudyResourceChannel = { ...resource, id: `resource_${Date.now()}`, collegeCode, createdAt: new Date().toISOString() };
    publish({ ...state, resources: [nextResource, ...state.resources] });
  };

  const removeResource = (id: string) => publish({ ...state, resources: state.resources.filter(r => r.id !== id) });

  const addCollaboration = (collab: Omit<CampusCollaboration, 'id' | 'collegeCode' | 'createdAt'>) => {
    const nextCollab: CampusCollaboration = { ...collab, id: `collab_${Date.now()}`, collegeCode, createdAt: new Date().toISOString() };
    publish({ ...state, collaborations: [nextCollab, ...state.collaborations] });
  };

  const removeCollaboration = (id: string) => publish({ ...state, collaborations: state.collaborations.filter(c => c.id !== id) });

  return { tasks, resources, collaborations, addTask, updateTaskStatus, removeTask, addResource, removeResource, addCollaboration, removeCollaboration };
};
