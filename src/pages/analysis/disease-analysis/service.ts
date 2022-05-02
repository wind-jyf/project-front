import { request } from "@/utils/http";

export async function getDiseaseAnalysis(data: any) {
const res: any = await request("/disease_analysis", {
    method: "get",
    data,
});
    return res.data;
}

export async function getDiseaseByDiseaseCode(data: any) {
const res: any = await request("/diseaseAnalysisById", {
    method: "get",
    data,
});
    return res.data;
}

export async function predictAnalysis(data: any) {
const res: any = await request("/disease_analysis/predict", {
    method: "post",
    data,
});
    return res;
}

export async function getDepartMentList(data: any) {
const res: any = await request("/departMentList", {
    method: "get",
    data,
});
    return res.data;
}
