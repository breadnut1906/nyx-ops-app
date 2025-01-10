export interface ProjectTask {
    id: number,
    text: string,
    description: string,
    start_date: Date,
    duration: number,
    status: string,
    color: string,
    readonly: boolean,
    parent: number | null,
}
