export type contentType = 'paragraph' | 'heading' | 'list';
export type Status = 'to do' | 'done';
export type Priority = 'high' | 'medium' | 'low';
export const backColorPriority: Record<string, string> = {
  'low': 'rgba(41, 179, 59, 1)',
  'medium': 'rgba(234, 183, 79, 1)',
  'high': 'rgba(236, 95, 95, 1)'
}

export const backColorStatus: Record<string, string> = {
  'to do': 'rgba(0, 130, 205, 1)',
  'done': 'rgba(41, 179, 59, 1)'
}

export type Article = {
    id: number;
    img: string;
    title: string;
    shortDesc: string;
    content: { type: contentType, text?: string; items?: string | string[] }[];
}

export type CustomTask = {
    id?: number;
    title: string;
    description: string;
    priority: Priority;
    status: Status;
    date: Date;
    time: Date;
}

export type DefaultTask = {
    id: number;
    icon: number;
    title: string;
    status?: Status;
}

export type Task = {
    id: number;
    defaultSubTaskID: number;
    title: string;
    status: Status;
}

export type DefaultSubTask = {
    id: number;
    title: string;
    tasks: Task[];
}

export interface InitialDefaultTasks {
  checklist: DefaultTask[];
  subChecklist: DefaultSubTask[];
}
