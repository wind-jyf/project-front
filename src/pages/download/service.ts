import { request } from "@/utils/http";

export async function computeDiseaseAnalysis(data: any) {
const res: any = await request("/disease_analysis/compute", {
    method: "post",
    data,
});
    return res.data;
}

export async function getDiseaseList(data: any) {
const res: any = await request("/disease", {
    method: "get",
    data,
});
    return res.data;
}

export async function getWorkBenchList(data: any) {
const res: any = await request("/workbench", {
    method: "get",
    data,
});
    return res.data;
}
