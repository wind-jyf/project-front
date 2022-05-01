
import { request } from "@/utils/http";

export async function getDiseaseList(data: any) {
const res: any = await request("/disease", {
    method: "get",
    data,
});
    return res.data;
}

export async function addDisease(data: any) {
const res: any = await request("/disease/add", {
    method: "post",
    data,
});
    return res;
}

export async function updateDisease(data: any) {
const res: any = await request("/disease/update", {
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