import { request } from "@/utils/http";

export async function getDepartMentAnalysis(data: any) {
const res: any = await request("/department_analysis", {
    method: "get",
    data,
});
    return res.data;
}
