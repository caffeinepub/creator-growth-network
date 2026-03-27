import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface InvestorSimulationOutput {
    brandDealValue: bigint;
    cgnProjectedMonthlyRevenue: bigint;
    estimatedCPM: number;
    roiScalingProjectionPercent: number;
}
export interface InvestorSimulationInput {
    followersCount: bigint;
    platform: string;
    niche: string;
    averageViews: bigint;
}
export interface CreatorSimulationInput {
    followersCount: bigint;
    platform: string;
    niche: string;
    averageViews: bigint;
}
export interface CreatorSimulationOutput {
    recommendations: Array<string>;
    growthPotentialScore: bigint;
    estimatedMonthlyIncome: bigint;
    valuationGrade: string;
}
export interface backendInterface {
    runCreatorSimulation(input: CreatorSimulationInput): Promise<CreatorSimulationOutput>;
    runInvestorSimulation(input: InvestorSimulationInput): Promise<InvestorSimulationOutput>;
}
