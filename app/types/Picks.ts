export type Pick = {
    ownedBy: number;
    ownedByName: string;
    originalOwner?: number;
    originalOwnerName?: string;
    round: number;
    slot: number;
    overall: number;
    traded: boolean;
    season: number;
}