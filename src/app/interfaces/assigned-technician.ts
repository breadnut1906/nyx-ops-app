export interface AssignedTechnician {
    id: number,
    projectId: number,
    text: string,
    description: string,
    start_date: Date,
    duration: number,
    status: string,
    readonly: boolean,
}
