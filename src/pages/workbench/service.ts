
import { request } from "@/utils/http";

export async function getWorkbenchList(data: any) {
const res: any = await request("/workbench", {
    method: "get",
    data,
});
    return res.data;
}

export async function getWorkbenchById(data: any) {
const res: any = await request("/workbenchById", {
    method: "get",
    data,
});
    return res.data;
}

export async function addWorkbench(data: any) {
const res: any = await request("/workbench", {
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

export async function getDiseaseList(data: any) {
const res: any = await request("/disease", {
    method: "get",
    data,
});
    return res.data;
}

export async function getMedicineList(data: any) {
const res: any = await request("/medicine", {
    method: "get",
    data,
});
    return res.data;
}