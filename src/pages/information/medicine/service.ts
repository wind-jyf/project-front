
import { request } from "@/utils/http";

export async function getMedicineList(data: any) {
const res: any = await request("/medicine", {
    method: "get",
    data,
});
    return res.data;
}

export async function getMedicineById(data: any) {
const res: any = await request("/medicineById", {
    method: "get",
    data,
});
    return res.data;
}

export async function addMedicine(data: any) {
const res: any = await request("/medicine/add", {
    method: "post",
    data,
});
    return res;
}

export async function updateMedicine(data: any) {
const res: any = await request("/medicine/update", {
    method: "post",
    data,
});
    return res;
}