import { request } from "@/utils/http";

export async function getMedicineAnalysis(data: any) {
const res: any = await request("/medicine_analysis", {
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
