
import { request } from "@/utils/http";

export async function getDepartMentList(data: any) {
const res: any = await request("/departMentList", {
    method: "get",
    data,
});
    return res.data;
}

export async function addDepartMent(data: any) {
const res: any = await request("/departMent/add", {
    method: "post",
    data,
});
    return res;
}

export async function updateDepartMent(data: any) {
const res: any = await request("/departMent/update", {
    method: "post",
    data,
});
    return res;
}