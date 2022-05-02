import { request } from "@/utils/http";

export async function checkLogin(data: any) {
const res: any = await request("/check_login", {
    method: "get",
    data
});
    return res;
}
