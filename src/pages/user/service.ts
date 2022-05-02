import { request } from "@/utils/http";

export async function login(data: any) {
const res: any = await request("/login", {
    method: "post",
    data,
});
    return res;
}
